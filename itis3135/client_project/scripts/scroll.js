// scroll.js

document.addEventListener("DOMContentLoaded", () => {
    const sr = ScrollReveal({
        distance: "60px",        // slide distance
        origin: "left",          // slide in from the LEFT
        duration: 1200,
        opacity: 0,              // start invisible
        easing: "ease-out",
        viewFactor: 1.0,         // reveal only when 100% fully visible
        reset: false             // reveal only once
    });

    // Slide-in headers
    sr.reveal("h2", { delay: 150 });
    sr.reveal("h3", { delay: 200 });
    sr.reveal("p", { delay: 250 });

    // Slide-in vendor boxes one at a time
    sr.reveal(".vendor-box", {
        interval: 180,           // staggered sequence
        delay: 200
    });
});