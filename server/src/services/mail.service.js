import nodemailer from 'nodemailer';
import env from '../config/env.js';

/**
 * Email via Gmail SMTP (Nodemailer). Configured through .env:
 *   SMTP_USER  – your Gmail address
 *   SMTP_PASS  – a Gmail "app password" (NOT your normal password)
 *   MAIL_TO    – where to receive messages (defaults to SMTP_USER)
 *
 * If SMTP isn't configured the functions no-op gracefully so the app
 * never crashes — they just log a warning.
 */
let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!env.mail.user || !env.mail.pass) return null;
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: env.mail.user, pass: env.mail.pass },
  });
  return transporter;
}

const escapeHtml = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Email a contact-form submission to the site owner. Returns true if sent. */
export async function sendContactEmail({ name, email, subject, message }) {
  const t = getTransporter();
  if (!t) {
    console.warn('[mail] SMTP not configured — skipping email. Set SMTP_USER / SMTP_PASS in .env.');
    return false;
  }

  await t.sendMail({
    from: `"Portfolio Contact" <${env.mail.user}>`,
    to: env.mail.to || env.mail.user,
    replyTo: email, // hitting "Reply" answers the sender directly
    subject: subject ? `Portfolio · ${subject}` : `New message from ${name}`,
    text: `From: ${name} <${email}>\nSubject: ${subject || '(none)'}\n\n${message}`,
    html: `
      <h2>New portfolio message</h2>
      <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject || '(none)')}</p>
      <hr/>
      <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
    `,
  });
  return true;
}

export default sendContactEmail;
