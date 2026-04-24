import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

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


    await transporter.sendMail({
      from: '"PeaksLocal" <greg.voll@peakslocal.com>',
      to: 'greg.voll@peakslocal.com',
      replyTo: email,
      subject: `New Contact Form Submission — ${name}`,
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
            <p style="margin:6px 0 0;color:#8aa0b8;font-size:13px;">New Contact Form Submission</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px 24px;">
            <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">You have a new contact request. Details below:</p>

            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr style="border-bottom:1px solid #e5e7eb;">
                <td style="padding:12px 0;color:#6b7280;font-size:13px;width:160px;vertical-align:top;">Name</td>
                <td style="padding:12px 0;color:#111827;font-size:14px;font-weight:600;">${name}</td>
              </tr>
              <tr style="border-bottom:1px solid #e5e7eb;">
                <td style="padding:12px 0;color:#6b7280;font-size:13px;vertical-align:top;">Email</td>
                <td style="padding:12px 0;font-size:14px;"><a href="mailto:${email}" style="color:#3aad64;text-decoration:none;">${email}</a></td>
              </tr>
              <tr style="border-bottom:1px solid #e5e7eb;">
                <td style="padding:12px 0;color:#6b7280;font-size:13px;vertical-align:top;">Phone</td>
                <td style="padding:12px 0;color:#111827;font-size:14px;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;color:#6b7280;font-size:13px;vertical-align:top;">Message</td>
                <td style="padding:12px 0;color:#111827;font-size:14px;line-height:1.65;">${message.replace(/\n/g, '<br>')}</td>
              </tr>
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
                    Reply directly to this email to respond to <strong>${name}</strong> at
                    <a href="mailto:${email}" style="color:#3aad64;text-decoration:none;">${email}</a>
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

    try {
      await transporter.sendMail({
        from: '"PeaksLocal" <greg.voll@peakslocal.com>',
        to: email,
        subject: 'Thanks for reaching out — Peaks Local',
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:#0f2440;padding:32px 40px;">
            <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.3px;">Peaks Local</p>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 40px 20px;">
            <p style="margin:0;color:#111827;font-size:15px;line-height:1.7;">
              Hi ${name}, thanks for contacting Peaks Local. We've received your message and will be in touch shortly.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 28px;">
            <p style="margin:0;color:#3aad64;font-size:13px;font-weight:600;">This is a temporary confirmation message while final copy is being prepared.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:18px 40px;text-align:center;">
            <a href="https://peakslocal.com" style="color:#0f2440;text-decoration:none;font-size:12px;">
              Peaks Local Logo · peakslocal.com
            </a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
        `,
      });
    } catch (confirmationErr) {
      console.error('Confirmation email error:', confirmationErr.message);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact email error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
