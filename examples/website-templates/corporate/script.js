/**
 * Corporate Professional Landing Page
 * Interactive JavaScript Components
 */

(function () {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const ctaForm = document.getElementById('ctaForm');

    // ============================================
    // Navbar Scroll Effect
    // ============================================

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Initial check
    handleNavbarScroll();

    // Listen to scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(handleNavbarScroll);
    });

    // ============================================
    // Mobile Navigation Toggle
    // ============================================

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');

                // Reset hamburger menu
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // ============================================
    // Smooth Scrolling
    // ============================================

    function smoothScroll(target, duration) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const navbarHeight = navbar.offsetHeight;
        const distance = targetPosition - startPosition - navbarHeight;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;

            e.preventDefault();
            smoothScroll(href, 800);
        });
    });

    // ============================================
    // Form Validation & Submission
    // ============================================

    if (ctaForm) {
        ctaForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                emailInput.focus();
                return;
            }

            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Processing...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(function () {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                emailInput.value = '';

                showNotification('Thank you! Check your email to complete your free trial signup.', 'success');
            }, 1500);
        });
    }

    // ============================================
    // Notification System
    // ============================================

    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        notification.textContent = message;

        // Add styles
        const styles = {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            zIndex: '9999',
            maxWidth: '400px',
            animation: 'slideInRight 0.3s ease-out',
            fontWeight: '500',
            fontSize: '0.875rem',
        };

        if (type === 'success') {
            styles.background = '#10b981';
            styles.color = 'white';
        } else if (type === 'error') {
            styles.background = '#ef4444';
            styles.color = 'white';
        }

        Object.assign(notification.style, styles);

        // Add animation keyframes if not already added
        if (!document.querySelector('#notification-animations')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notification-animations';
            styleSheet.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(function () {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(function () {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // ============================================
    // Intersection Observer for Animations
    // ============================================

    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px',
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        const animatedElements = document.querySelectorAll(
            '.feature-card, .pricing-card, .testimonial-card'
        );

        animatedElements.forEach(function (element) {
            element.style.opacity = '0';
            observer.observe(element);
        });
    }

    // ============================================
    // Pricing Card Hover Effect (3D Tilt)
    // ============================================

    function initPricingCardEffects() {
        const pricingCards = document.querySelectorAll('.pricing-card');

        pricingCards.forEach(function (card) {
            card.addEventListener('mouseenter', function () {
                this.style.transition = 'transform 0.25s ease-out';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });

            card.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                this.style.transform =
                    'translateY(-8px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
            });
        });
    }

    // ============================================
    // Dashboard Preview Animation
    // ============================================

    function animateDashboard() {
        const chartBars = document.querySelectorAll('.chart-bar');

        if (chartBars.length === 0) return;

        // Animate bars on page load
        setTimeout(function () {
            chartBars.forEach(function (bar, index) {
                setTimeout(function () {
                    bar.style.transition = 'height 0.6s ease-out';
                    bar.style.height = bar.style.height || '50%';
                }, index * 100);
            });
        }, 500);

        // Continuous subtle animation
        setInterval(function () {
            chartBars.forEach(function (bar, index) {
                setTimeout(function () {
                    const currentHeight = parseInt(bar.style.height) || 50;
                    const variation = Math.random() * 20 - 10; // -10 to +10
                    const newHeight = Math.max(30, Math.min(100, currentHeight + variation));
                    bar.style.height = newHeight + '%';
                }, index * 150);
            });
        }, 3000);
    }

    // ============================================
    // Stat Counter Animation
    // ============================================

    function animateStatNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');

        const observerOptions = {
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const text = element.textContent;
                    const hasPlus = text.includes('+');
                    const hasPercent = text.includes('%');
                    const hasDollar = text.includes('$');

                    // Extract number
                    let number = parseFloat(text.replace(/[^0-9.]/g, ''));
                    if (isNaN(number)) return;

                    let current = 0;
                    const increment = number / 50;
                    const duration = 1500;
                    const stepTime = duration / 50;

                    const timer = setInterval(function () {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }

                        let displayValue = '';
                        if (hasDollar) displayValue += '$';
                        if (number >= 1000000) {
                            displayValue += (current / 1000000).toFixed(1) + 'M';
                        } else if (number >= 1000) {
                            displayValue += (current / 1000).toFixed(0) + 'K';
                        } else if (hasPercent) {
                            displayValue += current.toFixed(1);
                        } else {
                            displayValue += Math.floor(current);
                        }
                        if (hasPlus) displayValue += '+';
                        if (hasPercent) displayValue += '%';

                        element.textContent = displayValue;
                    }, stepTime);

                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        statNumbers.forEach(function (element) {
            observer.observe(element);
        });
    }

    // ============================================
    // Active Navigation Link Highlight
    // ============================================

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = navbar.offsetHeight;

        window.addEventListener('scroll', function () {
            let current = '';

            sections.forEach(function (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.pageYOffset >= sectionTop - navbarHeight - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(function (link) {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ============================================
    // Performance: Lazy Load Images
    // ============================================

    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');

            const imageObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(function (img) {
                imageObserver.observe(img);
            });
        }
    }

    // ============================================
    // Accessibility: Keyboard Navigation
    // ============================================

    function initKeyboardNavigation() {
        // Escape key closes mobile menu
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');

                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Tab trap in mobile menu
        const focusableElements = navMenu.querySelectorAll(
            'a, button, input, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            navMenu.addEventListener('keydown', function (e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            });
        }
    }

    // ============================================
    // Initialize All Features
    // ============================================

    function init() {
        // Only initialize animations if user prefers motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            initScrollAnimations();
            initPricingCardEffects();
            animateDashboard();
            animateStatNumbers();
        }

        updateActiveNavLink();
        initLazyLoading();
        initKeyboardNavigation();

        // Log initialization for debugging
        console.log('Corporate Landing Page initialized successfully');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================
    // Performance Monitoring (Optional)
    // ============================================

    window.addEventListener('load', function () {
        // Use Performance API if available
        if ('performance' in window) {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

            if (pageLoadTime > 0) {
                console.log('Page Load Time: ' + pageLoadTime + 'ms');
            }
        }
    });
})();
