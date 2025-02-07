document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    let currentIndex = 1; // Start with the second item as the active item
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('carousel-pagination');
    document.querySelector('.carousel').appendChild(dotsContainer);

    // Clone first and last items for infinite effect
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, items[0]);

    const dots = [];

    // Create dots for pagination
    items.forEach((item, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
        dots.push(dot);
    });

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active');
            dots[index].classList.remove('active');
        });
        items[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
        track.style.transform = `translateX(-${(currentIndex + 1) * 33.33}%)`; // Adjust for 3 items and clones
    }

    function nextItem() {
        currentIndex++;
        if (currentIndex >= totalItems) {
            currentIndex = 0;
            track.style.transition = 'none';
            track.style.transform = `translateX(-${(currentIndex + 1) * 33.33}%)`;
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease';
                updateCarousel();
            }, 0);
        } else {
            updateCarousel();
        }
    }

    function prevItem() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalItems - 1;
            track.style.transition = 'none';
            track.style.transform = `translateX(-${(currentIndex + 1) * 33.33}%)`;
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease';
                updateCarousel();
            }, 0);
        } else {
            updateCarousel();
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    prevButton.addEventListener('click', prevItem);
    nextButton.addEventListener('click', nextItem);

    // Initialize carousel
    updateCarousel();

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