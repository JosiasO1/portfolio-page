/**
 * 3D Hobby Carousel
 * Interactive carousel with one centered card and two cards on each side
 */

(function() {
    const carousel = {
        container: null,
        track: null,
        slides: [],
        dotsContainer: null,
        dots: [],
        prevBtn: null,
        nextBtn: null,
        currentIndex: 0,
        totalSlides: 0,
        isAnimating: false
    };

    function init() {
        // Find carousel elements
        carousel.container = document.querySelector('.hobby-carousel-container');
        carousel.track = document.querySelector('.hobby-carousel-track');
        carousel.slides = Array.from(document.querySelectorAll('.hobby-carousel-slide'));
        carousel.dotsContainer = document.querySelector('.carousel-dots');
        carousel.prevBtn = document.querySelector('.carousel-nav-prev');
        carousel.nextBtn = document.querySelector('.carousel-nav-next');

        // Check if carousel exists on this page
        if (!carousel.container || carousel.slides.length === 0) {
            console.log('ℹ️ Hobby carousel not found on this page');
            return;
        }

        carousel.totalSlides = carousel.slides.length;
        console.log(`✓ Hobby carousel found with ${carousel.totalSlides} slides`);

        // Create dot indicators
        createDots();

        // Attach event listeners
        carousel.prevBtn.addEventListener('click', () => navigate('prev'));
        carousel.nextBtn.addEventListener('click', () => navigate('next'));

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);

        // Initial positioning
        updateCarousel();

        console.log('✅ Hobby carousel initialized');
    }

    function createDots() {
        carousel.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Gehe zu Hobby ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            carousel.dotsContainer.appendChild(dot);
            carousel.dots.push(dot);
        });
    }

    function navigate(direction) {
        if (carousel.isAnimating) return;

        if (direction === 'prev') {
            carousel.currentIndex = (carousel.currentIndex - 1 + carousel.totalSlides) % carousel.totalSlides;
        } else {
            carousel.currentIndex = (carousel.currentIndex + 1) % carousel.totalSlides;
        }

        updateCarousel();
    }

    function goToSlide(index) {
        if (carousel.isAnimating || index === carousel.currentIndex) return;
        carousel.currentIndex = index;
        updateCarousel();
    }

    function handleKeyboard(e) {
        if (!carousel.container) return;

        if (e.key === 'ArrowLeft') {
            navigate('prev');
        } else if (e.key === 'ArrowRight') {
            navigate('next');
        }
    }

    function updateCarousel() {
        carousel.isAnimating = true;

        carousel.slides.forEach((slide, index) => {
            // Remove all state classes
            slide.classList.remove('carousel-slide-active', 'carousel-slide-prev', 'carousel-slide-next', 'carousel-slide-hidden');

            // Calculate position relative to current index
            let position = index - carousel.currentIndex;

            // Wrap positions for circular carousel
            if (position < -Math.floor(carousel.totalSlides / 2)) position += carousel.totalSlides;
            if (position > Math.floor(carousel.totalSlides / 2)) position -= carousel.totalSlides;

            // Apply class based on position (only show 3 cards)
            if (position === 0) {
                slide.classList.add('carousel-slide-active');
            } else if (position === -1) {
                slide.classList.add('carousel-slide-prev');
            } else if (position === 1) {
                slide.classList.add('carousel-slide-next');
            } else {
                slide.classList.add('carousel-slide-hidden');
            }
        });

        // Update dots
        carousel.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === carousel.currentIndex);
        });

        // Re-enable animation after transition
        setTimeout(() => {
            carousel.isAnimating = false;
        }, 400);
    }


    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
