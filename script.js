// 1. Initialize Custom AOS Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
    });
});

// 2. Mobile Menu Toggle (Accessible & Keyboard-Friendly)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

function openMenu() {
    navLinks.classList.add('mobile-active');
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = 'rgba(5, 5, 8, 0.95)';
    navLinks.style.padding = '2rem 0';
    hamburger.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
    navLinks.classList.remove('mobile-active');
    navLinks.style.display = 'none';
    hamburger.setAttribute('aria-expanded', 'false');
}

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        if (navLinks.classList.contains('mobile-active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('mobile-active')) {
            closeMenu();
            hamburger.focus();
        }
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('mobile-active')) {
                closeMenu();
            }
        });
    });
}

// 3. Hero 3D Mouse Parallax Effect (Throttled with requestAnimationFrame)
let mouseTicking = false;

document.addEventListener("mousemove", (e) => {
    if (mouseTicking) return;
    mouseTicking = true;

    requestAnimationFrame(() => {
        const layers = document.querySelectorAll(".layer");
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        layers.forEach(layer => {
            const speed = layer.getAttribute("data-speed");
            if (speed) {
                const xPos = x * speed;
                const yPos = y * speed;
                layer.style.transform = `translateX(${xPos}px) translateY(${yPos}px)`;
            }
        });
        mouseTicking = false;
    });
});

// 4. Global Ambient Particles (Throttled Scroll with RAF + Passive Listener)
const particlesContainer = document.getElementById('particles-container');
const particles = [];

if (particlesContainer) {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        let p = document.createElement('div');
        p.classList.add('g-particle');

        let size = Math.random() * 5 + 2;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}vw`;
        p.style.top = `${Math.random() * 100}vh`;
        p.setAttribute('data-scroll-speed', (Math.random() * 0.5) + 0.1);

        particlesContainer.appendChild(p);
        particles.push(p);
    }

    let scrollTicking = false;

    window.addEventListener('scroll', () => {
        if (scrollTicking) return;
        scrollTicking = true;

        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            particles.forEach(p => {
                const speed = p.getAttribute('data-scroll-speed');
                p.style.transform = `translateY(${scrollY * -speed}px)`;
            });
            scrollTicking = false;
        });
    }, { passive: true });
}

// 5. Contact Form Logic (AJAX & Terminal Effect)
const form = document.getElementById("contact-form");
const statusDiv = document.getElementById("form-status");
const btnText = document.getElementById("btn-text");

function typeStatus(text) {
    if (!statusDiv) return;
    statusDiv.innerHTML = "";
    statusDiv.style.color = "var(--accent)";

    let i = 0;
    const interval = setInterval(() => {
        statusDiv.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(interval);
    }, 50);
}

if (form) {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const data = new FormData(event.target);
        if (btnText) btnText.innerText = "TRANSMITTING...";

        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                if (btnText) btnText.innerText = "TRANSMISSION COMPLETE";
                typeStatus("> SUCCESS: Payload delivered to Smit's terminal.");
                form.reset();
            } else {
                if (btnText) btnText.innerText = "TRANSMIT DATA";
                typeStatus("> ERROR: Protocol failure. Check connection.");
            }
        } catch (error) {
            if (btnText) btnText.innerText = "TRANSMIT DATA";
            typeStatus("> FATAL ERROR: System offline.");
        }
    });
}