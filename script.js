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


function validatePhone(){
  const digitsOnly = phoneNumber.value.replace(/\D/g, '');

  if (digitsOnly.length < 7 || digitsOnly.length > 12){
    phoneError.classList.remove('hidden');
    phoneNumber.style.borderColor = '#e11d48';
    return false;
  } else {
    phoneError.classList.add('hidden');
    phoneNumber.style.borderColor = '#e6e9f0';
    return true;
  }
}
