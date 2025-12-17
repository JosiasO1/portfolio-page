// Zentrale Initialisierungsfunktion für alle interaktiven Elemente
// Diese Funktion wird bei DOMContentLoaded und nach jedem Page-Transition aufgerufen

function initInteractions() {
    console.log('🔄 Initializing interactions...');

    // 1. Skill-Filter Buttons aktivieren (falls vorhanden)
    initSkillFilters();

    // 2. Timeline-Interaktionen (falls vorhanden)
    initTimelineInteractions();

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

// Timeline-Interaktionen (handled by timeline-i18n.js for proper i18n support)
function initTimelineInteractions() {
    const items = document.querySelectorAll('.timeline-item');
    if (items.length > 0) {
        // Add cursor pointer style
        items.forEach(item => {
            item.style.cursor = 'pointer';
        });
        console.log('ℹ️ Timeline interactions delegated to timeline-i18n.js');
    }
}

// Bei DOMContentLoaded ausführen
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractions);
} else {
    // DOM bereits geladen
    initInteractions();
}
