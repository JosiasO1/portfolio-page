/**
 * Timeline i18n Integration
 * Makes timeline popups translatable
 */

(function() {
    let lastClickedStation = null;

    /**
     * Update timeline popup with current language
     */
    function updateTimelinePopup() {
        if (!lastClickedStation) return;

        const translations = window.getTranslations();
        if (!translations) return;

        const stationNumber = lastClickedStation.dataset.station;
        if (!stationNumber) return;

        const infoTitle = document.getElementById('infoBoxTitle');
        const infoPeriod = document.getElementById('infoBoxPeriod');
        const infoCompany = document.getElementById('infoBoxCompany');
        const infoDescription = document.getElementById('infoBoxDescription');

        if (infoTitle && translations[`timeline_station${stationNumber}_title`]) {
            infoTitle.textContent = translations[`timeline_station${stationNumber}_title`];
        }
        if (infoPeriod && translations[`timeline_station${stationNumber}_period`]) {
            infoPeriod.textContent = translations[`timeline_station${stationNumber}_period`];
        }
        if (infoCompany && translations[`timeline_station${stationNumber}_company`]) {
            infoCompany.textContent = translations[`timeline_station${stationNumber}_company`];
        }
        if (infoDescription && translations[`timeline_station${stationNumber}_desc`]) {
            infoDescription.textContent = translations[`timeline_station${stationNumber}_desc`];
        }
    }

    /**
     * Attach click handlers to timeline items
     */
    function attachTimelineHandlers() {
        const items = document.querySelectorAll('.timeline-item');
        const infoBox = document.getElementById('timelineInfoBox');

        if (!infoBox || items.length === 0) {
            return;
        }

        items.forEach((item, index) => {
            // Add station number as data attribute (1-indexed)
            item.dataset.station = (index + 1).toString();

            item.addEventListener('click', function() {
                lastClickedStation = this;

                // Remove active class from all items
                document.querySelectorAll('.timeline-item').forEach(i => {
                    i.classList.remove('item-active');
                });

                // Add active class to clicked item
                this.classList.add('item-active');

                // Update popup with current language
                updateTimelinePopup();

                // Show info box with animation
                infoBox.classList.add('visible');

                // Scroll info box into view smoothly
                setTimeout(() => {
                    infoBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 150);
            });
        });

        console.log('✅ Timeline i18n handlers attached');
    }

    /**
     * Listen for language changes and update timeline popup
     */
    function init() {
        // Attach handlers when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', attachTimelineHandlers);
        } else {
            attachTimelineHandlers();
        }

        // Listen for language change events
        window.addEventListener('languageChanged', function() {
            updateTimelinePopup();
        });
    }

    init();
})();
