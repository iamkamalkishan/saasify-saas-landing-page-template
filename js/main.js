/* ========================================
   SaaSify - JavaScript
   Animations & Interactivity
======================================== */

// ========== Preloader ==========
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});

// ========== Navbar Scroll Effect ==========
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== Mobile Menu Toggle ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// ========== Smooth Scrolling ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== Pricing Toggle ==========
const pricingToggle = document.getElementById('pricingToggle');
const amounts = document.querySelectorAll('.pricing-price .amount');
const toggleLabels = document.querySelectorAll('.toggle-label');

if (pricingToggle) {
    pricingToggle.addEventListener('change', function() {
        const isYearly = this.checked;
        
        toggleLabels.forEach(label => {
            if (label.dataset.period === (isYearly ? 'yearly' : 'monthly')) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
        
        amounts.forEach(amount => {
            const monthly = amount.dataset.monthly;
            const yearly = amount.dataset.yearly;
            
            // Animate the number change
            animateValue(amount, 
                parseInt(isYearly ? monthly : yearly), 
                parseInt(isYearly ? yearly : monthly), 
                300
            );
        });
    });
}

// Animate number change
function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + range * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ========== FAQ Accordion ==========
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const answer = this.nextElementSibling;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = null;
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// ========== Scroll Animations ==========
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .step-card, .pricing-card, .testimonial-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ========== Chart Animation ==========
function animateChart() {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.height = bar.style.height;
        }, index * 100);
    });
}

// Trigger chart animation when visible
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateChart();
        }
    });
}, { threshold: 0.5 });

const chartElement = document.querySelector('.preview-chart');
if (chartElement) {
    chartObserver.observe(chartElement);
}

// ========== Counter Animation ==========
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function update() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    update();
}

// Animate stat counters
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('$')) {
                    const num = parseInt(text.replace(/[$,]/g, ''));
                    animateCounter(stat, num);
                    stat.textContent = '$' + stat.textContent;
                } else if (!isNaN(parseInt(text.replace(/,/g, '')))) {
                    const num = parseInt(text.replace(/,/g, ''));
                    animateCounter(stat, num);
                }
            });
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.preview-stats');
if (statsSection) {
    statObserver.observe(statsSection);
}

// ========== Parallax Effect ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const blobs = document.querySelectorAll('.gradient-blob');
    
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.1;
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========== Tilt Effect on Cards ==========
document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========== Form Validation ==========
const ctaInput = document.querySelector('.cta-input');
const ctaButton = document.querySelector('.cta-form .btn');

if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (ctaInput && ctaInput.value) {
            const email = ctaInput.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailRegex.test(email)) {
                // Success animation
                ctaButton.textContent = '✓ Thank You!';
                ctaButton.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                ctaInput.value = '';
                
                setTimeout(() => {
                    ctaButton.textContent = 'Start Free Trial';
                    ctaButton.style.background = '';
                }, 3000);
            } else {
                // Error animation
                ctaInput.style.borderColor = '#ef4444';
                ctaInput.placeholder = 'Please enter a valid email';
                
                setTimeout(() => {
                    ctaInput.style.borderColor = '';
                    ctaInput.placeholder = 'Enter your email';
                }, 3000);
            }
        }
    });
}

// ========== Typing Effect for Hero Title ==========
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ========== Live Chat Widget (Optional) ==========
function createChatWidget() {
    const widget = document.createElement('div');
    widget.innerHTML = `
        <div id="chat-widget" style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
            z-index: 999;
            transition: transform 0.3s ease;
        ">
            <span style="font-size: 24px; color: white;">💬</span>
        </div>
    `;
    document.body.appendChild(widget);
    
    const chatBtn = document.getElementById('chat-widget');
    chatBtn.addEventListener('click', () => {
        alert('Chat widget would open here!');
    });
    
    chatBtn.addEventListener('mouseenter', () => {
        chatBtn.style.transform = 'scale(1.1)';
    });
    
    chatBtn.addEventListener('mouseleave', () => {
        chatBtn.style.transform = 'scale(1)';
    });
}

// Initialize chat widget
createChatWidget();

// ========== Scroll Progress Indicator ==========
function createScrollProgress() {
    const progress = document.createElement('div');
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progress.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// ========== Back to Top Button ==========
function createBackToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        width: 40px;
        height: 40px;
        background: var(--white);
        border: 1px solid var(--gray-200);
        border-radius: 10px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 18px;
        color: var(--gray-600);
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    `;
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.background = 'var(--primary)';
        button.style.color = 'var(--white)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = 'var(--white)';
        button.style.color = 'var(--gray-600)';
    });
}

// Initialize back to top
createBackToTop();

// ========== Console Easter Egg ==========
console.log('%c🚀 SaaSify Template', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cBuilt with ❤️ for SaaS founders', 'font-size: 14px; color: #64748b;');
console.log('%cInterested in the template? Contact us!', 'font-size: 12px; color: #94a3b8;');