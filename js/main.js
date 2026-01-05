document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
});

const animatedElements = document.querySelectorAll(
  ".card, .gallery-item, .monument img, .form-box, .section h1, .section h2, .section p"
);

animatedElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(40px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});

const observerOptions = { threshold: 0.15 };

const revealOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      observer.unobserve(el);
    }
  });
}, observerOptions);

animatedElements.forEach(el => revealOnScroll.observe(el));

const slideElements = document.querySelectorAll(".slide, .slide-left, .slide-right");

const slideObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

slideElements.forEach(el => slideObserver.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

const form = document.getElementById("feedbackForm");
if (form) {
  const messages = document.getElementById("formMessages");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name) {
      messages.textContent = "Name cannot be empty.";
      messages.className = "form-messages err";
      return;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      messages.textContent = "Invalid email format.";
      messages.className = "form-messages err";
      return;
    }
    if (message.length < 10) {
      messages.textContent = "Message must be at least 10 characters.";
      messages.className = "form-messages err";
      return;
    }

    localStorage.setItem("feedback", JSON.stringify({ name, email, message }));

    messages.textContent = "Thank you for your feedback!";
    messages.className = "form-messages ok";
    form.reset();
  });
}