// Wait for DOM to fully load

// Main script wrapper
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Image Change
    window.changeImage = function (thumbnail) {
        const mainImg = document.getElementById("mainImage");
        if (mainImg) mainImg.src = thumbnail.src;
    }

    // Product Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                card.style.display = (filterValue === 'all' || category === filterValue) ? 'block' : 'none';
            });
        });
    });





    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
        testimonialSlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    if (testimonialSlides.length) {
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
            nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        let slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);

        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            testimonialSlider.addEventListener('mouseleave', () => {
                slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
            });
        }
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // Handle placeholder images
    const placeholderImages = document.querySelectorAll('.placeholder-image');
    placeholderImages.forEach(img => {
        img.addEventListener('error', function () {
            const alt = this.alt.toLowerCase();
            let fallback = 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60';
            if (alt.includes('gajar')) fallback = 'https://images.unsplash.com/photo-1727018427695-35a6048c91e7';
            else if (alt.includes('belgiri')) fallback = 'https://images.unsplash.com/photo-1727018792817-2dae98db2294';
            else if (alt.includes('seb')) fallback = 'https://images.unsplash.com/photo-1611586315282-e175d4a74bca';
            this.src = fallback;
        });
    });

    // Animation on scroll
    const animatedEls = document.querySelectorAll('.product-card, .feature, .benefit-card, .step');

    function animateOnScroll() {
        animatedEls.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    animatedEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // trigger once on load
});
