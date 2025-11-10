// ===================================
// PORTFOLIO JAVASCRIPT
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize theme
    initTheme();
    
    // Start typewriter after a short delay
    setTimeout(typeWriter, 1000);
});

// ===================================
// TYPEWRITER EFFECT
// ===================================

const typewriterElement = document.getElementById('typewriter');
const titles = ['Creative Designer', 'UI/UX Designer', 'Web Developer', 'Problem Solver'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseTime = 2000;

function typeWriter() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        // Deleting text
        typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = deletingSpeed;
    } else {
        // Typing text
        typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        // Finished typing, pause then start deleting
        isDeleting = true;
        typingSpeed = pauseTime;
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next title
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
    }

    setTimeout(typeWriter, typingSpeed);
}

// Start the typewriter effect
setTimeout(typeWriter, 1000);

// ===================================
// MOBILE MENU TOGGLE
// ===================================

const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});

// ===================================
// SMOOTH SCROLL FUNCTION
// ===================================

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        mobileMenu.classList.remove('active');
    }
}

// ===================================
// CONTACT FORM HANDLING
// ===================================

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    // For this demo, we'll just show a success message
    
    // Show success message
    formStatus.textContent = 'Message sent successfully! 🎉';
    
    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    
    // Hide message after 3 seconds
    setTimeout(() => {
        formStatus.textContent = '';
    }, 3000);
});

// ===================================
// SKILL BARS ANIMATION
// ===================================

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        
        // Use setTimeout to create staggered animation
        setTimeout(() => {
            bar.style.width = `${width}%`;
        }, 100);
    });
}

// Intersection Observer for skill bars animation
const skillsSection = document.getElementById('skills');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (skillsSection) {
    observer.observe(skillsSection);
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(26, 21, 53, 0.95)';
    } else {
        nav.style.backgroundColor = 'rgba(26, 21, 53, 0.9)';
    }
});

// ===================================
// THEME TOGGLE FUNCTIONALITY
// ===================================

const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const themeIcon = document.getElementById('themeIcon');
const mobileThemeIcon = document.getElementById('mobileThemeIcon');
const body = document.body;

function toggleTheme() {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    
    // Update icons
    const newIcon = isDark ? 'sun' : 'moon';
    themeIcon.setAttribute('data-lucide', newIcon);
    mobileThemeIcon.setAttribute('data-lucide', newIcon);
    
    // Re-initialize icons
    lucide.createIcons();
    
    // Save preference to localStorage
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// Check for saved theme preference or respect OS preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        body.setAttribute('data-theme', 'light');
        themeIcon.setAttribute('data-lucide', 'sun');
        mobileThemeIcon.setAttribute('data-lucide', 'sun');
        lucide.createIcons();
    }
}

// Initialize theme on page load
initTheme();