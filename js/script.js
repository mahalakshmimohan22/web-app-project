document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');

    // Clone first and last items for infinite scroll
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, items[0]);

    // Set initial position to first actual item
    currentIndex = 1;
    
    function updateCarousel(transition = true) {
        const itemWidth = items[0].getBoundingClientRect().width;
        if (!transition) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.3s ease-in-out';
        }
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    function nextItem() {
        if (currentIndex >= totalItems + 1) return;
        currentIndex++;
        updateCarousel();

        // Reset to first item if we reached the clone
        if (currentIndex === totalItems + 1) {
            setTimeout(() => {
                currentIndex = 1;
                updateCarousel(false);
            }, 300);
        }
    }

    function prevItem() {
        if (currentIndex <= 0) return;
        currentIndex--;
        updateCarousel();

        // Reset to last item if we reached the clone
        if (currentIndex === 0) {
            setTimeout(() => {
                currentIndex = totalItems;
                updateCarousel(false);
            }, 300);
        }
    }

    prevButton.addEventListener('click', prevItem);
    nextButton.addEventListener('click', nextItem);

    // Initialize carousel
    updateCarousel(false);

    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
    });

    // Modal functionality
    const cartModal = document.getElementById('cartModal');
    const dishModal = document.getElementById('dishModal');
    const cartBtn = document.querySelector('.cart-btn');
    const dishRequestBtn = document.querySelector('.dish-request-btn');
    const closeCartModal = document.querySelector('.close-cart');
    const closeDishModal = document.querySelector('.close-dish');

    cartBtn.addEventListener('click', function() {
        cartModal.style.display = 'block';
    });

    dishRequestBtn.addEventListener('click', function() {
        dishModal.style.display = 'block';
    });

    closeCartModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    closeDishModal.addEventListener('click', function() {
        dishModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (event.target === dishModal) {
            dishModal.style.display = 'none';
        }
    });

    // Video play/pause functionality
    const video = document.getElementById('promo-video');
    const playPauseBtn = document.querySelector('.play-pause-btn');

    playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseBtn.style.display = 'none';
        } else {
            video.pause();
            playPauseBtn.style.display = 'flex';
        }
    });

    video.addEventListener('pause', function() {
        playPauseBtn.style.display = 'flex';
    });

    video.addEventListener('play', function() {
        playPauseBtn.style.display = 'none';
    });
});