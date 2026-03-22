const images = [
  "/src/assets/hero.jpg",
  "/src/assets/hero2.jpg",
  "/src/assets/hero3.jpg",
];

const heroBg = document.getElementById("hero-bg");
const heroPrev = document.getElementById("hero-prev");
const lines = [
  document.getElementById("line-1"),
  document.getElementById("line-2"),
  document.getElementById("line-3"),
];

let current = 0;

function updateSlide() {
  // Copy current image to the layer behind
  heroPrev.style.backgroundImage = heroBg.style.backgroundImage;

  // Swap new image on top instantly
  heroBg.style.backgroundImage = `url('${images[current]}')`;
  heroBg.style.opacity = "0";

  // Fade new image in over the old one
  setTimeout(() => {
    heroBg.style.opacity = "1";
  }, 50);

  // Update slide lines
  lines.forEach((line, i) => {
    if (i === current) {
      line.classList.add("active");
    } else {
      line.classList.remove("active");
    }
  });
}

// Set initial state
updateSlide();

// Auto-advance every 10 seconds
setInterval(() => {
  current = (current + 1) % images.length;
  updateSlide();
}, 10000);

// Hamburger Menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("open");
});

// Close menu when a link is clicked
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("open");
  });
});

// Close menu on resize past mobile
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("open");
  }
});

// Reviews Carousel
const reviewsTrack = document.getElementById("reviews-track");
const reviewsPrev = document.getElementById("reviews-prev");
const reviewsNext = document.getElementById("reviews-next");

let reviewsIndex = 0;

function getCardWidth() {
  const card = reviewsTrack.querySelector(".review-card");
  const gap = 16;
  return card.getBoundingClientRect().width + gap;
}

function getMaxIndex() {
  const clip = reviewsTrack.parentElement;
  const cardW = getCardWidth();
  const visible = Math.floor(clip.offsetWidth / cardW);
  return Math.max(0, reviewsTrack.children.length - visible);
}

function updateCarousel() {
  const max = getMaxIndex();
  reviewsIndex = Math.max(0, Math.min(reviewsIndex, max));
  reviewsTrack.style.transform = `translateX(-${reviewsIndex * getCardWidth()}px)`;
  reviewsPrev.style.opacity = reviewsIndex === 0 ? "0.3" : "1";
  reviewsNext.style.opacity = reviewsIndex >= max ? "0.3" : "1";
}

reviewsPrev.addEventListener("click", () => {
  reviewsIndex--;
  updateCarousel();
});
reviewsNext.addEventListener("click", () => {
  reviewsIndex++;
  updateCarousel();
});
window.addEventListener("resize", updateCarousel);
updateCarousel();
