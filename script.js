document.addEventListener("DOMContentLoaded", () => {
  // Menu mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });
  }

  // Header ao fazer scroll
  const header = document.querySelector(".site-header");

  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Botões de adicionar ao carrinho
  const cartButtons = document.querySelectorAll(
    ".add-to-cart, .product-btn"
  );

  const cartCount = document.querySelector(".cart-count");
  let cartItems = 0;

  cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cartItems++;

      if (cartCount) {
        cartCount.textContent = cartItems;
        cartCount.classList.add("updated");

        setTimeout(() => {
          cartCount.classList.remove("updated");
        }, 300);
      }

      const originalText = button.textContent;
      button.textContent = "Adicionado ✓";

      setTimeout(() => {
        button.textContent = originalText;
      }, 1500);
    });
  });

  // Animações ao aparecer no ecrã
  const animatedElements = document.querySelectorAll(
    ".fade-up, .reveal, .product-card, .feature-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    animatedElements.forEach((