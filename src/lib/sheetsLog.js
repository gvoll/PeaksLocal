// Appends one row to a Google Sheet using a service account, with no extra
// dependencies (JWT signed with node:crypto, calls made with fetch). Used by
// api/audit.js so an audit request is saved even if the notification email
// fails. Configured by three env vars; when any is missing it does nothing
// and returns { saved: false, skipped: true } so local dev and previews work.
//
//   GOOGLE_SERVICE_ACCOUNT_EMAIL  service account client_email
//   GOOGLE_PRIVATE_KEY            service account private_key (\n escapes OK)
//   AUDIT_LEADS_SHEET_ID          target spreadsheet ID (share it with the
//                                 service account as an editor)

import { createSign } from 'node:crypto';

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
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(privateKey).toString('base64url');

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claims}.${signature}`,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Google token request failed (${res.status})`);
  const { access_token: accessToken } = await res.json();
  return accessToken;
}

export async function appendRow(values) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.AUDIT_LEADS_SHEET_ID;
  if (!email || !rawKey || !sheetId) return { saved: false, skipped: true };

  const accessToken = await getAccessToken(email, rawKey.replace(/\\n/g, '\n'));
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
  return { saved: true, skipped: false };
}
