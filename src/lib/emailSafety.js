// Shared helpers for safely handling user-submitted form input before it's
// interpolated into HTML emails (api/contact.js, api/audit.js) or used as
// email headers. None of the form endpoints escaped user input before this,
// so a submitted name/message containing HTML could inject markup into the
// notification emails the business owner reads.

export function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value) {
  return typeof value === 'string' && value.length <= 254 && EMAIL_PATTERN.test(value);
}

export function isWithinLength(value, max) {
  return typeof value === 'string' && value.length <= max;
}
