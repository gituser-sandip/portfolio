// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));

        if (!target) {
            return;
        }

        e.preventDefault();

        target.scrollIntoView({
            behavior: 'smooth'
        });

        navMenu?.classList.remove('mobile-open');
    });
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const navMenu = document.getElementById('site-nav');

if (mobileMenuButton && navMenu) {
    mobileMenuButton.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
        mobileMenuButton.setAttribute('aria-expanded', navMenu.classList.contains('mobile-open'));
    });
}

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

// For individual cards within sections, observe them separately for staggered animation
const cardsToAnimate = document.querySelectorAll('.bg-\\[\\#2a2a2a\\].animate-on-scroll');
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
    card.style.transitionDelay = `${index * 0.1}s`;
    cardObserver.observe(card);
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
