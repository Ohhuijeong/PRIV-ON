function scrollActive(section) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(section);
}


document.querySelectorAll('.scroll-effect').forEach(section => {
    scrollActive(section);
});