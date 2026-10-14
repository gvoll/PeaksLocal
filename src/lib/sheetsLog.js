// Appends one row to a Google Sheet using a service account, with no extra
// dependencies (JWT signed with node:crypto, calls made with fetch). Used by
// api/audit.js so an audit request is saved even if the notification email
// fails. Configured by three env vars; when any is missing it does nothing
// and returns { saved: false, skipped: true } so local dev and previews work.
//
//   GOOGLE_SERVICE_ACCOUNT_EMAIL  service account client_email
//   GOOGLE_PRIVATE_KEY            service account private_key. Accepts the raw PEM,
//                                 \n escapes, quoted, the whole JSON key file, or
//                                 base64 of the PEM. If GOOGLE_PRIVATE_KEY_BASE64
//                                 is set it is used instead (one line, nothing
//                                 to mangle when pasting)
//   AUDIT_LEADS_SHEET_ID          target spreadsheet ID (share it with the
//                                 service account as an editor)

import { createSign } from 'node:crypto';

// Values pasted into a dashboard often pick up stray whitespace, wrapping
// quotes, escaped "\n" sequences, or have their newlines turned into spaces.
// Clean all of that up so a copy-paste slip does not silently disable the log.
function cleanValue(value) {
  return String(value ?? '').trim().replace(/^["']|["']$/g, '').trim();
}

export function normalizePrivateKey(raw) {
  let key = cleanValue(raw);
  // Whole service-account JSON file pasted instead of just the key.
  if (key.startsWith('{')) {
    try {
      const parsed = JSON.parse(key);
      if (parsed.private_key) key = String(parsed.private_key);
    } catch { /* fall through */ }
  }
  key = key.replace(/\\n/g, '\n');
  // Base64 of the PEM (a single line with nothing to mangle) is also accepted.
  if (!key.includes('-----BEGIN')) {
    const decoded = Buffer.from(key.replace(/\s+/g, ''), 'base64').toString('utf8');
    if (decoded.includes('-----BEGIN')) key = decoded;
  }
  const match = key.match(/-----BEGIN ([A-Z ]+)-----([\s\S]*?)-----END \1-----/);
  if (!match) return key;
  const body = (match[2].match(/[A-Za-z0-9+/=]/g) || []).join('');
  const lines = body.match(/.{1,64}/g) || [];
  return `-----BEGIN ${match[1]}-----\n${lines.join('\n')}\n-----END ${match[1]}-----\n`;
}

// Non-secret description of what was actually received, for error messages.
export function describeKey(raw) {
  const key = String(raw ?? '');
  const normalized = normalizePrivateKey(raw);
  const body = (normalized.match(/-----BEGIN [A-Z ]+-----([\s\S]*?)-----END/) || [, ''])[1].replace(/\s+/g, '');
  return `received ${key.length} chars, begin marker: ${key.includes('-----BEGIN')}, end marker: ${key.includes('-----END')}, key body: ${body.length} chars (a valid key is about 1624)`;
}

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
const TIMEOUT_MS = 8000;

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

async function getAccessToken(email, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(
    JSON.stringify({ iss: email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 })
  );
  let signature;
  try {
    const signer = createSign('RSA-SHA256');
    signer.update(`${header}.${claims}`);
    signature = signer.sign(privateKey).toString('base64url');
  } catch (err) {
    throw new Error(`Private key could not be read (${describeKey(privateKey)}): ${err.message}`);
  }

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claims}.${signature}`,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(`Google token request failed (${res.status} ${detail.error || ''} ${detail.error_description || ''})`.trim());
  }
  const { access_token: accessToken } = await res.json();
  return accessToken;
}

export async function appendRow(values) {
  const email = cleanValue(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
  const rawKey = process.env.GOOGLE_PRIVATE_KEY_BASE64 || process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = cleanValue(process.env.AUDIT_LEADS_SHEET_ID);
  const missing = [
    !email && 'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    !cleanValue(rawKey) && 'GOOGLE_PRIVATE_KEY',
    !sheetId && 'AUDIT_LEADS_SHEET_ID',
  ].filter(Boolean);
  if (missing.length) return { saved: false, skipped: true, missing };

  const accessToken = await getAccessToken(email, normalizePrivateKey(rawKey));
  // RAW keeps every value as literal text, so a submitted "=formula" is never evaluated.
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}` +
    `/values/A1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [values] }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Sheets append failed (${res.status})`);
  return { saved: true, skipped: false, missing: [] };
}
