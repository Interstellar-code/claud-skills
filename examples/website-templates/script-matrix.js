/**
 * SubsHero Matrix Style - JavaScript
 * Interactive functionality and special effects
 */

// ============================================
// Matrix Falling Code Background Effect
// ============================================

class MatrixBackground {
    constructor() {
        this.canvas = document.getElementById('matrix-bg');
        this.ctx = this.canvas.getContext('2d');
        this.columns = [];
        this.fontSize = 14;
        this.chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$@#%&*';

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const columnCount = Math.floor(this.canvas.width / this.fontSize);
        this.columns = Array(columnCount).fill(1);
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = `${this.fontSize}px monospace`;

        this.columns.forEach((y, index) => {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = index * this.fontSize;

            this.ctx.fillText(char, x, y * this.fontSize);

            if (y * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.columns[index] = 0;
            }
            this.columns[index]++;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// Navigation Menu Toggle
// ============================================

class Navigation {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.navToggle = document.querySelector('.nav__toggle');
        this.navMenu = document.querySelector('.nav__menu');
        this.navLinks = document.querySelectorAll('.nav__link');

        this.init();
    }

    init() {
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Nav background on scroll
        window.addEventListener('scroll', () => this.handleScroll());
    }

    toggleMenu() {
        const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';
        this.navToggle.setAttribute('aria-expanded', !isExpanded);
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navMenu.classList.remove('active');
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.nav.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
        } else {
            this.nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        }
    }
}

// ============================================
// Terminal Typing Effect
// ============================================

class TerminalTyping {
    constructor() {
        this.element = document.querySelector('.typed-text');
        this.texts = [
            'subshero init',
            'subshero analyze',
            'subshero track --all',
            'subshero optimize'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typingSpeed = 100;
        this.deletingSpeed = 50;
        this.pauseDelay = 2000;

        if (this.element) {
            this.type();
        }
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];

        if (this.isDeleting) {
            this.currentCharIndex--;
            this.element.textContent = currentText.substring(0, this.currentCharIndex);

            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
                setTimeout(() => this.type(), 500);
                return;
            }

            setTimeout(() => this.type(), this.deletingSpeed);
        } else {
            this.currentCharIndex++;
            this.element.textContent = currentText.substring(0, this.currentCharIndex);

            if (this.currentCharIndex === currentText.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.pauseDelay);
                return;
            }

            setTimeout(() => this.type(), this.typingSpeed);
        }
    }
}

// ============================================
// Form Validation and Submission
// ============================================

class FormHandler {
    constructor() {
        this.form = document.getElementById('signup-form');
        this.emailInput = document.getElementById('email');
        this.errorElement = document.getElementById('email-error');
        this.successElement = document.getElementById('email-success');

        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('input', () => this.clearMessages());
    }

    handleSubmit(e) {
        e.preventDefault();

        const email = this.emailInput.value.trim();

        // Validate email
        if (!this.validateEmail(email)) {
            this.showError('> ERROR: Invalid email format. Please try again.');
            return;
        }

        // Simulate API call
        this.showSuccess('> SUCCESS: Welcome to SubsHero! Check your inbox for confirmation.');
        this.form.reset();

        // Track conversion (placeholder for analytics)
        this.trackConversion(email);
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    showError(message) {
        this.errorElement.textContent = message;
        this.errorElement.style.display = 'block';
        this.successElement.style.display = 'none';
        this.emailInput.setAttribute('aria-invalid', 'true');
        this.emailInput.focus();
    }

    showSuccess(message) {
        this.successElement.textContent = message;
        this.successElement.style.display = 'block';
        this.errorElement.style.display = 'none';
        this.emailInput.setAttribute('aria-invalid', 'false');
    }

    clearMessages() {
        this.errorElement.style.display = 'none';
        this.successElement.style.display = 'none';
        this.emailInput.removeAttribute('aria-invalid');
    }

    trackConversion(email) {
        // Placeholder for analytics tracking
        console.log('Conversion tracked:', email);

        // Example: Google Analytics
        // if (window.gtag) {
        //     gtag('event', 'signup', {
        //         'event_category': 'engagement',
        //         'event_label': 'email_signup'
        //     });
        // }
    }
}

// ============================================
// Counter Animation for Stats
// ============================================

class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-card__value[data-count]');
        this.animated = false;

