/**
 * form.js — Contact Form Validation
 *
 * Validates all fields inline (on blur, and on input once an
 * error has been shown). On submit: validates everything, focuses
 * the first invalid field, or simulates a successful send.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FORM_FIELDS = [
  {
    id: 'fname', errId: 'fname-err',
    rules: [
      { test: v => v.length >= 2, msg: 'Please enter your name (at least 2 characters).' }
    ]
  },
  {
    id: 'femail', errId: 'femail-err',
    rules: [
      { test: v => v.length > 0,         msg: 'Email address is required.' },
      { test: v => EMAIL_REGEX.test(v),  msg: 'Please enter a valid email address.' }
    ]
  },
  {
    id: 'fsubject', errId: 'fsubject-err',
    rules: [
      { test: v => v.length >= 3, msg: 'Subject is required.' }
    ]
  },
  {
    id: 'fmessage', errId: 'fmessage-err',
    rules: [
      { test: v => v.length >= 10, msg: 'Message must be at least 10 characters.' }
    ]
  }
];

function validateField(input, errEl, rules) {
  const value = input.value.trim();
  let errorMsg = '';

  for (const { test, msg } of rules) {
    if (!test(value)) { errorMsg = msg; break; }
  }

  input.classList.toggle('has-error', !!errorMsg);
  if (errEl) errEl.textContent = errorMsg;
  return !errorMsg;
}

function initForm() {
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn   = document.getElementById('submitBtn');
  if (!form) return;

  FORM_FIELDS.forEach(({ id, errId, rules }) => {
    const input = document.getElementById(id);
    const errEl = document.getElementById(errId);
    if (!input) return;

    input.addEventListener('blur', () => validateField(input, errEl, rules));
    input.addEventListener('input', () => {
      if (input.classList.contains('has-error')) {
        validateField(input, errEl, rules);
      }
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    let allValid = true;
    FORM_FIELDS.forEach(({ id, errId, rules }) => {
      const input = document.getElementById(id);
      const errEl = document.getElementById(errId);
      if (!validateField(input, errEl, rules)) allValid = false;
    });

    if (!allValid) {
      const firstError = form.querySelector('.has-error');
      if (firstError) firstError.focus();
      return;
    }

    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send message →';

      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => { formSuccess.hidden = true; }, 5000);
    }, 1200);
  });
}
