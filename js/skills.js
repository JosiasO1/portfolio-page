// GLOBALE SKILL-FILTER FUNKTIONEN
if (!window.skillFilterInitialized) {
    window.skillFilterInitialized = true;

    window.filterSkills = function(category) {
        const skillBadges = document.querySelectorAll('.skill-badge');
        skillBadges.forEach(badge => {
            const badgeCategory = badge.getAttribute('data-category');
            if (category === 'all' || badgeCategory === category) {
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        });
    };

    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('skill-filter-btn')) {
            document.querySelectorAll('.skill-filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            const filterValue = e.target.getAttribute('data-filter');
            window.filterSkills(filterValue);
        }
    });
}
