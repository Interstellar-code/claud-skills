/**
 * Minimalist Clean Template - JavaScript
 * Ultra-minimal interactions, performance-focused
 */

(function() {
    'use strict';

    // Mobile Navigation Toggle
    const initMobileNav = () => {
        const toggle = document.querySelector('.nav__toggle');
        const links = document.querySelector('.nav__links');
        const navLinks = document.querySelectorAll('.nav__link');

        if (!toggle || !links) return;

        // Toggle menu
        toggle.addEventListener('click', () => {
            const isActive = toggle.classList.toggle('active');
            links.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isActive);
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                links.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && toggle.classList.contains('active')) {
                toggle.classList.remove('active');
                links.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !links.contains(e.target) && toggle.classList.contains('active')) {
                toggle.classList.remove('active');
                links.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    };

    // Smooth Scroll for Navigation Links
    const initSmoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Skip empty anchors
                if (href === '#' || href === '#cta') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    };

    // Animate elements on scroll (minimal, performance-focused)
    const initScrollAnimations = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Add animation to features, pricing cards, and testimonials
        const animatedElements = document.querySelectorAll('.feature, .pricing__card, .testimonial');

        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(element);
        });
    };

    // Handle pricing card interactions
    const initPricingInteractions = () => {
        const pricingCards = document.querySelectorAll('.pricing__card');

        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                pricingCards.forEach(c => {
                    if (c !== card) {
                        c.style.opacity = '0.6';
                    }
                });
            });

            card.addEventListener('mouseleave', () => {
                pricingCards.forEach(c => {
                    c.style.opacity = '1';
                });
            });
        });
    };

    // Performance optimization: Throttle scroll events
    const throttle = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Add subtle scroll indicator to nav
    const initScrollIndicator = () => {
        const nav = document.querySelector('.nav');
        if (!nav) return;

        const handleScroll = throttle(() => {
            if (window.scrollY > 100) {
                nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            } else {
                nav.style.boxShadow = 'none';
            }
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });
    };

    // Form validation (if forms are added later)
    const initFormValidation = () => {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const inputs = form.querySelectorAll('input[required], textarea[required]');
                let isValid = true;

                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = 'var(--color-red)';
                    } else {
                        input.style.borderColor = 'var(--color-black)';
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                }
            });
        });
    };

    // Keyboard navigation improvements
    const initKeyboardNavigation = () => {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--color-red)';
                element.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    };

    // Initialize all features when DOM is ready
    const init = () => {
        // Core features
        initMobileNav();
        initSmoothScroll();

        // Enhanced features (with feature detection)
        if ('IntersectionObserver' in window) {
            initScrollAnimations();
        }

        initPricingInteractions();
        initScrollIndicator();
        initFormValidation();
        initKeyboardNavigation();

        // Log initialization (development only)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Minimalist Clean Template initialized');
        }
    };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle viewport resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate any viewport-dependent features
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 250);
    }, { passive: true });

    // Set initial viewport height variable
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

})();
