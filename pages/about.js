
// =====================================
// GEM EXPLORER - ABOUT PAGE JS
// =====================================


// Mobile Navigation

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        menuToggle.textContent =
            navLinks.classList.contains("show") ? "✕" : "☰";

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");
            menuToggle.textContent = "☰";

        });

    });

}


// Header Shadow

window.addEventListener("scroll", () => {

    const header = document.querySelector(".header");

    if (header) {

        header.style.boxShadow =
            window.scrollY > 50
                ? "0 5px 25px rgba(0,0,0,0.25)"
                : "none";

    }

});


// Smooth Scrolling

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId = this.getAttribute("href");

        if (targetId.length > 1) {

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }

    });

});


// Reveal Sections on Scroll

const revealElements = document.querySelectorAll(
    ".about-section-heading, .intro-grid, .location-grid, " +
    ".architecture-feature, .timeline-item, .mission-card, " +
    ".overview-card, .importance-grid > div, .about-gallery img"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {
        element.classList.add("revealed");
    });

}


// Footer Year

const footerText = document.querySelector(".footer-bottom p");

if (footerText) {

    footerText.textContent =
        "© " + new Date().getFullYear() +
        " GEM Explorer - جميع الحقوق محفوظة";

}
