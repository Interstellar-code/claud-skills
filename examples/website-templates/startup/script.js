/**
 * Startup Modern Landing Page JavaScript
 * Vanilla JavaScript - No dependencies
 */

(function() {
    'use strict';

    // ========================================
    // Mobile Menu Toggle
    // ========================================

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');

            // Animate hamburger to X
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Close menu when clicking a nav link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');

                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }

    // ========================================
    // Smooth Scrolling for Anchor Links
    // ========================================

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Don't prevent default for # only links
            if (href === '#') return;

            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Navbar Scroll Effect
    // ========================================

    const navbar = document.querySelector('.navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    if (navbar) {
        window.addEventListener('scroll', handleNavbarScroll);
        // Check on load in case page is refreshed while scrolled
        handleNavbarScroll();
    }

    // ========================================
    // Intersection Observer for Scroll Animations
    // ========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Optionally stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all feature cards, pricing cards, and testimonials
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation class via CSS
    const style = document.createElement('style');
    style.textContent = `
        .feature-card,
        .pricing-card,
        .testimonial-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .feature-card.animate-in,
        .pricing-card.animate-in,
        .testimonial-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .feature-card {
            transition-delay: 0s;
        }

        .feature-card:nth-child(2) {
            transition-delay: 0.1s;
        }

        .feature-card:nth-child(3) {
            transition-delay: 0.2s;
        }

        .feature-card:nth-child(4) {
            transition-delay: 0.3s;
        }

        .pricing-card:nth-child(1) {
            transition-delay: 0s;
        }

        .pricing-card:nth-child(2) {
            transition-delay: 0.1s;
        }

        .pricing-card:nth-child(3) {
            transition-delay: 0.2s;
        }

        .testimonial-card:nth-child(1) {
            transition-delay: 0s;
        }

        .testimonial-card:nth-child(2) {
            transition-delay: 0.1s;
        }

        .testimonial-card:nth-child(3) {
            transition-delay: 0.2s;
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // CTA Form Handling
    // ========================================

    const ctaForm = document.querySelector('.cta-form');

    if (ctaForm) {
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = ctaForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission
            const submitButton = ctaForm.querySelector('button');
            const originalText = submitButton.innerHTML;

            submitButton.disabled = true;
            submitButton.innerHTML = 'Processing...';

            // Simulate API call
            setTimeout(() => {
                showNotification('Success! Check your email to get started.', 'success');
                emailInput.value = '';
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }, 1500);
        });
    }

    // ========================================
    // Notification System
    // ========================================

    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '90px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.75rem',
            fontWeight: '500',
            fontSize: '0.875rem',
            zIndex: '9999',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            animation: 'slideInRight 0.3s ease',
            maxWidth: '400px'
        });

        // Set colors based on type
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            notification.style.color = '#ffffff';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            notification.style.color = '#ffffff';
        } else {
            notification.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
            notification.style.color = '#ffffff';
        }

        // Add animation keyframes
        if (!document.querySelector('#notification-animations')) {
            const animationStyle = document.createElement('style');
            animationStyle.id = 'notification-animations';
            animationStyle.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
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
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(animationStyle);
        }

        // Append to body
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // ========================================
    // Dynamic Chart Animation
    // ========================================

    function animateCharts() {
        const chartBars = document.querySelectorAll('.chart-bar');

        chartBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.animation = 'grow 1s ease-out';
            }, index * 100);
        });
    }

    // Trigger chart animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCharts();
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        heroObserver.observe(heroSection);
    }

    // ========================================
    // Stats Counter Animation
    // ========================================

    function animateCounter(element, target, suffix = '') {
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Format number
            let displayValue;
            if (suffix === 'K+') {
                displayValue = Math.floor(current) + 'K+';
            } else if (suffix === 'M+') {
                displayValue = '$' + (current / 1).toFixed(1) + 'M+';
            } else if (suffix === '/5') {
                displayValue = (current / 10).toFixed(1) + '/5';
            } else {
                displayValue = Math.floor(current);
            }

            element.textContent = displayValue;
        }, 16);
    }

    // Observe stats and trigger counter animation
    const stats = document.querySelectorAll('.stat');
    if (stats.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    const text = statNumber.textContent;

                    if (text.includes('K+')) {
                        animateCounter(statNumber, 50, 'K+');
                    } else if (text.includes('M+')) {
                        animateCounter(statNumber, 20, 'M+');
                    } else if (text.includes('/5')) {
                        animateCounter(statNumber, 49, '/5');
                    }

                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => statsObserver.observe(stat));
    }

    // ========================================
    // Parallax Effect for Gradient Orbs
    // ========================================

    function handleParallax() {
        const scrolled = window.pageYOffset;
        const orbs = document.querySelectorAll('.gradient-orb');

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = -(scrolled * speed);
            orb.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }

    // Only apply parallax on desktop for performance
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(handleParallax);
        });
    }

    // ========================================
    // Performance: Lazy Load Images (if any are added)
    // ========================================

    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

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

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ========================================
    // Accessibility: Focus Management
    // ========================================

    // Add visible focus indicator for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // Add focus styles
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        body.keyboard-nav *:focus {
            outline: 3px solid #a855f7;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(focusStyle);

    // ========================================
    // Performance: Debounce Scroll Events
    // ========================================

    function debounce(func, wait = 10) {
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

    // Apply debounce to scroll handlers
    window.addEventListener('scroll', debounce(handleNavbarScroll, 10));

    // ========================================
    // Console Message (Easter Egg)
    // ========================================

    console.log(
        '%cBuilt with Claude Code 🚀',
        'color: #a855f7; font-size: 16px; font-weight: bold; padding: 10px;'
    );
    console.log(
        '%cStartup Modern Theme - Vibrant & Energetic',
        'color: #ec4899; font-size: 14px; padding: 5px;'
    );

    // ========================================
    // Initialize
    // ========================================

    console.log('Startup Modern Landing Page - JavaScript Initialized ✓');

})();
