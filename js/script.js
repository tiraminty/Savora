const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const navbar = document.querySelector("nav");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});

document.addEventListener("click", function (event) {

    if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        navLinks.classList.remove("active");
    }

});

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});

// ==========================
// SCROLL REVEAL
// ==========================

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }

    });

}, {

    threshold: 0.2

});

revealElements.forEach(function (element) {

    observer.observe(element);

});

// ==========================
// SCROLL TO TOP
// ==========================
const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 1000) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }

    });

    scrollTopBtn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// ==========================
// CONTACT FORM
// ==========================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                formMessage.textContent = "Message sent successfully!";
                formMessage.classList.add("show", "success");

                contactForm.reset();

                setTimeout(function () {
                    formMessage.classList.remove("show", "success");
                }, 3000);
            } else {
                formMessage.textContent = "Something went wrong. Please try again.";
                formMessage.classList.add("show", "error");
            }

        } catch (error) {
            formMessage.textContent = "Something went wrong. Please try again.";
            formMessage.classList.add("show", "error");
        }
    });

}