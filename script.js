const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

const typedText = document.querySelector(".hero-type strong");
const progressBars = document.querySelectorAll(".progress-fill");
const revealElements = document.querySelectorAll(".reveal");
const loader = document.getElementById("loader");

const texts = [
  "Specialist Automation Engineer",
  "Senior QA Engineer II",
  "Playwright Framework Lead",
  "CI/CD Test Automation Strategist",
];
let typeIndex = 0;
let charIndex = 0;
let typingForward = true;

function typeEffect() {
  const current = texts[typeIndex];
  if (typingForward) {
    charIndex += 1;
    typedText.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      typingForward = false;
      setTimeout(typeEffect, 1600);
      return;
    }
  } else {
    charIndex -= 1;
    typedText.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      typingForward = true;
      typeIndex = (typeIndex + 1) % texts.length;
    }
  }
  setTimeout(typeEffect, typingForward ? 80 : 40);
}

typeEffect();

function updateActiveLink() {
  const scrollPosition = window.scrollY + window.innerHeight / 2;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPosition >= top && scrollPosition < bottom) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}

function animateProgress() {
  progressBars.forEach((bar) => {
    const parent = bar.closest(".progress-bar");
    const elementTop = parent.getBoundingClientRect().top;
    if (elementTop < window.innerHeight - 80) {
      bar.style.width = `${bar.dataset.progress}%`;
    }
  });
}

function revealOnScroll() {
  revealElements.forEach((el) => {
    const elTop = el.getBoundingClientRect().top;
    if (elTop < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", () => {
  updateActiveLink();
  animateProgress();
  revealOnScroll();
});

window.addEventListener("load", () => {
  if (loader) {
    loader.classList.add("hide");
    setTimeout(() => loader.remove(), 700);
  }
  updateActiveLink();
  revealOnScroll();
  animateProgress();
});

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#contact-name").value.trim();
    const email = document.querySelector("#contact-email").value.trim();
    const message = document.querySelector("#contact-message").value.trim();
    if (!name || !email || !message) {
      alert("Please complete all fields before sending your message.");
      return;
    }
    const mailtoLink = `mailto:shriniwasalle4@gmail.com?subject=${encodeURIComponent("Portfolio Inquiry from " + name)}&body=${encodeURIComponent(message + "\n\nContact: " + email)}`;
    window.location.href = mailtoLink;
  });
}

const mobileToggle = document.querySelector("#mobile-menu");
const mobileOverlay = document.querySelector("#mobile-overlay");
const navList = document.querySelector(".nav-list");
const navItems = document.querySelectorAll(".nav-link");

function setMobileMenu(open) {
  if (!navList || !mobileToggle || !mobileOverlay) return;

  navList.classList.toggle("active", open);
  mobileOverlay.classList.toggle("active", open);
  mobileToggle.classList.toggle("open", open);
  mobileToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("mobile-menu-open", open);
}

if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    const isOpen = navList.classList.contains("active");
    setMobileMenu(!isOpen);
  });
}

if (mobileOverlay) {
  mobileOverlay.addEventListener("click", () => setMobileMenu(false));
}

navItems.forEach((link) => {
  link.addEventListener("click", () => setMobileMenu(false));
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navList.classList.contains("active")) {
    setMobileMenu(false);
  }
});
