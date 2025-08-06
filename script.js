// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 35, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 35, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Counter animation for hero stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate counters when hero stats come into view
            if (entry.target.classList.contains('hero-stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .plan-card, .tech-item, .reason-item, .faq-item, .offer-card, .hero-stats').forEach(el => {
    observer.observe(el);
});

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.nav-dot');

const showTestimonial = (index) => {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show selected testimonial and activate corresponding dot
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
        testimonialDots[index].classList.add('active');
    }
};

// Testimonial navigation dots
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-advance testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Initialize first testimonial
showTestimonial(0);

// Countdown Timer for Offers
const updateTimer = () => {
    const now = new Date().getTime();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 15);
    endDate.setHours(23, 59, 59, 999);
    
    const distance = endDate.getTime() - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    
    if (daysElement) daysElement.textContent = days;
    if (hoursElement) hoursElement.textContent = hours;
    if (minutesElement) minutesElement.textContent = minutes;
    
    if (distance < 0) {
        if (daysElement) daysElement.textContent = '0';
        if (hoursElement) hoursElement.textContent = '0';
        if (minutesElement) minutesElement.textContent = '0';
    }
};

// Update timer every minute
setInterval(updateTimer, 60000);
updateTimer(); // Initial call

// Particle effects for buttons
document.querySelectorAll('.cta-button.primary').forEach(button => {
    button.addEventListener('mouseenter', () => {
        const particles = button.querySelector('.button-particles');
        if (particles) {
            particles.style.opacity = '0.5';
        }
    });
    
    button.addEventListener('mouseleave', () => {
        const particles = button.querySelector('.button-particles');
        if (particles) {
            particles.style.opacity = '0';
        }
    });
});

// 3D tilt effect for cards
document.querySelectorAll('.service-card, .plan-card, .tech-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg, .fiber-network');
    
    parallaxElements.forEach(element => {
        const speed = element.classList.contains('hero-bg') ? 0.5 : 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading animation to plan buttons
document.querySelectorAll('.plan-button, .offer-button, .check-availability-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const originalText = button.innerHTML;
        button.innerHTML = '<span>Loading...</span>';
        button.disabled = true;
        button.style.opacity = '0.7';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.opacity = '1';
            alert('Thank you for your interest! A representative will contact you shortly.');
        }, 2000);
    });
});

// Add scroll-triggered animations for sections
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Apply animation to section headers
document.querySelectorAll('.section-header').forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    header.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    animateOnScroll.observe(header);
});

// Dynamic background color change based on scroll position
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.body.setAttribute('data-section', index);
        }
    });
});

// Add ripple effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations to hero content
    setTimeout(() => {
        document.querySelector('.hero-title').style.animation = 'fadeInScale 1s ease-out forwards';
        setTimeout(() => {
            document.querySelector('.hero-subtitle').style.animation = 'fadeInScale 1s ease-out forwards';
            setTimeout(() => {
                document.querySelector('.hero-buttons').style.animation = 'fadeInScale 1s ease-out forwards';
            }, 300);
        }, 300);
    }, 500);
});