// Main JavaScript for SMAN 1 Cabangbungin Website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    let heroSliderInterval;

    function showSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }
    
    if (heroSlides.length > 0) {
        showSlide(0);
        heroSliderInterval = setInterval(nextSlide, 5000);
    }

    // Sticky Header and Dynamic Margin Top
    const mainHeader = document.querySelector('.main-header');
    const topBar = document.querySelector('.top-bar');
    const heroSection = document.querySelector('.hero-section');
    const pageHeader = document.querySelector('.page-header'); // Untuk halaman sub

    function adjustHeaderAndHeroMargin() {
        const topBarHeight = topBar ? topBar.offsetHeight : 0;
        const mainHeaderHeight = mainHeader ? mainHeader.offsetHeight : 0;
        let totalHeaderHeight = topBarHeight + mainHeaderHeight; // Total tinggi kedua header fixed

        // Perbarui margin-top untuk hero section dan page-header
        if (heroSection) {
            heroSection.style.marginTop = `${totalHeaderHeight}px`;
        }
        if (pageHeader) { // Untuk halaman sub
            pageHeader.style.marginTop = `${totalHeaderHeight}px`;
        }
        // Pastikan body juga punya padding-top agar konten tidak tertutup saat scroll ke paling atas
        document.body.style.paddingTop = `${totalHeaderHeight}px`;
    }

    // Adjust news ticker content left dynamically for desktop
    function adjustNewsTickerContentPosition() {
        const newsTickerLabel = document.querySelector('.news-ticker-label');
        const newsTickerContent = document.querySelector('.news-ticker-content');
        if (newsTickerLabel && newsTickerContent && window.innerWidth > 576) { // Hanya untuk desktop
            const labelWidth = newsTickerLabel.offsetWidth;
            newsTickerContent.style.left = `${labelWidth + 10}px`; // Label width + 10px padding
        } else if (newsTickerContent && window.innerWidth <= 576) { // Untuk mobile
            newsTickerContent.style.left = `0`; // Reset left untuk mobile (static position)
        }
    }

    // Call adjustments on load, resize, and scroll
    window.addEventListener('load', () => {
        adjustHeaderAndHeroMargin();
        adjustNewsTickerContentPosition(); // Atur posisi ticker saat load
    });
    window.addEventListener('resize', () => {
        adjustHeaderAndHeroMargin();
        adjustNewsTickerContentPosition(); // Atur posisi ticker saat resize
    });
    window.addEventListener('scroll', () => {
        // Logika .scrolled class hanya untuk bayangan main-header, bukan posisi top
        if (window.pageYOffset > topBar.offsetHeight / 2 && mainHeader) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
        // Tidak perlu adjustHeaderAndHeroMargin di setiap scroll, hanya saat load/resize atau header berubah tinggi
        // Karena tinggi header fixed sekarang konstan.
    });


    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // News Ticker Animation - CSS handles the animation, JS handles position.
    // Ensure content is duplicated in HTML if you want truly seamless loop
    // newsTicker.innerHTML += newsTicker.innerHTML; // Ini bisa dilakukan di HTML atau di sini jika perlu.


    // Live Date and Time
    function updateDateTime() {
        const now = new Date();
        const dateElement = document.getElementById('date');
        const timeElement = document.getElementById('time');
        
        if (dateElement) {
            dateElement.textContent = now.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }
        
        if (timeElement) {
            timeElement.textContent = now.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const totalHeaderHeight = (topBar ? topBar.offsetHeight : 0) + (mainHeader ? mainHeader.offsetHeight : 0); // Total fixed header height
                
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - totalHeaderHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Gallery Lightbox (Simple Version with Caption)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgElement = this.querySelector('img');
            const imgSrc = imgElement.src;
            const imgCaption = imgElement.getAttribute('data-caption') || '';

            const lightbox = document.createElement('div');
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.flexDirection = 'column';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '1000';
            lightbox.style.cursor = 'zoom-out';
            lightbox.style.padding = '20px';
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.style.maxWidth = '90%';
            img.style.maxHeight = '90%';
            img.style.objectFit = 'contain';
            img.style.marginBottom = '10px';
            
            const caption = document.createElement('p');
            caption.textContent = imgCaption;
            caption.style.color = 'white';
            caption.style.fontSize = '1.1rem';
            caption.style.textAlign = 'center';
            caption.style.maxWidth = '80%';
            
            lightbox.appendChild(img);
            if (imgCaption) {
                lightbox.appendChild(caption);
            }
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        });
    });

    // Form Validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[type="text"]').value.trim();
            const email = contactForm.querySelector('input[type="email"]').value.trim();
            const message = contactForm.querySelector('textarea').value.trim();
            
            if (!name || !email || !message) {
                alert('Harap isi semua kolom yang diperlukan!');
                return;
            }
            
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                alert('Masukkan alamat email yang valid!');
                return;
            }
            
            alert('Pesan Anda telah berhasil dikirim! Kami akan segera menghubungi Anda.');
            contactForm.reset();
        });
    }

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const testimonialSlider = document.querySelector('.testimonial-slider');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
        updateDots();
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function startTestimonialSlider() {
        if (testimonials.length > 1) {
            showTestimonial(0);
            testimonialInterval = setInterval(nextTestimonial, 7000);
        }
    }

    if (testimonials.length > 1 && testimonialSlider) {
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.classList.add('testimonial-nav-btn', 'prev');
        testimonialSlider.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.classList.add('testimonial-nav-btn', 'next');
        testimonialSlider.appendChild(nextButton);

        prevButton.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            prevTestimonial();
            startTestimonialSlider();
        });

        nextButton.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            nextTestimonial();
            startTestimonialSlider();
        });

        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('testimonial-dots');
        testimonialSlider.appendChild(dotsContainer);

        function createDots() {
            for (let i = 0; i < testimonials.length; i++) {
                const dot = document.createElement('span');
                dot.classList.add('testimonial-dot');
                dot.addEventListener('click', () => {
                    clearInterval(testimonialInterval);
                    showTestimonial(i);
                    currentTestimonial = i;
                    startTestimonialSlider();
                });
                dotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            const dots = document.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentTestimonial);
            });
        }

        createDots();
        startTestimonialSlider();
    }

    // Scroll Animation (using Intersection Observer)
    AOS.init({
        duration: 1000,
        once: true
    });
});