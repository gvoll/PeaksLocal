import nodemailer from 'nodemailer';
import { auditRequestEmail } from '../src/lib/emailTemplates.js';
import { escapeHtml, isValidEmail, isWithinLength } from '../src/lib/emailSafety.js';
import { appendRow } from '../src/lib/sheetsLog.js';

const CUSTOMER_ACCESS = {
  storefront: 'Storefront (customers visit)',
  service_area: 'Service area (we travel to them)',
  both: 'Both',
};
const LOCATIONS = {
  one: 'One location',
  multiple: 'More than one location',
};
const PROFILES = {
  google: 'Google Business Profile',
  apple: 'Apple Business Connect',
  bing: 'Bing Places',
  not_sure: 'Not sure',
};

const MAX = {
  name: 200,
  businessName: 200,
  websiteURL: 300,
  cityState: 200,
  address: 300,
  businessPhone: 40,
  industry: 200,
  searchTerm: 200,
  competitors: 500,
  otherProfiles: 500,
  challenge: 5000,
};

// Accepts "acme.com", "www.acme.com", or a full URL; returns a normalized
// https URL, or '' when the value doesn't look like a website.
function normalizeWebsite(value) {
  const trimmed = String(value || '').trim();
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    if (!url.hostname.includes('.') || /\s/.test(trimmed)) return '';
    return url.toString();
  } catch {
    return '';
  }
}

