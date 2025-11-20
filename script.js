// ==================== Particle Animation ====================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.strokeStyle = `rgba(0, 245, 255, ${0.15 * (1 - distance / 120)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// ==================== Resize Handler ====================
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ==================== Mobile Navigation ====================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Navbar Scroll Effect ====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInObserver.observe(el);
    });
});

// ==================== Project Card 3D Tilt Effect ====================
const projectCards = document.querySelectorAll('.project-card[data-tilt]');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== Cursor Trail Effect ====================
const cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, timestamp: Date.now() });

    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
});

function drawCursorTrail() {
    const now = Date.now();
    cursorTrail.forEach((point, index) => {
        const age = now - point.timestamp;
        if (age > 500) return;

        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.left = point.x + 'px';
        dot.style.top = point.y + 'px';
        dot.style.width = '4px';
        dot.style.height = '4px';
        dot.style.borderRadius = '50%';
        dot.style.background = `rgba(0, 245, 255, ${0.5 - (index / maxTrailLength) * 0.5})`;
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9999';
        dot.style.transition = 'opacity 0.5s';

        document.body.appendChild(dot);

        setTimeout(() => {
            dot.style.opacity = '0';
            setTimeout(() => dot.remove(), 500);
        }, 50);
    });
}

// Optional: Uncomment to enable cursor trail
// setInterval(drawCursorTrail, 50);

// ==================== Terminal Typing Effect ====================
const terminalOutput = document.querySelector('.terminal-output');
if (terminalOutput) {
    const originalText = terminalOutput.textContent;
    terminalOutput.textContent = '';

    let charIndex = 0;
    function typeText() {
        if (charIndex < originalText.length) {
            terminalOutput.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50);
        }
    }

    // Start typing after a delay
    setTimeout(typeText, 500);
}

// ==================== Skill Tags Animation ====================
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
});

// ==================== Contact Cards Stagger Animation ====================
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});

// ==================== Code Snippet Syntax Highlighting ====================
const codeHeaders = document.querySelectorAll('.code-header');

codeHeaders.forEach(header => {
    const dots = header.querySelectorAll('.code-dots span');
    dots.forEach((dot, index) => {
        const colors = ['#ff5f56', '#ffbd2e', '#27c93f'];
        dot.style.background = colors[index];
    });
});

// ==================== Section Number Animation ====================
const sectionNumbers = document.querySelectorAll('.section-number');

const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'pulse 0.5s ease';
        }
    });
}, { threshold: 0.5 });

sectionNumbers.forEach(num => {
    numberObserver.observe(num);
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// ==================== Performance Optimization ====================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
window.addEventListener('scroll', debounce(() => {
    // Your scroll logic here
}, 10));

// ==================== Easter Egg: Konami Code ====================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);

    if (konamiCode.join('') === konamiPattern.join('')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';

        const easterEggStyle = document.createElement('style');
        easterEggStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(easterEggStyle);

        setTimeout(() => {
            document.body.style.animation = '';
            easterEggStyle.remove();
        }, 5000);
    }
});

console.log('%c🚀 Welcome to my portfolio!', 'font-size: 20px; color: #00f5ff; font-weight: bold;');
console.log('%cLooking for something? Try the Konami code ;)', 'font-size: 12px; color: #a0aec0;');
