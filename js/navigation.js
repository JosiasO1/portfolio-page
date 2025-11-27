// Simple Navigation - Normale Seitennavigation mit aktiver Link-Markierung
(function() {
    const navLinks = document.querySelectorAll('nav a');

    function updateActiveNavLink() {
        // Aktuellen Dateinamen aus URL ermitteln
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');

            // Link als aktiv markieren, wenn er zur aktuellen Seite gehört
            if (linkHref === currentPage ||
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === 'index.html' && linkHref === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Beim Laden der Seite aktiven Link markieren
    updateActiveNavLink();

    console.log('✅ Navigation initialized (normal mode)');
})();
