// ================= NAVBAR SCROLL EFFECT =================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ================= MOUSE PARALLAX EFFECT ON HOVER =================
document.addEventListener('mousemove', (e) => {
    const parallaxElements = document.querySelectorAll('.service-card, .stat-box, .benefit-item');
    parallaxElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const moveX = (x - rect.width / 2) * 0.02;
        const moveY = (y - rect.height / 2) * 0.02;
        
        element.style.transform = `perspective(1000px) rotateX(${moveY}deg) rotateY(${moveX}deg)`;
    });
});

document.addEventListener('mouseleave', () => {
    const parallaxElements = document.querySelectorAll('.service-card, .stat-box, .benefit-item');
    parallaxElements.forEach(element => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// ================= BENEFITS LIST NAVIGATION =================
const benefitsList = document.querySelector('.benefits-list');
const benefitItems = document.querySelectorAll('.benefit-item');
const carouselPrevBtn = document.querySelector('.carousel-prev');
const carouselNextBtn = document.querySelector('.carousel-next');

if (benefitsList && benefitItems.length > 0 && carouselPrevBtn && carouselNextBtn) {
    let currentIndex = 0;
    
    const showBenefit = (index) => {
        benefitItems.forEach((item, i) => {
            item.style.opacity = '1';
            item.style.pointerEvents = 'auto';
            item.style.maxHeight = 'none';
        });
    };
    
    const updateButtons = () => {
        // Buttons cycle through for visual effect, benefits always visible
        carouselPrevBtn.disabled = false;
        carouselNextBtn.disabled = false;
    };
    
    carouselNextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % benefitItems.length;
        // Smooth scroll to that benefit
        benefitItems[currentIndex].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    });
    
    carouselPrevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + benefitItems.length) % benefitItems.length;
        // Smooth scroll to that benefit
        benefitItems[currentIndex].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    });
    
    updateButtons();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') carouselPrevBtn.click();
        if (e.key === 'ArrowRight') carouselNextBtn.click();
    });
}

// ================= HAMBURGER MENU =================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// ================= SCROLL ANIMATIONS WITH INTERSECTION OBSERVER =================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation classes with enhanced timing
            entry.target.classList.add('fade-in-up');
            
            // Animate child elements with stagger
            const children = entry.target.querySelectorAll('.stat-box, .service-card, .why-card, .process-step, .case-box, .testimonial-card, .brand, .pricing-card-simple, .faq-item-simple, .benefit-item');
            
            children.forEach((child, index) => {
                child.style.animationDelay = `${index * 0.15}s`;
                child.style.animation = 'fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                child.style.opacity = '0';
            });
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections with enhanced animations
const sections = document.querySelectorAll('.hero, .stats, .brands, .services, .why-choose, .process, .case-studies, .testimonials, .pricing, .differences, .faq, .contact, .footer');
sections.forEach(section => {
    observer.observe(section);
});

// ================= ANIMATE STAT NUMBERS =================
const animateNumbers = (element) => {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 30;
    
    const updateNumber = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            setTimeout(updateNumber, 30);
        } else {
            element.textContent = target;
        }
    };
    
    updateNumber();
};

// Trigger number animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.stat-number');
                numbers.forEach(num => {
                    const original = num.textContent;
                    const match = original.match(/\d+/);
                    if (match) {
                        animateNumbers(num);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// ================= FAQ ACCORDION =================
const faqButtons = document.querySelectorAll('.faq-question-simple');

faqButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const answer = this.nextElementSibling;
        
        if (!answer || !answer.classList.contains('faq-answer-simple')) {
            console.error('Answer element not found for button:', this);
            return;
        }
        
        const isActive = answer.classList.contains('active');
        
        // Close all other FAQs with smooth transition
        const allAnswers = document.querySelectorAll('.faq-answer-simple');
        const allQuestions = document.querySelectorAll('.faq-question-simple');
        
        allAnswers.forEach(ans => {
            ans.classList.remove('active');
        });
        allQuestions.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Open current FAQ if it was closed
        if (!isActive) {
            answer.classList.add('active');
            this.classList.add('active');
            
            // Smooth scroll to opened FAQ
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    });
});

// ================= SMOOTH SCROLL =================
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target && target !== this) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            
            // Close menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        }
    });
});

// ================= CONTACT FORM =================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        // Add loading state
        btn.style.opacity = '0.7';
        btn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Change button text with animation
            btn.textContent = '✓ Message Sent!';
            btn.style.background = 'var(--accent-green)';
            btn.style.opacity = '1';
            
            // Reset form
            this.reset();
            
            // Restore button after 3 seconds
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 3000);
        }, 1000);
    });
}

// ================= SMOOTH HOVER ANIMATIONS =================
const hoverElements = document.querySelectorAll('.service-card, .why-card, .process-step, .case-box, .testimonial-card, .pricing-card-simple');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ================= BUTTON RIPPLE EFFECT WITH WAVE =================
const buttons = document.querySelectorAll('.btn-primary');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'rippleAnimation 0.6s ease-out';
        
        // Remove existing ripples
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ================= PARALLAX EFFECT ON SCROLL =================
const parallaxElements = document.querySelectorAll('[data-parallax]');

