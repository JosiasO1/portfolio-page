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

// Timeline-Interaktionen (falls Timeline vorhanden)
function initTimelineInteractions() {
    const stations = document.querySelectorAll('.timeline-station');
    const infoBox = document.getElementById('timelineInfoBox');
    const infoTitle = document.getElementById('infoBoxTitle');
    const infoPeriod = document.getElementById('infoBoxPeriod');
    const infoCompany = document.getElementById('infoBoxCompany');
    const infoDescription = document.getElementById('infoBoxDescription');

    if (!infoBox || stations.length === 0) {
        console.log('ℹ️ No timeline found on this page');
        return;
    }

    console.log(`✓ Timeline found with ${stations.length} stations`);

    stations.forEach(station => {
        // Add cursor pointer style
        station.style.cursor = 'pointer';

        station.onclick = function(e) {
            e.preventDefault();

            // Remove active class from all stations
            document.querySelectorAll('.timeline-station').forEach(s => {
                s.classList.remove('station-active');
            });

            // Add active class to clicked station
            this.classList.add('station-active');

            // Get data from attributes
            const title = this.dataset.title || '';
            const period = this.dataset.period || '';
            const company = this.dataset.company || '';
            const description = this.dataset.description || '';

            // Update info box content
            infoTitle.textContent = title;
            infoPeriod.textContent = period;
            infoCompany.textContent = company;
            infoDescription.textContent = description;

            // Show info box with animation
            infoBox.classList.add('visible');

            // Scroll info box into view smoothly
            setTimeout(() => {
                infoBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 150);

            console.log('✓ Timeline station clicked:', title);
        };
    });

    console.log('✓ Timeline click handlers attached');
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
