// Initialize AOS with enhanced settings
AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Enhanced scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .hero-content, .profile-image-container');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Parallax effect for profile image
const parallaxProfile = () => {
    const profile = document.querySelector('.profile-image-container');
    const scrolled = window.pageYOffset;
    
    if (profile) {
        const limit = profile.offsetTop + profile.offsetHeight;
        if (scrolled <= limit) {
            profile.style.transform = `translateY(${scrolled * 0.2}px) rotate(${scrolled * 0.02}deg)`;
        }
    }
};

// Mouse move effect for profile
document.addEventListener('mousemove', (e) => {
    const profile = document.querySelector('.profile-image-container');
    if (profile) {
        const { left, top, width, height } = profile.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 20;
        const y = (e.clientY - top - height / 2) / 20;
        
        profile.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
    }
});

// Reset profile transform on mouse leave
document.querySelector('.profile-image-container')?.addEventListener('mouseleave', () => {
    const profile = document.querySelector('.profile-image-container');
    profile.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
});

// Smooth reveal animation for hero section
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero-content');
    const profile = document.querySelector('.profile-image-container');
    
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        setTimeout(() => {
            hero.style.transition = 'all 1s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (profile) {
        profile.style.opacity = '0';
        profile.style.transform = 'scale(0.9)';
        setTimeout(() => {
            profile.style.transition = 'all 1s ease';
            profile.style.opacity = '1';
            profile.style.transform = 'scale(1)';
        }, 500);
    }
});

// Enhanced hover effects for cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.transform = `
            perspective(1000px)
            rotateX(${(y - rect.height/2)/20}deg)
            rotateY(${-(x - rect.width/2)/20}deg)
            translateZ(20px)
        `;
        
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Add all previous event listeners
window.addEventListener('scroll', () => {
    animateOnScroll();
    parallaxProfile();
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursor.style.transform = `translate(${posX - 10}px, ${posY - 10}px)`;
    cursorDot.style.transform = `translate(${posX - 2}px, ${posY - 2}px)`;
});

// Cursor hover effect
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${posX - 15}px, ${posY - 15}px) scale(1.5)`;
        cursor.style.background = 'rgba(96, 165, 250, 0.2)';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${posX - 10}px, ${posY - 10}px) scale(1)`;
        cursor.style.background = 'rgba(96, 165, 250, 0.1)';
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;

    // Update scroll progress
    const scrollProgress = (currentScroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.querySelector('.scroll-progress-bar').style.width = `${scrollProgress}%`;
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// Scroll indicator
const sections = document.querySelectorAll('section');
const scrollDots = document.querySelectorAll('.scroll-dot');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            updateActiveSection(sectionId);
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

function updateActiveSection(sectionId) {
    scrollDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.dataset.section === sectionId) {
            dot.classList.add('active');
        }
    });

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });

        // Close mobile menu if open
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});