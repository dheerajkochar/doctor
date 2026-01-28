/* ============================================
   DENTAL CLINIC WEBSITE - JAVASCRIPT
   ============================================ */

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initTabSystem();
    initFAQAccordion();
    initContactForm();
    initScrollAnimations();
    initSmoothScroll();
});

/* ============================================
   MOBILE MENU FUNCTIONALITY
   ============================================ */

function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return;

    // Toggle menu on hamburger click
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* ============================================
   TREATMENT TABS FUNCTIONALITY
   ============================================ */

function initTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            this.classList.add('active');
            const activeTab = document.getElementById(`${tabName}-tab`);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });

    // Set first tab as active by default
    if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
    }
    if (tabContents.length > 0) {
        tabContents[0].classList.add('active');
    }
}

/* ============================================
   FAQ ACCORDION FUNCTIONALITY
   ============================================ */

function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (!question) return;

        question.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/* ============================================
   CONTACT FORM FUNCTIONALITY
   ============================================ */

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            phone: contactForm.querySelector('input[type="tel"]').value,
            service: contactForm.querySelector('select').value,
            message: contactForm.querySelector('textarea').value
        };

        // Validate form
        if (!validateForm(formData)) {
            showNotification('Please fill in all fields correctly', 'error');
            return;
        }

        // Log form data (in a real app, send to server)
        console.log('[v0] Form submitted with data:', formData);

        // Show success message
        showNotification('Thank you! We will contact you soon.', 'success');

        // Reset form
        contactForm.reset();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function validateForm(formData) {
    // Check if all fields are filled
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return false;
    }

    // Validate phone format (basic check for Indian numbers)
    const phoneRegex = /^[0-9\-\+\s\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
        return false;
    }

    return true;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '5px',
        backgroundColor: type === 'success' ? '#1e5a96' : '#d32f2f',
        color: '#fff',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease-out',
        fontWeight: '500',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

function initScrollAnimations() {
    // Use Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in and fade-in-up elements
    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/* ============================================
   SMOOTH SCROLL TO ANCHORS
   ============================================ */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   NAVBAR STICKY EFFECT WITH SHADOW
   ============================================ */

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(30, 90, 150, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(30, 90, 150, 0.15)';
    }
});

/* ============================================
   ACTIVE NAV LINK ON SCROLL
   ============================================ */

window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${current}`) {
            link.style.opacity = '0.8';
            link.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.3)';
        } else {
            link.style.textShadow = 'none';
        }
    });
});

/* ============================================
   IMAGE LAZY LOADING
   ============================================ */

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('image-loading');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
initLazyLoading();

/* ============================================
   GALLERY FILTER FUNCTIONALITY
   ============================================ */

function initGalleryFilter() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length === 0) return;

    // Create filter buttons dynamically
    const categories = new Set();
    galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (category) categories.add(category);
    });

    // Filter items on click
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            galleryItems.forEach(gallery => {
                if (gallery.getAttribute('data-category') === category || category === 'all') {
                    gallery.style.display = 'block';
                    setTimeout(() => {
                        gallery.style.opacity = '1';
                    }, 10);
                } else {
                    gallery.style.opacity = '0';
                    setTimeout(() => {
                        gallery.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

initGalleryFilter();

/* ============================================
   COUNTER ANIMATION FOR STATS
   ============================================ */

function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element comes into view
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
}

animateCounters();

/* ============================================
   SCROLL TO TOP BUTTON
   ============================================ */

function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #1e5a96;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 999;
        font-size: 20px;
        font-weight: bold;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(30, 90, 150, 0.3);
    `;

    document.body.appendChild(scrollButton);

    // Show button when scrolling down
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effects
    scrollButton.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#4a90a4';
    });

    scrollButton.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#1e5a96';
    });
}

initScrollToTop();

/* ============================================
   KEYBOARD NAVIGATION
   ============================================ */

document.addEventListener('keydown', function(e) {
    // Skip if user is typing in an input
    if (document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA' || 
        document.activeElement.tagName === 'SELECT') {
        return;
    }

    // Handle navigation with arrow keys
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        window.scrollBy(0, 100);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollBy(0, -100);
    }
});

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Debounce function for scroll and resize events
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

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add animation frame for smooth updates
let ticking = false;

window.addEventListener('scroll', throttle(function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Update animations here
            ticking = false;
        });
        ticking = true;
    }
}, 100));

/* ============================================
   ACCESSIBILITY ENHANCEMENTS
   ============================================ */

// Add focus visible style for keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Add aria-label to buttons without text
document.querySelectorAll('button').forEach(button => {
    if (!button.textContent.trim() && !button.getAttribute('aria-label')) {
        button.setAttribute('aria-label', 'Button');
    }
});

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Get element viewport position
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add active class to element
function setActive(element) {
    document.querySelectorAll('.active').forEach(el => {
        if (el !== element) el.classList.remove('active');
    });
    element.classList.add('active');
}

console.log('[v0] Dental Clinic Website Initialized Successfully!');