function row(label, valueHtml, { last = false, bold = false } = {}) {
  return `
              <tr${last ? '' : ' style="border-bottom:1px solid #e5e7eb;"'}>
                <td style="padding:12px 0;color:#6b7280;font-size:13px;width:160px;vertical-align:top;">${label}</td>
                <td style="padding:12px 0;color:#111827;font-size:14px;line-height:1.65;${bold ? 'font-weight:600;' : ''}">${valueHtml}</td>
              </tr>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};

  // Honeypot: real users never see or fill this field in. A bot that
  // auto-fills every field will populate it, so silently pretend success
  // without actually sending anything.
  if (body.fax) {
    return res.status(200).json({ success: true });
  }

  const text = (key) => (typeof body[key] === 'string' ? body[key].trim() : '');
  const name = text('name');
  const email = text('email');
  const businessName = text('businessName');
  const cityState = text('cityState');
  const address = text('address');
  const businessPhone = text('businessPhone');
  const industry = text('industry');
  const searchTerm = text('searchTerm');
  const competitors = text('competitors');
  const otherProfiles = text('otherProfiles');
  const challenge = text('challenge');
  const customerAccess = text('customerAccess');
  const locations = text('locations');
  const profiles = Array.isArray(body.profiles)
    ? body.profiles.filter((p) => Object.hasOwn(PROFILES, p))
    : [];

  if (!name || !email || !businessName || !text('websiteURL') || !cityState) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }
  if (!/,\s*\S|\s[A-Za-z]{2}$/.test(cityState)) {
    return res.status(400).json({ error: 'Please add your state to City & State, for example Denver, CO.' });
  }
  if (!Object.hasOwn(CUSTOMER_ACCESS, customerAccess) || !Object.hasOwn(LOCATIONS, locations)) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  const websiteURL = normalizeWebsite(body.websiteURL);
  if (!websiteURL) {
    return res.status(400).json({ error: 'Please provide a valid website address.' });
  }
  if (
    !isWithinLength(name, MAX.name) ||
    !isWithinLength(businessName, MAX.businessName) ||
    !isWithinLength(websiteURL, MAX.websiteURL) ||
    !isWithinLength(cityState, MAX.cityState) ||
    !isWithinLength(address, MAX.address) ||
    !isWithinLength(businessPhone, MAX.businessPhone) ||
    !isWithinLength(industry, MAX.industry) ||
    !isWithinLength(searchTerm, MAX.searchTerm) ||
    !isWithinLength(competitors, MAX.competitors) ||
    !isWithinLength(otherProfiles, MAX.otherProfiles) ||
    !isWithinLength(challenge, MAX.challenge)
  ) {
    return res.status(400).json({ error: 'One or more fields is too long.' });
  }

  const profilesLabel = profiles.map((p) => PROFILES[p]).join(', ');

  // Save the request first so a failed email never loses a lead.
  let saved = false;
  let leadLog = 'not_configured';
  try {
    const result = await appendRow([
      new Date().toISOString(),
      name,
      email,
      businessName,
      websiteURL,
      cityState,
      address,
      businessPhone,
      CUSTOMER_ACCESS[customerAccess],
      LOCATIONS[locations],
      industry,
      searchTerm,
      competitors,
      profilesLabel,
      otherProfiles,
      challenge,
      text('sourcePage').slice(0, 200),
    ]);
    saved = result.saved;
    if (result.saved) leadLog = 'saved';
    else console.warn(`Audit lead log skipped, missing env vars: ${result.missing.join(', ')}`);
  } catch (err) {
    leadLog = 'failed';
    console.error('Audit lead log error:', err.message);
  }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    businessName: escapeHtml(businessName),
    websiteURL: escapeHtml(websiteURL),
    cityState: escapeHtml(cityState),
    address: escapeHtml(address),
    businessPhone: escapeHtml(businessPhone),
    industry: escapeHtml(industry),
    searchTerm: escapeHtml(searchTerm),
    competitors: escapeHtml(competitors).replace(/\n/g, '<br>'),
    profiles: escapeHtml(profilesLabel),
    otherProfiles: escapeHtml(otherProfiles).replace(/\n/g, '<br>'),
    challenge: escapeHtml(challenge).replace(/\n/g, '<br>'),
  };
  const notProvided = '<span style="color:#9ca3af;">Not provided</span>';
  const orNone = (value) => value || notProvided;

  const subjectTags = [
    customerAccess === 'storefront' ? null : CUSTOMER_ACCESS[customerAccess].split(' (')[0],
    locations === 'multiple' ? 'multi-location' : null,
  ].filter(Boolean);
  const subject =
    `New Audit Request · ${businessName} (${name})` +
    (subjectTags.length ? ` · ${subjectTags.join(', ')}` : '');

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: '"PeaksLocal" <greg.voll@peakslocal.com>',
        to: 'greg.voll@peakslocal.com',
        replyTo: email,
        subject,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#0f2440;padding:32px 40px;">
            <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.3px;">Peaks Local</p>
            <p style="margin:6px 0 0;color:#8aa0b8;font-size:13px;">New Visibility Audit Request</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px 24px;">
            <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">You have a new audit request. Details below:</p>

            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${row('Requestor Name:', safe.name, { bold: true })}
              ${row('Email:', `<a href="mailto:${safe.email}" style="color:#3aad64;text-decoration:none;">${safe.email}</a>`)}
              ${row('Business:', safe.businessName, { bold: true })}
              ${row('Website URL:', safe.websiteURL)}
              ${row('City &amp; State:', safe.cityState)}
              ${row('Street address:', orNone(safe.address))}
              ${row('Business phone:', orNone(safe.businessPhone))}
              ${row('Customer access:', escapeHtml(CUSTOMER_ACCESS[customerAccess]))}
              ${row('Locations:', escapeHtml(LOCATIONS[locations]))}
              ${row('What they do:', orNone(safe.industry))}
              ${row('Customer search term:', orNone(safe.searchTerm))}
              ${row('Competitors named:', orNone(safe.competitors))}
              ${row('Profiles set up:', orNone(safe.profiles))}
              ${row('Other profiles:', orNone(safe.otherProfiles))}
              ${row('Visibility challenge:', orNone(safe.challenge), { last: true })}
            </table>
          </td>
        </tr>

        <!-- Reply prompt -->
        <tr>
          <td style="padding:0 40px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#f0fdf4;border-left:4px solid #3aad64;border-radius:0 6px 6px 0;padding:14px 18px;">
                  <p style="margin:0;color:#374151;font-size:13px;line-height:1.6;">
                    Reply directly to this email to respond to <strong>${safe.name}</strong> at
                    <a href="mailto:${safe.email}" style="color:#3aad64;text-decoration:none;">${safe.email}</a>.
                    They also receive an automatic confirmation email.${saved ? ' This request was also saved to the Audit Requests Log.' : ''}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">Peaks Local &nbsp;·&nbsp; <a href="https://peakslocal.com" style="color:#9ca3af;text-decoration:none;">peakslocal.com</a></p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
      `,
      });
    } catch (err) {
      console.error('Audit email error:', err.message);
      // The request is already saved, so don't fail the submission.
      if (!saved) throw err;
    }

    try {
      await transporter.sendMail({
        from: '"PeaksLocal" <greg.voll@peakslocal.com>',
        to: email,
        subject: auditRequestEmail.subject,
        html: auditRequestEmail.html({ firstName: escapeHtml(name.split(/\s+/)[0] || '') }),
      });
    } catch (confirmationErr) {
      console.error('Audit confirmation email error:', confirmationErr.message);
    }

    return res.status(200).json({ success: true, leadLog });
  } catch (err) {
    console.error('Audit request error:', err.message);
    if (saved) return res.status(200).json({ success: true, leadLog });
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
