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
const cardWidth = 316; // card width + gap

reviewsNext.addEventListener("click", () => {
  const maxIndex = reviewsTrack.children.length - 1;
  if (reviewsIndex < maxIndex) {
    reviewsIndex++;
    reviewsTrack.style.transform = `translateX(-${reviewsIndex * cardWidth}px)`;
    reviewsTrack.style.transition = "transform 0.4s ease";
  }
});

reviewsPrev.addEventListener("click", () => {
  if (reviewsIndex > 0) {
    reviewsIndex--;
    reviewsTrack.style.transform = `translateX(-${reviewsIndex * cardWidth}px)`;
    reviewsTrack.style.transition = "transform 0.4s ease";
  }
});
