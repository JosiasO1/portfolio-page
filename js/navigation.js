// SPA Navigation System - Flüssige Seitenübergänge
(function() {
    const mainContent = document.querySelector('main');
    const navLinks = document.querySelectorAll('nav a');

    // Page Cache für geladene Seiten
    const pageCache = new Map();

    async function loadPage(url, pushState = true) {
        try {
            // Fade-out Animation starten
            mainContent.classList.add('page-transitioning');

            // Prüfen ob Seite im Cache ist
            let html;
            if (pageCache.has(url)) {
                html = pageCache.get(url);
            } else {
                // Seite vom Server laden
                const response = await fetch(url);
                html = await response.text();

                // Im Cache speichern
                pageCache.set(url, html);
            }

            // Main-Content aus geladenem HTML extrahieren
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newMain = doc.querySelector('main');

            // Warten auf Fade-out Animation (300ms)
            await new Promise(resolve => setTimeout(resolve, 300));

            // Main-Content ersetzen
            if (newMain) {
                mainContent.innerHTML = newMain.innerHTML;
                mainContent.className = newMain.className;
            }

            // Navigation aktualisieren
            updateActiveNavLink(url);

            // History State aktualisieren
            if (pushState) {
                window.history.pushState({ url }, '', url);
            }

            // Slide Animation für neue Seite starten
            mainContent.style.transform = 'translateY(30px)';
            mainContent.style.opacity = '0';

            // Animation ausführen
            requestAnimationFrame(() => {
                mainContent.style.transition = 'transform 0.7s ease-out, opacity 0.7s ease-out';
                mainContent.style.transform = 'translateY(0)';
                mainContent.style.opacity = '1';
            });

            // Custom Event NACH DOM-Update auslösen
            requestAnimationFrame(() => {
                window.dispatchEvent(new CustomEvent('pageContentLoaded'));
            });

            // Cleanup nach Animation
            setTimeout(() => {
                mainContent.style.transition = '';
                mainContent.classList.remove('page-transitioning');
                mainContent.classList.add('page-loaded');
            }, 700);

            // Scroll nach oben
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error('Fehler beim Laden der Seite:', error);
            // Bei Fehler normale Navigation durchführen
            window.location.href = url;
        }
    }

    function updateActiveNavLink(url) {
        const filename = url.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === filename ||
                (filename === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Navigation Links abfangen
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.getAttribute('href');

            // Nicht neu laden wenn bereits auf der Seite
            if (link.classList.contains('active')) {
                return;
            }

            loadPage(url);
        });
    });

    // Browser Back/Forward Buttons unterstützen
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.url) {
            loadPage(e.state.url, false);
        }
    });

    // Initial State setzen
    window.history.replaceState({ url: window.location.pathname }, '', window.location.pathname);

    // Aktiven Link beim Laden markieren
    updateActiveNavLink(window.location.pathname);

    // Initiale Animation
    mainContent.classList.add('page-loaded');
})();
