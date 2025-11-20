// Page Load Animation - Sofort ausführen
document.documentElement.classList.add('page-loading');

// Page Load Animation - Klasse nach Animation entfernen
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.remove('page-loading');
    }, 700);
});
