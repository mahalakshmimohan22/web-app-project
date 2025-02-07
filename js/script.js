document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
  const track = document.querySelector('.carousel-track');
  const trackContainer = document.querySelector('.carousel-track-container');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');
  
  // Number of cards visible at one time:
  const itemsToShow = 3;
  
  // Get the original list of items (as an array)
  const originalItems = Array.from(track.children);
  const totalOriginal = originalItems.length;
  
  // Clone the last 3 and first 3 for infinite scrolling
  const clonesBefore = originalItems.slice(-itemsToShow).map(item => item.cloneNode(true));
  const clonesAfter  = originalItems.slice(0, itemsToShow).map(item => item.cloneNode(true));
  
  // Prepend clonesBefore
  clonesBefore.forEach(clone => {
    track.insertBefore(clone, track.firstChild);
  });
  
  // Append clonesAfter
  clonesAfter.forEach(clone => {
    track.appendChild(clone);
  });
  
  // Start at index equal to the number of prepended clones.
  let currentIndex = clonesBefore.length;
  let isTransitioning = false;
  
  // This function calculates item width (they are all the same) and sets the translateX
  function updateTrackPosition(animate = true) {
    // Get width from one item – note that on resize this will be updated
    const itemWidth = track.children[currentIndex].offsetWidth;
    // Optionally disable transition for instant repositioning
    track.style.transition = animate ? 'transform 0.5s ease' : 'none';
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    
    // Update the “active” (center) card. With 3 visible cards, the center is currentIndex+1.
    Array.from(track.children).forEach(item => item.classList.remove('active'));
    const centerIndex = currentIndex + 1;
    if (track.children[centerIndex]) {
      track.children[centerIndex].classList.add('active');
    }
  }
  
  // Set initial position (no animation)
  updateTrackPosition(false);
  
  // After a transition ends, check if we need to “jump” without animation.
  track.addEventListener('transitionend', () => {
    isTransitioning = false;
    
    // When moving forward past the real items, jump back to the beginning.
    if (currentIndex >= clonesBefore.length + totalOriginal) {
      currentIndex = clonesBefore.length;
      updateTrackPosition(false);
    }
    // When moving backward before the first real item, jump to the end.
    if (currentIndex < clonesBefore.length) {
      currentIndex = clonesBefore.length + totalOriginal - 1;
      updateTrackPosition(false);
    }
  });
  
  // Next button – slide one card to the left
  nextButton.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateTrackPosition();
  });
  
  // Prev button – slide one card to the right
  prevButton.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateTrackPosition();
  });
  
  // Recalculate position on window resize (in case widths have changed)
  window.addEventListener('resize', () => {
    updateTrackPosition(false);
  });

    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
    });

    // Modal functionality
    const cartModal = document.getElementById('cartModal');
    const requestDishModal = document.getElementById('requestDishModal');
    const cartBtn = document.querySelector('.bag-action');
    const requestDishBtn = document.querySelector('.request-dish-btn');
    const closeCartModal = document.querySelector('.close-cart');
    const closeRequestDishModal = document.querySelector('.close-request-dish');
    const backToMenuBtn = document.querySelector('.back-to-menu-btn');
    const cancelRequestBtn = document.querySelector('.cancel-request-btn');

    cartBtn.addEventListener('click', function() {
        cartModal.style.display = 'block';
    });

    requestDishBtn.addEventListener('click', function() {
        requestDishModal.style.display = 'block';
    });

    closeCartModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    closeRequestDishModal.addEventListener('click', function() {
        requestDishModal.style.display = 'none';
    });

    backToMenuBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    cancelRequestBtn.addEventListener('click', function() {
        requestDishModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (event.target === requestDishModal) {
            requestDishModal.style.display = 'none';
        }
    });

    // Video play/pause functionality
    const video = document.getElementById('promo-video');
    const playPauseBtn = document.querySelector('.play-pause-btn');

    playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    video.addEventListener('pause', function() {
        playPauseBtn.style.display = 'flex';
    });

    video.addEventListener('play', function() {
        playPauseBtn.style.display = 'none';
    });

    playPauseBtn.style.display = 'flex'; // Ensure the button is visible initially
});