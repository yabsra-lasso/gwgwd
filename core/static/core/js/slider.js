document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    if (!track) return;

    const slides = Array.from(document.querySelectorAll('.slide'));

    // Center the scroll initially
    function centerInitial() {
        if (slides.length > 0) {
            const slideWidth = slides[0].offsetWidth;
            const trackWidth = track.parentElement.offsetWidth;
            // Scroll to the second item or middle item
            const initialScroll = (slideWidth * 1.5) + (parseInt(getComputedStyle(track).gap) || 0) - (trackWidth / 2);
            // Approximate centering for demo, intersection observer will handle active state
        }
    }

    // Intersection Observer for highlighting center item
    const observerOptions = {
        root: track,
        threshold: 0.5,
        rootMargin: "-10% 0px -10% 0px" // Narrow the detection area to the center
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    slides.forEach(slide => observer.observe(slide));

    // Optional: Add drag to scroll
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.classList.add('grabbing');
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
        isDown = false;
        track.classList.remove('grabbing');
    });

    track.addEventListener('mouseup', () => {
        isDown = false;
        track.classList.remove('grabbing');
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        track.scrollLeft = scrollLeft - walk;
    });
});
