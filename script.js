document.addEventListener('DOMContentLoaded', () => {
    // Get carousel elements
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const itemCount = carouselItems.length;
    let autoPlayInterval;
    
    // Function to update carousel
    function updateCarousel() {
        // Hide all items
        carouselItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Show current item
        carouselItems[currentIndex].classList.add('active');
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Adjust carousel height to match current image
        const currentImage = carouselItems[currentIndex].querySelector('img');
        currentImage.onload = () => {
            carousel.style.height = `${currentImage.offsetHeight}px`;
        };
        
        // In case the image is already loaded
        if (currentImage.complete) {
            carousel.style.height = `${currentImage.offsetHeight}px`;
        }
    }
    
    // Next button click
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    });
    
    // Previous button click
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    });
    
    // Dot clicks
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.getAttribute('data-index'));
            updateCarousel();
        });
    });

    // Initialize carousel
    // Make first item active
    carouselItems[0].classList.add('active');
    updateCarousel();
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            updateCarousel();
            resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
            resetAutoPlay();
        }
    });
    
    // Adjust carousel height on window resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });
});