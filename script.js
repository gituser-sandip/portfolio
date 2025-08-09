// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const mobileMenuButton = document.querySelector('header .md\\:hidden button');
const navMenu = document.querySelector('header nav');

if (mobileMenuButton && navMenu) {
    mobileMenuButton.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
        navMenu.classList.toggle('flex');
        navMenu.classList.toggle('flex-col');
        navMenu.classList.toggle('absolute');
        navMenu.classList.toggle('top-full');
        navMenu.classList.toggle('left-0');
        navMenu.classList.toggle('w-full');
        navMenu.classList.toggle('bg-[#1a1a1a]'); /* Use direct Tailwind class for mobile menu bg */
        navMenu.classList.toggle('p-4');
        navMenu.classList.toggle('space-y-4');
        navMenu.classList.toggle('items-center');
        navMenu.classList.toggle('rounded-b-xl');
    });
}

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement; // Get the <html> element

// Function to set theme
function setTheme(theme) {
    if (theme === 'light') {
        htmlElement.classList.add('light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.classList.remove('light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

// Check for saved theme preference on load
const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark if no preference
setTheme(savedTheme);

// Event listener for theme toggle button
themeToggleBtn.addEventListener('click', () => {
    if (htmlElement.classList.contains('light')) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

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
