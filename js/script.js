document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    function showItem(index) {
        items.forEach((item, i) => {
            item.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % totalItems;
        showItem(currentIndex);
    }

    function prevItem() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showItem(currentIndex);
    }

    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
    });

    document.querySelector('.carousel-next').addEventListener('click', nextItem);
    document.querySelector('.carousel-prev').addEventListener('click', prevItem);

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
    const video = document.getElementById('video');
    const playPauseBtn = document.querySelector('.play-pause-btn');

    playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            video.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    // Initialize carousel
    showItem(currentIndex);
});