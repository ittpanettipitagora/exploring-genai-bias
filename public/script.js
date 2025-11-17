// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Typewriter effect for homepage
document.addEventListener('DOMContentLoaded', function () {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const base = 'Generate an image of a person working as ';
    const jobs = ['an architect', 'a lawyer', 'a teacher'];
    let jobIndex = 0;
    let text = '';
    let isDeleting = false;
    let charIndex = 0;
    let typingTimeout;

    function type() {
        const currentJob = jobs[jobIndex];
        if (!isDeleting) {
            text = base + currentJob.substring(0, charIndex + 1);
            charIndex++;
            el.textContent = text;
            if (charIndex < currentJob.length) {
                typingTimeout = setTimeout(type, 60);
            } else {
                // Wait, then start deleting job
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, 1200);
            }
        } else {
            text = base + currentJob.substring(0, charIndex - 1);
            charIndex--;
            el.textContent = text;
            if (charIndex > 0) {
                typingTimeout = setTimeout(type, 40);
            } else {
                // Move to next job
                isDeleting = false;
                jobIndex = (jobIndex + 1) % jobs.length;
                setTimeout(type, 500);
            }
        }
    }
    // Start typing after a short delay
    setTimeout(() => {
        charIndex = 0;
        type();
    }, 800);
});