window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementOffset = element.offsetTop;
        const distance = scrollPosition - elementOffset;
        const parallax = distance * 0.5;
        
        element.style.transform = `translateY(${parallax}px)`;
    });
});

// ================= FORM INPUT FOCUS ANIMATION WITH ENHANCED EFFECTS =================
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.animation = 'none';
        this.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => {
            this.style.borderColor = 'var(--primary)';
            this.style.boxShadow = '0 0 25px rgba(251, 76, 1, 0.3), inset 0 1px 0 rgba(251, 76, 1, 0.1)';
            this.style.transform = 'scale(1.02)';
        }, 10);
    });
    
    input.addEventListener('blur', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
        this.style.transform = 'scale(1)';
    });
    
    input.addEventListener('input', function() {
        this.style.boxShadow = '0 0 25px rgba(251, 76, 1, 0.25), inset 0 1px 0 rgba(251, 76, 1, 0.08)';
    });
});

// ================= LOAD MORE EFFECT =================
// Add animation to stat boxes on page load
window.addEventListener('load', () => {
    const statBoxes = document.querySelectorAll('.stat-box');
    statBoxes.forEach((box, index) => {
        box.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`;
    });
});

// ================= SCROLL TO TOP BUTTON =================
const createScrollToTopBtn = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(251, 76, 1, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
            scrollBtn.style.alignItems = 'center';
            scrollBtn.style.justifyContent = 'center';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollBtn.addEventListener('mouseover', function() {
        this.style.background = 'var(--accent-green)';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseout', function() {
        this.style.background = 'var(--primary)';
        this.style.transform = 'scale(1)';
    });
};

createScrollToTopBtn();

// ================= COUNTER ANIMATION FOR STATS =================
const animateCounters = () => {
    const counterElements = document.querySelectorAll('[data-counter]');
    
    counterElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-counter'));
        let count = 0;
        const increment = Math.ceil(target / 30);
        
        const interval = setInterval(() => {
            count += increment;
            if (count >= target) {
                element.textContent = target;
                clearInterval(interval);
            } else {
                element.textContent = count;
            }
        }, 30);
    });
};

// ================= ACTIVE NAV LINK ON SCROLL =================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = '';
        }
    });
});

// ================= PAGE TRANSITION ANIMATION =================
const pageTransition = () => {
    const html = document.documentElement;
    html.style.transition = 'opacity 0.3s ease';
    
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('/')) {
            e.preventDefault();
            html.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = e.target.getAttribute('href');
            }, 300);
        }
    });
};

pageTransition();

// ================= CONSOLE LOG =================
console.log('✓ Website loaded with enhanced animations');
console.log('✓ FAQ Items found:', faqButtons.length);
console.log('✓ Smooth scroll enabled');
console.log('✓ Intersection Observer active');
console.log('✓ Animations: fadeInUp, slideInLeft, slideInRight, scaleIn');

const slider = document.querySelector(".testimonial-slider");

document.querySelector(".next-btn").onclick = () =>{
    slider.scrollBy({
        left: 550,
        behavior:"smooth"
    });
};

document.querySelector(".prev-btn").onclick = () =>{
    slider.scrollBy({
        left: -550,
        behavior:"smooth"
    });
};
const tabs=document.querySelectorAll(".service-tab");

const title=document.querySelector(".services-right h2");

const text=document.querySelector(".services-right p");

const services=[

{
title:"AI Search Optimisation",

desc:"Improve your visibility across AI-powered search experiences and emerging discovery LLMs platforms. We build Premium LLMs Citation Backlinks content structure, authority signals, and search relevance for better reach. Stay discoverable as search evolves beyond traditional rankings."
},

{
title:"SaaS Link Building",

desc:"Build high-authority backlinks tailored specifically for SaaS growth and competitive markets. Our campaigns focus on driving qualified traffic, stronger rankings, and brand authority. Scale organic acquisition with links that support long-term business growth."
},

{
title:"Strategic Blogger Outreach",

desc:"Connect with trusted publishers and industry-relevant blogs through personalized outreach. We secure meaningful placements that strengthen your online presence and credibility. Create authentic relationships that deliver lasting SEO value."
},

{
title:"Multilingual Link Building",

desc:"Expand your brand presence across global markets with region-specific link-building strategies. We acquire high-quality backlinks in multiple languages while maintaining local relevance. Reach international audiences and grow visibility beyond borders."
}

];

tabs.forEach(tab=>{

tab.addEventListener("click",()=>{

tabs.forEach(t=>t.classList.remove("active"));

tab.classList.add("active");

const i=tab.dataset.service;

title.innerText=services[i].title;

text.innerText=services[i].desc;

});


});

if(window.innerWidth <= 768){

   document.querySelectorAll(".service-panel").forEach(panel=>{
      panel.style.display="block";
   });

}
