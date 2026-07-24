// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // close all
      faqItems.forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-a');
        if (a) a.style.maxHeight = null;
      });

      // open clicked one if it wasn't already open
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});
// Contact form submit
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validatePhone()){
    phoneNumber.focus();
    return;
  }
  contactForm.style.display = 'none';
  successMsg.classList.remove('hidden');
});

// Sticky navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,.06)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});


// Typical local-number length (and, where useful, allowed leading digits)
// per country dial code. Not every country in the list is covered — the
// ones below are the highest-traffic ones; everything else falls back to
// a sensible generic range (7–14 digits, no leading 0).
const PHONE_RULES = {
  '+91':  { min: 10, max: 10, startDigits: '6789', label: 'a 10-digit number starting with 6-9' }, // India
  '+1':   { min: 10, max: 10, label: 'a 10-digit number' },                                          // US / Canada
  '+44':  { min: 10, max: 10, label: 'a 10-digit number (without the leading 0)' },                   // UK
  '+61':  { min: 9,  max: 9,  startDigits: '4', label: 'a 9-digit mobile number starting with 4' },  // Australia
  '+971': { min: 9,  max: 9,  startDigits: '5', label: 'a 9-digit number starting with 5' },         // UAE
  '+92':  { min: 10, max: 10, startDigits: '3', label: 'a 10-digit number starting with 3' },        // Pakistan
  '+880': { min: 10, max: 10, startDigits: '1', label: 'a 10-digit number starting with 1' },        // Bangladesh
  '+234': { min: 10, max: 10, label: 'a 10-digit number' },                                          // Nigeria
  '+27':  { min: 9,  max: 9,  label: 'a 9-digit number' },                                           // South Africa
  '+49':  { min: 10, max: 11, label: 'a 10-11 digit number' },                                       // Germany
  '+33':  { min: 9,  max: 9,  label: 'a 9-digit number (without the leading 0)' },                   // France
  '+86':  { min: 11, max: 11, startDigits: '1', label: 'an 11-digit number starting with 1' },       // China
  '+81':  { min: 10, max: 10, label: 'a 10-digit number' },                                          // Japan
  '+82':  { min: 9,  max: 10, label: 'a 9-10 digit number' },                                        // South Korea
  '+65':  { min: 8,  max: 8,  label: 'an 8-digit number' },                                          // Singapore
  '+60':  { min: 9,  max: 10, label: 'a 9-10 digit number' },                                        // Malaysia
  '+94':  { min: 9,  max: 9,  label: 'a 9-digit number' },                                           // Sri Lanka
  '+977': { min: 10, max: 10, label: 'a 10-digit number' },                                          // Nepal
  '+966': { min: 9,  max: 9,  startDigits: '5', label: 'a 9-digit number starting with 5' },         // Saudi Arabia
  '+63':  { min: 10, max: 10, label: 'a 10-digit number' },                                          // Philippines
  '+62':  { min: 9,  max: 12, label: 'a 9-12 digit number' },                                        // Indonesia
  '+55':  { min: 10, max: 11, label: 'a 10-11 digit number' },                                       // Brazil
  '+52':  { min: 10, max: 10, label: 'a 10-digit number' },                                          // Mexico
  '+7':   { min: 10, max: 10, label: 'a 10-digit number' },                                          // Russia / Kazakhstan
  '+254': { min: 9,  max: 9,  label: 'a 9-digit number' },                                           // Kenya
};
const DEFAULT_PHONE_RULE = { min: 7, max: 14, label: '7-14 digits' };

function getSelectedPhoneRule(){
  const code = countryCode ? countryCode.value : null;
  return (code && PHONE_RULES[code]) || DEFAULT_PHONE_RULE;
}

function validatePhone(){
  if (!phoneNumber) return true;

  const digitsOnly = phoneNumber.value.replace(/\D/g, '');
  const rule = getSelectedPhoneRule();

  let valid = digitsOnly.length >= rule.min && digitsOnly.length <= rule.max;
  if (valid && rule.startDigits){
    valid = rule.startDigits.includes(digitsOnly.charAt(0));
  }

  if (!valid){
    if (phoneError){
      phoneError.textContent = `Please enter ${rule.label}`;
      phoneError.classList.remove('hidden');
    }
    phoneNumber.style.borderColor = '#e11d48';
    return false;
  } else {
    if (phoneError) phoneError.classList.add('hidden');
    phoneNumber.style.borderColor = '#e6e9f0';
    return true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const countryCodeEl = document.getElementById('countryCode');
  const phoneNumberEl = document.getElementById('phoneNumber');

  if (phoneNumberEl){
    phoneNumberEl.addEventListener('input', validatePhone);
  }
  if (countryCodeEl){
    countryCodeEl.addEventListener('change', () => {
      if (phoneNumberEl && phoneNumberEl.value) validatePhone();
    });
  }
});

function initStackScroll(){
  const wraps = Array.from(document.querySelectorAll('.stack-wrap'));
  if (!wraps.length) return;

  const SIDE_INSET = '4%'; // matches .stack-wrap's own side padding

  function updateStack(){
    const vh = window.innerHeight;

    wraps.forEach((wrap, index) => {
      const card = wrap.querySelector('.stack-card');
      const rect = wrap.getBoundingClientRect();

      if (rect.top <= 0 && rect.bottom > vh){
        // section is being scrolled through — pin card to top of viewport
        card.style.position = 'fixed';
        card.style.top = '0';
        card.style.margin = '0';
        card.style.left = SIDE_INSET;
        card.style.right = SIDE_INSET;
        card.style.width = 'auto';
      } else if (rect.bottom <= vh){
        // section has fully scrolled past — lock card to bottom of its own wrap
        card.style.position = 'absolute';
        card.style.top = 'auto';
        card.style.bottom = '0';
        card.style.left = SIDE_INSET;
        card.style.right = SIDE_INSET;
        card.style.margin = '0';
        card.style.width = 'auto';
      } else {
        // section hasn't been reached yet — normal flow
        card.style.position = 'relative';
        card.style.top = 'auto';
        card.style.bottom = 'auto';
        card.style.left = 'auto';
        card.style.right = 'auto';
        card.style.margin = '0 auto';
        card.style.width = '100%';
      }

      card.style.zIndex = 10 + index;
    });
  }

  window.addEventListener('scroll', updateStack, { passive:true });
  window.addEventListener('resize', updateStack);
  updateStack();
}

document.addEventListener('DOMContentLoaded', initStackScroll);

// Floating "back to top" button — show once the user has scrolled near the bottom of the page
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  function toggleBackToTop(){
    const scrolledPastStart = window.scrollY > 400;
    const nearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 600);
    if (scrolledPastStart || nearBottom) {
      backToTopBtn.classList.remove('hidden');
    } else {
      backToTopBtn.classList.add('hidden');
    }
  }
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
