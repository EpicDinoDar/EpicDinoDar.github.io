document.addEventListener("DOMContentLoaded", () => {
    new Glide('.glide', {
        type: 'carousel',
        startAt: 0,
        perView: 3,
        gap: 20,
        autoplay: 2500,
        hoverpause: true,
        animationDuration: 700,
        breakpoints: {
            1024: { perView: 3 },
            768: { perView: 2 },
            480: { perView: 1 }
        }
    }).mount();
});
