document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const trackContainer = document.querySelector('.carousel-track-container');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const itemsToShow = 3;
    const originalItems = Array.from(track.children);
    const totalOriginal = originalItems.length;
    const clonesBefore = originalItems.slice(-itemsToShow).map(item => item.cloneNode(true));
    const clonesAfter  = originalItems.slice(0, itemsToShow).map(item => item.cloneNode(true));
    clonesBefore.forEach(clone => {
        track.insertBefore(clone, track.firstChild);
    });
    clonesAfter.forEach(clone => {
        track.appendChild(clone);
    });
    let currentIndex = clonesBefore.length;
    let isTransitioning = false;
    function updateTrackPosition(animate = true) {
        const itemWidth = track.children[currentIndex].offsetWidth;
        track.style.transition = animate ? 'transform 0.5s ease' : 'none';
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        Array.from(track.children).forEach(item => item.classList.remove('active'));
        const centerIndex = currentIndex + 1;
        if (track.children[centerIndex]) {
            track.children[centerIndex].classList.add('active');
        }
    }
    updateTrackPosition(false);
    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        if (currentIndex >= clonesBefore.length + totalOriginal) {
            currentIndex = clonesBefore.length;
            updateTrackPosition(false);
        }
        if (currentIndex < clonesBefore.length) {
            currentIndex = clonesBefore.length + totalOriginal - 1;
            updateTrackPosition(false);
        }
    });
    nextButton.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updateTrackPosition();
    });
    prevButton.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        updateTrackPosition();
    });
    window.addEventListener('resize', () => {
        updateTrackPosition(false);
    });

    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
    });

    const cartModal = document.getElementById('cartModal');
    const requestDishModal = document.getElementById('requestDishModal');
    const cartBtn = document.querySelector('.bag-action');
    const requestDishBtn = document.querySelector('.request-dish-btn');
    const closeCartModal = document.querySelector('.close-cart');
    const closeRequestDishModal = document.querySelector('.close-request-dish');
    const backToMenuBtn = document.querySelector('.back-to-menu-btn');
    const cancelRequestBtn = document.querySelector('.cancel-request-btn');

    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    function enableScroll() {
        document.body.style.overflow = '';
    }

    cartBtn.addEventListener('click', function() {
        cartModal.style.display = 'block';
        disableScroll();
    });

    requestDishBtn.addEventListener('click', function() {
        requestDishModal.style.display = 'block';
        disableScroll();
    });

    closeCartModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
        enableScroll();
    });

    closeRequestDishModal.addEventListener('click', function() {
        requestDishModal.style.display = 'none';
        enableScroll();
    });

    backToMenuBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
        enableScroll();
    });

    cancelRequestBtn.addEventListener('click', function() {
        requestDishModal.style.display = 'none';
        enableScroll();
    });

    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
            enableScroll();
        }
        if (event.target === requestDishModal) {
            requestDishModal.style.display = 'none';
            enableScroll();
        }
    });

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
        playPauseBtn.classList.remove('playing');
        playPauseBtn.style.display = 'flex';
    });

    video.addEventListener('play', function() {
        playPauseBtn.classList.add('playing');
        setTimeout(() => {
            playPauseBtn.style.display = 'none';
        }, 500);
    });

    video.addEventListener('mouseover', function() {
        if (!video.paused) {
            playPauseBtn.style.display = 'flex';
        }
    });

    video.addEventListener('mouseout', function() {
        if (!video.paused) {
            playPauseBtn.style.display = 'none';
        }
    });

    playPauseBtn.style.display = 'flex';
});