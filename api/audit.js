import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, business, email, website, challenge } = req.body;

  if (!name || !business || !email || !website) {
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
      from: `"PeaksLocal Audit" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `New Audit Request — ${business} (${name})`,
      html: `
        <h2>New Visibility Audit Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Business:</strong> ${business}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Website / Location:</strong> ${website}</p>
        <p><strong>Biggest Challenge:</strong> ${challenge || 'Not provided'}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Audit email error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
