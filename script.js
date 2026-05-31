// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLeft = document.querySelector('.nav-left');
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const hairSlides = document.querySelectorAll('.hair-slide');
const hairPrev = document.querySelector('.hair-prev');
const hairNext = document.querySelector('.hair-next');
const feedbackForm = document.querySelector('.feedback-form');
const accordionHeaders = document.querySelectorAll('.accordion-header');

// Navbar Mobile Toggle
hamburger.addEventListener('click', () => {
    navLeft.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLeft.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Hero Slider
let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto slide
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

sliderContainer.addEventListener('mouseenter', stopAutoSlide);
sliderContainer.addEventListener('mouseleave', startAutoSlide);
startAutoSlide();

// Hair Style Slider
let currentHairSlide = 0;

function showHairSlide(index) {
    hairSlides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    currentHairSlide = index;
}

hairNext.addEventListener('click', () => {
    currentHairSlide = (currentHairSlide + 1) % hairSlides.length;
    showHairSlide(currentHairSlide);
});

hairPrev.addEventListener('click', () => {
    currentHairSlide = (currentHairSlide - 1 + hairSlides.length) % hairSlides.length;
    showHairSlide(currentHairSlide);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Close mobile menu
        navLeft.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// FAQ Accordion
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const item = header.parentElement;
        const accordion = item.parentElement;
        
        // Close other accordions in same column
        accordion.querySelectorAll('.accordion-content').forEach(otherContent => {
            if (otherContent !== content) {
                otherContent.classList.remove('active');
                otherContent.previousElementSibling.classList.remove('active');
            }
        });
        
        // Toggle current
        header.classList.toggle('active');
        content.classList.toggle('active');
    });
});

// Form Submission
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const textarea = feedbackForm.querySelector('textarea');
    const message = textarea.value.trim();
    
    if (message) {
        // Animate submit button
        const submitBtn = feedbackForm.querySelector('.submit-btn');
        submitBtn.style.transform = 'scale(1.2) rotate(360deg)';
        
        setTimeout(() => {
            alert('✅ Terima kasih atas saran Anda! Pesan telah terkirim.');
            textarea.value = '';
            submitBtn.style.transform = 'scale(1)';
        }, 500);
    } else {
        alert('❌ Mohon isi pesan Anda terlebih dahulu.');
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 25px rgba(0,0,0,0.12)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section, .packages-grid, .reviews-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(el);
});

// Staggered review animation
const reviews = document.querySelectorAll('.review');
reviews.forEach((review, index) => {
    const reviewObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });
    reviewObserver.observe(review);
});

// Package cards stagger
const packageCards = document.querySelectorAll('.package-card');
packageCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    }, { threshold: 0.2 });
    
    cardObserver.observe(card);
});

// Preloader (Optional)
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});