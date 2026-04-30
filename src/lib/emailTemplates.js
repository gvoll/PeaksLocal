// PeaksLocal Email Templates for React/Next.js
//
// Usage (Resend, SendGrid, Postmark, etc.):
//
//   import { auditRequestEmail, contactFormEmail } from './emailTemplates'
//
//   await resend.emails.send({
//     from: 'PeaksLocal <hello@peakslocal.com>',
//     to: submittedEmail,
//     subject: auditRequestEmail.subject,
//     html: auditRequestEmail.html({ firstName: 'Jane' }),
//   })
//
// firstName is optional - falls back to "Hi there," if not provided.
// Update AUDIT_FORM_URL to match your actual audit form anchor/route.

const LOGO_BASE64 = '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';
const AUDIT_FORM_URL = 'https://peakslocal.com/#audit';

const styles = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #f0f4f8; font-family: 'Inter', Arial, sans-serif; color: #1a1a1a; }
    .wrapper { max-width: 580px; margin: 32px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 16px rgba(27,58,92,0.10); }
    .header { background-color: #1B3A5C; padding: 28px 40px; text-align: center; }
    .header img { height: 64px; width: auto; display: block; margin: 0 auto; }
    .accent-bar { height: 4px; background: linear-gradient(90deg, #1B3A5C 0%, #2E7D4F 100%); }
    .body { padding: 36px 40px 28px; }
    .greeting { font-size: 20px; font-weight: 700; color: #1B3A5C; margin-bottom: 12px; }
    .body-text { font-size: 14.5px; color: #444; line-height: 1.7; margin-bottom: 20px; }
    .body-text strong { color: #1B3A5C; font-weight: 600; }
    .callout-navy { background: #E8EEF4; border-left: 4px solid #1B3A5C; border-radius: 0 6px 6px 0; padding: 18px 20px; margin-bottom: 24px; }
    .callout-green { background: #E8F4ED; border-left: 4px solid #2E7D4F; border-radius: 0 6px 6px 0; padding: 18px 20px; margin-bottom: 24px; }
    .callout-navy .box-title { font-size: 10.5px; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: #1B3A5C; margin-bottom: 10px; }
    .callout-green .box-title { font-size: 10.5px; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: #2E7D4F; margin-bottom: 10px; }
    .callout-navy ul, .callout-green ul { list-style: none; padding: 0; }
    .callout-navy ul li, .callout-green ul li { font-size: 14px; color: #333; line-height: 1.65; padding-left: 18px; position: relative; margin-bottom: 7px; }
    .callout-navy ul li strong, .callout-green ul li strong { color: #1B3A5C; font-weight: 600; }
    .callout-navy ul li:last-child, .callout-green ul li:last-child { margin-bottom: 0; }
    .callout-navy ul li::before { content: ''; position: absolute; left: 0; top: 7px; width: 7px; height: 7px; border-radius: 50%; background-color: #2E7D4F; }
    .callout-green ul li::before { content: ''; position: absolute; left: 0; top: 7px; width: 7px; height: 7px; border-radius: 50%; background-color: #1B3A5C; }
    .cta-wrap { text-align: center; margin: 28px 0 24px; }
    .cta-btn { display: inline-block; background-color: #2E7D4F; color: #ffffff !important; font-size: 14px; font-weight: 700; text-decoration: none; padding: 13px 32px; border-radius: 6px; }
    .sig { border-top: 1px solid #e5e9ee; padding-top: 20px; margin-top: 8px; }
    .sig-name { font-size: 15px; font-weight: 700; color: #1B3A5C; margin-bottom: 2px; }
    .sig-web { font-size: 13px; color: #777; }
    .sig-web a { color: #1B3A5C; text-decoration: none; font-weight: 500; }
    .footer { background: #f7f9fb; border-top: 1px solid #e5e9ee; padding: 16px 40px; text-align: center; }
    .footer p { font-size: 11.5px; color: #999; line-height: 1.7; }
    .footer a { color: #1B3A5C; text-decoration: none; }
  </style>
`;

const header = `
  <div class="header">
    <img src="data:image/png;base64,${LOGO_BASE64}" alt="PeaksLocal" />
  </div>
  <div class="accent-bar"></div>
`;

const signature = `
  <div class="sig">
    <p class="sig-name">The PeaksLocal Team</p>
    <p class="sig-web"><a href="https://peakslocal.com">peakslocal.com</a></p>
  </div>
`;

// Template 1: Audit Request
export const auditRequestEmail = {
  subject: "Your PeaksLocal Visibility Audit Request",

  html: ({ firstName = '' } = {}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your PeaksLocal Visibility Audit Request</title>
  ${styles}
</head>
<body>
<div class="wrapper">
  ${header}
  <div class="body">
    <p class="greeting">${firstName ? `Hi ${firstName},` : 'Hi there,'}</p>
    <p class="body-text">
      Thank you for submitting your PeaksLocal Visibility Audit Request. We'll be
      in touch once we've had a chance to review your online presence.
    </p>
    <div class="callout-navy">
      <div class="box-title">What we'll look at</div>
      <ul>
        <li>Your Google Business Profile, Apple Maps, and Bing presence</li>
        <li>Key directories, trust signals, and AI platform visibility</li>
        <li>Where the gaps are &mdash; and what it would take to close them</li>
      </ul>
    </div>
    <p class="body-text">
      No obligation. We take a current snapshot of how your business shows up and
      identify key opportunities to boost your visibility.
    </p>
    <p class="body-text">
      Questions in the meantime? Reply directly to this email.
    </p>
    ${signature}
  </div>
  <div class="footer">
    <p>You're receiving this because you submitted a visibility audit request at
    <a href="https://peakslocal.com">peakslocal.com</a>. &nbsp;&middot;&nbsp;
    <a href="https://peakslocal.com/privacy">Privacy Policy</a></p>
  </div>
</div>
</body>
</html>
  `,
};

// Template 2: Contact Form
export const contactFormEmail = {
  subject: "Thank you for contacting PeaksLocal",

  html: ({ firstName = '' } = {}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you for contacting PeaksLocal</title>
  ${styles}
</head>
<body>
<div class="wrapper">
  ${header}
  <div class="body">
    <p class="greeting">${firstName ? `Hi ${firstName},` : 'Hi there,'}</p>
    <p class="body-text">
      Thank you for contacting PeaksLocal! We will follow up with you shortly.
    </p>
    <div class="callout-green">
      <div class="box-title">Why local visibility matters</div>
      <ul>
        <li><strong>46%</strong> of all Google searches have local intent</li>
        <li><strong>78%</strong> of local mobile searches result in an offline purchase</li>
        <li>AI assistants like Siri and ChatGPT now pull directly from platforms like Google, Apple Maps, and Yelp &mdash; businesses with gaps are invisible to these results</li>
        <li>Consistent business information across the web is one of the strongest trust signals for local rankings</li>
      </ul>
    </div>
    <p class="body-text">
      Not sure where your business stands? See exactly where you're showing up &mdash; and where you're not.
    </p>
    <div class="cta-wrap">
      <a href="${AUDIT_FORM_URL}" class="cta-btn">Request Your Free Visibility Audit</a>
    </div>
    ${signature}
  </div>
  <div class="footer">
    <p>You're receiving this because you submitted a message at
    <a href="https://peakslocal.com">peakslocal.com</a>. &nbsp;&middot;&nbsp;
    <a href="https://peakslocal.com/privacy">Privacy Policy</a></p>
  </div>
</div>
</body>
</html>
  `,
};
