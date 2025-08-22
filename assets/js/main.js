// Reveal on scroll
const reveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("fade-in-up");
    });
  },
  { threshold: 0.06 }
);
document.querySelectorAll("section").forEach((el) => reveal.observe(el));

// Load partials (navbar & footer)
async function loadPartials() {
  try {
    // load navbar
    const navbar = await fetch("partials/navbar.html").then((r) => r.text());
    document.getElementById("navbar").innerHTML = navbar;

    // load footer
    const footer = await fetch("partials/footer.html").then((r) => r.text());
    document.getElementById("footer").innerHTML = footer;

    // update tahun di footer
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // setelah navbar dimuat, baru aktifkan toggle menu
    const btnMenu = document.getElementById("btnMenu");
    const mobileNav = document.getElementById("mobileNav");
    if (btnMenu && mobileNav) {
      btnMenu.addEventListener("click", () => {
        mobileNav.classList.toggle("max-h-0");
        mobileNav.classList.toggle("max-h-screen");
      });
    }
  } catch (err) {
    console.error("Gagal load partials:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadPartials);

const buttons = document.querySelectorAll(".category-btn");
const cards = document.querySelectorAll(".project-card");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;

    // Highlight active button
    buttons.forEach((b) => b.classList.remove("bg-brand-500"));
    btn.classList.add("bg-brand-500");

    cards.forEach((card) => {
      if (category === "all" || card.classList.contains(category)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

