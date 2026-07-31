// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement; // Get the <html> element

// Function to set theme
function setTheme(theme) {
    if (theme === 'light') {
        htmlElement.classList.add('light');
        themeToggleBtn?.setAttribute('aria-label', 'Switch to dark theme');
        themeToggleBtn?.setAttribute('title', 'Switch to dark theme');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.classList.remove('light');
        themeToggleBtn?.setAttribute('aria-label', 'Switch to light theme');
        themeToggleBtn?.setAttribute('title', 'Switch to light theme');
        localStorage.setItem('theme', 'dark');
    }
}

// Check for saved theme preference on load
const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark if no preference
setTheme(savedTheme);

// Event listener for theme toggle button
themeToggleBtn?.addEventListener('click', () => {
    setTheme(htmlElement.classList.contains('light') ? 'dark' : 'light');
});

// Highlight the current section in the navigation.
const navLinks = document.querySelectorAll('.nav-link');
const pageSections = [...document.querySelectorAll('section[id]')];

function setActiveNavLink(id) {
    const matchingHashLink = [...navLinks].find(link => link.getAttribute('href') === `#${id}`);

    if (!matchingHashLink) {
        return;
    }

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
}

function updateActiveNavFromScroll() {
    const currentSection = pageSections
        .filter(section => section.getBoundingClientRect().top <= 140)
        .pop() || pageSections[0];

    if (currentSection) {
        setActiveNavLink(currentSection.id);
    }
}

window.addEventListener('scroll', updateActiveNavFromScroll, { passive: true });
window.addEventListener('load', updateActiveNavFromScroll);
updateActiveNavFromScroll();

// Scroll Animation Logic using Intersection Observer
const sectionsToAnimate = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 10% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
            // Optionally, unobserve after animation to prevent re-triggering
             observer.unobserve(entry.target);
        } else {
            // Optional: remove class when out of view to allow re-animation on scroll back
             entry.target.classList.remove('is-in-view');
        }
    });
}, observerOptions);

sectionsToAnimate.forEach(section => {
    observer.observe(section);
});

// Ensure dynamically rendered elements (SPA/React) are observed after load
function observeAnimateSections() {
    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        try {
            observer.observe(section);
        } catch (e) {
            // ignore already-observed or invalid nodes
        }
    });
}

window.addEventListener('load', () => {
    observeAnimateSections();
    // Fallback: observe after a short delay in case React mounts later
    setTimeout(observeAnimateSections, 300);
});

// Progress Bar Animation Logic
const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
                // Small delay for smooth effect after section appears
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 200);
            }
            observer.unobserve(bar);
        }
    });
}, { root: null, rootMargin: '0px', threshold: 0.1 });

document.querySelectorAll('.progress-fill').forEach(bar => {
    // Ensure transition is applied in JS if not in CSS
    bar.style.transition = 'width 1.2s ease-out';
    progressObserver.observe(bar);
});

// Scroll-reactive carousel depth for web development projects.
document.querySelectorAll('.feature-carousel').forEach((carousel) => {
    const cards = [...carousel.querySelectorAll('.github-project-card')];

    function updateCarouselDepth() {
        const carouselRect = carousel.getBoundingClientRect();
        const center = carouselRect.left + carouselRect.width / 2;

        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distance = (cardCenter - center) / Math.max(carouselRect.width / 2, 1);
            const clamped = Math.max(-1, Math.min(1, distance));
            const focus = 1 - Math.min(1, Math.abs(clamped));

            card.style.setProperty('--scroll-tilt', `${clamped * -8}deg`);
            card.style.setProperty('--scroll-depth', `${(1 - focus) * 10}px`);
            card.style.setProperty('--scroll-scale', `${0.94 + focus * 0.06}`);
            card.style.setProperty('--card-layer', `${Math.round(focus * 20) + 1}`);
        });
    }

    carousel.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateCarouselDepth);
    }, { passive: true });

    carousel.addEventListener('wheel', (e) => {
        // Translate vertical wheel scroll to horizontal scroll
        if (e.deltaY !== 0) {
            e.preventDefault();
            carousel.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    window.addEventListener('resize', updateCarouselDepth);
    window.addEventListener('load', updateCarouselDepth);
    updateCarouselDepth();
});

// For individual cards within sections, observe them separately for staggered animation.
const cardsToAnimate = document.querySelectorAll([
    '.bg-\\[\\#2a2a2a\\]',
    '.page-card',
    '.sample-card',
    '.design-card',
    '.web-project-card',
    '.github-project-card',
    '.reel-preview-card',
    '.section-support-card',
    '.hero-stat',
    '.detail-strip > div',
    '.process-list > div',
    '.current-grid > div'
].join(','));
const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
            // observer.unobserve(entry.target); // Uncomment if you want it to animate only once
        }
    });
}, { root: null, rootMargin: '0px', threshold: 0.1 });

cardsToAnimate.forEach((card, index) => {
    // Add a slight delay for staggered animation
    card.classList.add('card-animated');
    card.style.animationDelay = `${(index % 6) * 0.06}s`;
    cardObserver.observe(card);

    // Dynamically add the animated passing border
    if (window.getComputedStyle(card).position === 'static') {
        card.style.position = 'relative';
    }
    if (!card.querySelector('.card-border-wrap')) {
        const borderWrap = document.createElement('div');
        borderWrap.className = 'card-border-wrap';
        card.appendChild(borderWrap);
    }
});

// Contact form fallback: open a pre-filled email draft.
const contactForm = document.getElementById('contact-form');

function openEmailFallback({ name, email, subject, message }) {
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    window.location.href = `mailto:Sandipmeche6@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function setFormStatus(message, type = '') {
    const status = document.getElementById('form-status');

    if (!status) {
        return;
    }

    status.textContent = message;
    status.className = `form-status ${type}`.trim();
}

contactForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const payload = {
        name: formData.get('name') || 'Portfolio visitor',
        email: formData.get('email') || 'No email provided',
        subject: formData.get('subject') || 'Portfolio inquiry',
        message: formData.get('message') || ''
    };
    const endpoint = contactForm.dataset.endpoint;
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const submitLabel = contactForm.querySelector('.submit-label');

    if (submitButton) {
        submitButton.disabled = true;
    }
    if (submitLabel) {
        submitLabel.textContent = 'Sending...';
    }
    setFormStatus('Sending your message...', '');

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Backend request failed');
        }

        contactForm.reset();
        setFormStatus('Message sent successfully. Thank you!', 'success');
    } catch (error) {
        setFormStatus('Backend is not running, opening an email draft instead.', 'error');
        openEmailFallback(payload);
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
        }
        if (submitLabel) {
            submitLabel.textContent = 'Send Message';
        }
    }
});

// Scroll to Top Button Functionality
const scrollToTopButton = document.getElementById('scroll-to-top');

// Show/hide the button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton?.classList.add('show');
    } else {
        scrollToTopButton?.classList.remove('show');
    }
}, { passive: true });

// Scroll to top when button is clicked
scrollToTopButton?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile menu toggle logic
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        navToggle.setAttribute('aria-expanded', !isOpen);
    });
}
