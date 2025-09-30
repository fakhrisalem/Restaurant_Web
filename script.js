document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }
    
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight
        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            window.scrollY > 100 ? selectHeader.classList.add('header-scrolled') : selectHeader.classList.remove('header-scrolled');
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    on('click', '.mobile-nav-toggle', function(e) {
        select('body').classList.toggle('mobile-nav-active');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
    });

    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()
            let body = select('body');
            if (body.classList.contains('mobile-nav-active')) {
               body.classList.remove('mobile-nav-active');
               let navbarToggle = select('.mobile-nav-toggle');
               navbarToggle.classList.toggle('bi-list');
               navbarToggle.classList.toggle('bi-x');
            }
            scrollto(this.hash)
        }
    }, true)

    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    let heroCarouselIndicators = select("#hero-carousel-indicators")
    let heroCarouselItems = select('#heroCarousel .carousel-item', true)
    heroCarouselItems.forEach((item, index) => {
        (index === 0) ?
        heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
            heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
    });

    window.addEventListener('load', () => {
        let menuContainer = select('.menu-container');
        if (menuContainer) {
            let menuIsotope = new Isotope(menuContainer, {
                itemSelector: '.menu-item',
                layoutMode: 'fitRows'
            });
            let menuFilters = select('#menu-flters li', true);
            on('click', '#menu-flters li', function(e) {
                e.preventDefault();
                menuFilters.forEach(function(el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');
                menuIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
            }, true);
        }
    });

    new Swiper('.events-slider', {
        speed: 600,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        slidesPerView: 'auto',
        pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true }
    });

    new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        slidesPerView: 'auto',
        pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
         breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 20 },
            1200: { slidesPerView: 1, spaceBetween: 0 }
        }
    });

    const paragraphs = document.querySelectorAll('.fade-in p');
    paragraphs.forEach((p, index) => {
        setTimeout(() => {
            p.classList.add('show');
        }, index * 200);
    });
});