        if (this.counters.length > 0) {
            this.init();
        }
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.animateCounters();
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            updateCounter();
        });
    }
}

// ============================================
// Scroll Reveal Animations
// ============================================

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');

        if (this.elements.length > 0) {
            this.init();
        }
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';

                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease-out';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        this.elements.forEach(element => observer.observe(element));
    }
}

// ============================================
// Glitch Effect Trigger on Hover
// ============================================

class GlitchEffect {
    constructor() {
        this.glitchElements = document.querySelectorAll('.glitch');

        if (this.glitchElements.length > 0) {
            this.init();
        }
    }

    init() {
        this.glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = 'glitch 0.3s infinite';
                }, 10);
            });

            element.addEventListener('mouseleave', () => {
                element.style.animation = 'glitch 2s infinite';
            });
        });
    }
}

// ============================================
// Performance Optimization
// ============================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Preload critical resources
        this.preloadResources();

        // Lazy load images if any
        this.lazyLoadImages();

        // Add passive event listeners
        this.addPassiveListeners();
    }

    preloadResources() {
        // Preload fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.as = 'font';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap';
        fontLink.crossOrigin = 'anonymous';
        // Note: Commented out to avoid external dependency
        // document.head.appendChild(fontLink);
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    addPassiveListeners() {
        // Add passive listeners for better scroll performance
        let supportsPassive = false;
        try {
            const opts = Object.defineProperty({}, 'passive', {
                get: function() {
                    supportsPassive = true;
                    return true;
                }
            });
            window.addEventListener('testPassive', null, opts);
            window.removeEventListener('testPassive', null, opts);
        } catch (e) {}

        if (supportsPassive) {
            const passiveEvent = { passive: true };
            window.addEventListener('scroll', () => {}, passiveEvent);
            window.addEventListener('touchstart', () => {}, passiveEvent);
        }
    }
}

// ============================================
// Accessibility Enhancements
// ============================================

class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        // Skip to main content link
        this.addSkipLink();

        // Keyboard navigation for custom elements
        this.enhanceKeyboardNav();

        // Focus management
        this.manageFocus();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#hero';
        skipLink.className = 'skip-link sr-only';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--color-primary);
            color: var(--color-bg-primary);
            padding: 8px;
            text-decoration: none;
            z-index: 100;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    enhanceKeyboardNav() {
        // Add keyboard support for cards
        const interactiveCards = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');

        interactiveCards.forEach(card => {
            card.setAttribute('tabindex', '0');

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const link = card.querySelector('a');
                    if (link) {
                        e.preventDefault();
                        link.click();
                    }
                }
            });
        });
    }

    manageFocus() {
        // Trap focus in mobile menu when open
        const navToggle = document.querySelector('.nav__toggle');
        const navMenu = document.querySelector('.nav__menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    const firstLink = navMenu.querySelector('a');
                    if (firstLink) {
                        setTimeout(() => firstLink.focus(), 100);
                    }
                }
            });
        }
    }
}

// ============================================
// Initialize All Features
// ============================================

class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    start() {
        console.log('> SubsHero Matrix Style initialized');

        // Initialize all features
        new MatrixBackground();
        new Navigation();
        new TerminalTyping();
        new FormHandler();
        new CounterAnimation();
        new ScrollReveal();
        new GlitchEffect();
        new PerformanceOptimizer();
        new AccessibilityEnhancer();

        // Log performance metrics
        this.logPerformance();
    }

    logPerformance() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    const connectTime = perfData.responseEnd - perfData.requestStart;
                    const renderTime = perfData.domComplete - perfData.domLoading;

                    console.log('> Performance Metrics:');
                    console.log(`  - Page Load Time: ${pageLoadTime}ms`);
                    console.log(`  - Connection Time: ${connectTime}ms`);
                    console.log(`  - Render Time: ${renderTime}ms`);
                }, 0);
            });
        }
    }
}

// Start the application
new App();

// ============================================
// Service Worker Registration (Optional)
// ============================================

// Uncomment to enable PWA features
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('> Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('> Service Worker registration failed:', error);
            });
    });
}
*/

// ============================================
// Export for Module Systems (if needed)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MatrixBackground,
        Navigation,
        TerminalTyping,
        FormHandler,
        CounterAnimation,
        ScrollReveal,
        GlitchEffect,
        PerformanceOptimizer,
        AccessibilityEnhancer,
        App
    };
}
