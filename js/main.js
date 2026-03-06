function toggleMobileNav() {
  const nav = document.getElementById("mobileNav");
  nav.classList.toggle("open");
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});
scrollTopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Wishlist Toggle
let wishlistCount = 0;
const badge = document.querySelector(".nav-icon-btn .badge");

function toggleWishlist(btn) {
  const icon = btn.querySelector("i");
  if (btn.classList.contains("wishlisted")) {
    btn.classList.remove("wishlisted");
    icon.style.color = "";
    wishlistCount = Math.max(0, wishlistCount - 1);
  } else {
    btn.classList.add("wishlisted");
    icon.style.color = "#6B1A1A";
    icon.style.fill = "#6B1A1A";
    wishlistCount++;
    // Quick heart animation
    btn.style.transform = "scale(1.3)";
    setTimeout(() => (btn.style.transform = ""), 250);
  }
  badge.textContent = wishlistCount;
}

// Intersection Observer for fade-in
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((el) => {
      if (el.isIntersecting) {
        el.target.style.opacity = "1";
        el.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".product-card, .why-card, .cat-card, .testi-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition =
      "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s, border-color 0.3s";
    observer.observe(el);
  });
