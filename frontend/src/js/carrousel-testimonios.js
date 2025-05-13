const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slides = document.querySelectorAll('.testimonial');
let index = 0;

function updateCarousel() {
  const width = slides[0].offsetWidth;
  track.style.transform = `translateX(-${index * width}px)`;
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Auto-scroll
let autoScroll = setInterval(() => {
  index = (index + 1) % slides.length;
  updateCarousel();
}, 5000);

// Pause auto-scroll on hover
track.addEventListener('mouseenter', () => clearInterval(autoScroll));
track.addEventListener('mouseleave', () => {
  autoScroll = setInterval(() => {
    index = (index + 1) % slides.length;
    updateCarousel();
  }, 5000);
});

// Drag
let startX = 0;
let isDragging = false;

track.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  track.style.cursor = 'grabbing';
});

track.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  const endX = e.pageX;
  if (endX < startX - 50) {
    nextBtn.click();
  } else if (endX > startX + 50) {
    prevBtn.click();
  }
  isDragging = false;
  track.style.cursor = 'grab';
});

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  if (endX < startX - 50) {
    nextBtn.click();
  } else if (endX > startX + 50) {
    prevBtn.click();
  }
});

// Resize listener (recalcula tamaño)
window.addEventListener('resize', updateCarousel);