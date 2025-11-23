// Zentrale Initialisierungsfunktion für alle interaktiven Elemente
// Diese Funktion wird bei DOMContentLoaded und nach jedem Page-Transition aufgerufen

function initInteractions() {
    console.log('🔄 Initializing interactions...');

    // 1. Skill-Filter Buttons aktivieren (falls vorhanden)
    initSkillFilters();

    // 2. Timeline-Interaktionen (falls vorhanden)
    initTimeline();

    // 3. Weitere zukünftige Initialisierungen können hier hinzugefügt werden

    console.log('✅ Interactions initialized');
}

// Skill-Filter Initialisierung
function initSkillFilters() {
    const firstFilterBtn = document.querySelector('.skill-filter-btn');
    if (firstFilterBtn && !firstFilterBtn.classList.contains('active')) {
        firstFilterBtn.classList.add('active');
        console.log('✓ First skill filter button activated');
    }
}

// Timeline-Interaktionen (falls Timeline vorhanden)
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        console.log(`✓ Timeline initialized with ${timelineItems.length} items`);
        // Hier könnten Timeline-spezifische Interaktionen hinzugefügt werden
    }
}

// Bei DOMContentLoaded ausführen
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractions);
} else {
    // DOM bereits geladen
    initInteractions();
}

// Event für Page-Transitions bereitstellen
window.addEventListener('pageContentLoaded', () => {
    console.log('🔄 Page content loaded, reinitializing interactions...');
    initInteractions();
});
