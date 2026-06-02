// ==========================================
// DOM Elements
// ==========================================
const hamburger = document.querySelector('.nav-hamburger');
const navMenu = document.querySelector('.nav-menu');
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.hero .slide');
const dots = document.querySelectorAll('.slider-dots .dot');
const prevBtn = document.querySelector('.nav-btn.prev');
const nextBtn = document.querySelector('.nav-btn.next');
const hairSlides = document.querySelectorAll('.hair-slide');
const hairPrev = document.querySelector('.hair-prev');
const hairNext = document.querySelector('.hair-next');
const feedbackForm = document.querySelector('.feedback-form');
const accordionHeaders = document.querySelectorAll('.accordion-header');

// ==========================================
// 1. HAMBURGER MENU MOBILE
// ==========================================
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Tutup menu otomatis jika salah satu link diklik
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ==========================================
// 2. HERO SLIDER LOGIC
// ==========================================
let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
    if(slides.length > 0) {
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        currentSlide = index;
    }
}

function nextSlide() {
    if(slides.length > 0) {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if(slides.length > 0) {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
}

if (dots.length > 0) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
}

// Auto slide
function startAutoSlide() {
    if(slides.length > 0) {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
}
startAutoSlide();

// ==========================================
// 3. HAIR STYLE SLIDER
// ==========================================
let currentHairSlide = 0;

function showHairSlide(index) {
    if(hairSlides.length > 0) {
        hairSlides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        currentHairSlide = index;
    }
}

if (hairNext && hairPrev) {
    hairNext.addEventListener('click', () => {
        currentHairSlide = (currentHairSlide + 1) % hairSlides.length;
        showHairSlide(currentHairSlide);
    });

    hairPrev.addEventListener('click', () => {
        currentHairSlide = (currentHairSlide - 1 + hairSlides.length) % hairSlides.length;
        showHairSlide(currentHairSlide);
    });
}

// ==========================================
// 4. SMOOTH SCROLLING
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (navMenu) navMenu.classList.remove('active');
    });
});

// ==========================================
// 5. FAQ ACCORDION
// ==========================================
if (accordionHeaders.length > 0) {
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
}

// ==========================================
// 6. FORM SUBMISSION (Aman jika form belum ada)
// ==========================================
if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const textarea = feedbackForm.querySelector('textarea');
        const message = textarea ? textarea.value.trim() : '';
        
        if (message) {
            const submitBtn = feedbackForm.querySelector('.submit-btn');
            if (submitBtn) submitBtn.style.transform = 'scale(1.2) rotate(360deg)';
            
            setTimeout(() => {
                alert('✅ Terima kasih atas saran Anda! Pesan telah terkirim.');
                if (textarea) textarea.value = '';
                if (submitBtn) submitBtn.style.transform = 'scale(1)';
            }, 500);
        } else {
            alert('❌ Mohon isi pesan Anda terlebih dahulu.');
        }
    });
}

// ==========================================
// 7. NAVBAR SCROLL EFFECT
// ==========================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 25px rgba(0,0,0,0.12)';
        } else {
            navbar.style.background = 'var(--white)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        }
    }
});

// ==========================================
// 8. SCROLL ANIMATIONS
// ==========================================
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

document.querySelectorAll('section, .packages-grid, .reviews-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(el);
});

const reviews = document.querySelectorAll('.review');
if (reviews.length > 0) {
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
}

const packageCards = document.querySelectorAll('.package-card');
if (packageCards.length > 0) {
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
}

// ==========================================
// 9. PRELOADER
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});