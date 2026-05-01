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
    <img src="https://peakslocal.com/logopeaks.png" alt="PeaksLocal" style="height:64px;width:auto;display:block;margin:0 auto;" />
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
