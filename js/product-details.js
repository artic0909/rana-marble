/* ─── Nav ─── */
function toggleMobileNav() {
  document.getElementById("mobileNav").classList.toggle("open");
}

/* ─── Scroll Top ─── */
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
});
scrollTopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ─── Image Gallery ─── */
let currentImg = "./img/hero.png";
function switchImg(thumb, src) {
  document
    .querySelectorAll(".thumb")
    .forEach((t) => t.classList.remove("active"));
  thumb.classList.add("active");
  const img = document.getElementById("mainImg");
  img.style.opacity = "0";
  img.style.transform = "scale(0.97)";
  setTimeout(() => {
    img.src = src;
    currentImg = src;
    img.style.opacity = "1";
    img.style.transform = "scale(1)";
  }, 180);
  img.style.transition = "opacity 0.18s ease, transform 0.18s ease";
}

/* ─── Lightbox ─── */
function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  document.getElementById("lightboxImg").src = src;
  lb.style.display = "flex";
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
  document.body.style.overflow = "";
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* ─── Wishlist ─── */
let wished = false;
let wishCount = 0;
function toggleWish() {
  wished = !wished;
  ["wishMainBtn", "wishCta", "stickyWishBtn"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle("active", wished);
    const icon = el.querySelector("i");
    if (icon) {
      icon.style.color = wished ? "#6B1A1A" : "";
    }
  });
  wishCount = wished ? 1 : 0;
  document.getElementById("wishBadge").textContent = wishCount;
}
function toggleMainWish() {
  toggleWish();
}

function toggleWishlist(btn) {
  btn.classList.toggle("wishlisted");
  const icon = btn.querySelector("i");
  if (icon)
    icon.style.color = btn.classList.contains("wishlisted") ? "#6B1A1A" : "";
}

/* ─── Size Selector ─── */
function selectSize(el, label) {
  document
    .querySelectorAll(".size-opt")
    .forEach((o) => o.classList.remove("active"));
  el.classList.add("active");
  document.getElementById("selectedSize").textContent = "(" + label + ")";
}

/* ─── Finish Selector ─── */
function selectFinish(el, label) {
  document
    .querySelectorAll(".finish-opt")
    .forEach((o) => o.classList.remove("active"));
  el.classList.add("active");
  document.getElementById("selectedFinish").textContent = "(" + label + ")";
}

/* ─── Tabs ─── */
function switchTab(btn, panelId) {
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelectorAll(".tab-panel")
    .forEach((p) => p.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById(panelId).classList.add("active");
  // Scroll to tabs on mobile
  if (window.innerWidth < 900) {
    document
      .querySelector(".tabs-section")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ─── Copy Link ─── */
function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const btn = event.target.closest(".share-btn");
    btn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-link"></i>';
    }, 2000);
  });
}

/* ─── Thumbnail keyboard nav ─── */
document.querySelectorAll(".thumb").forEach((thumb, i, all) => {
  thumb.setAttribute("tabindex", "0");
  thumb.addEventListener("keydown", (e) => {
    if (e.key === "Enter") thumb.click();
    if (e.key === "ArrowRight" && all[i + 1]) all[i + 1].focus();
    if (e.key === "ArrowLeft" && all[i - 1]) all[i - 1].focus();
  });
});

/* ─── Scroll-triggered animations ─── */
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((el) => {
      if (el.isIntersecting) {
        el.target.style.opacity = "1";
        el.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.08 },
);
document
  .querySelectorAll(
    ".product-card, .ship-card, .spec-card, .trust-item, .review-card",
  )
  .forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = `opacity 0.5s ${i * 0.07}s ease, transform 0.5s ${i * 0.07}s ease, box-shadow 0.3s, border-color 0.3s`;
    obs.observe(el);
  });

function validatePincode() {
  const input = document.getElementById("pincodeInput");
  const val = input.value.replace(/\D/g, "");
  input.value = val;
  input.className =
    val.length === 6 ? "valid" : val.length > 0 ? "invalid" : "";
}

function checkDelivery() {
  const val = document.getElementById("pincodeInput").value;
  const result = document.getElementById("deliveryResult");
  if (val.length !== 6) {
    result.className = "error";
    result.innerHTML =
      '<i class="fas fa-times-circle"></i> Please enter a valid 6-digit pincode.';
    return;
  }
  // Static delivery info
  result.className = "success";
  result.innerHTML =
    '<i class="fas fa-check-circle"></i> Delivery available! Estimated charge: ₹1,500 – ₹3,000 depending on weight. Free above ₹25,000.';
}
