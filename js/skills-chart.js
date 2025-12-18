/**
 * Skills Radar Chart Visualization
 * Displays technical skills as an interactive radar chart using Chart.js
 * Features: i18n support, responsive design, smooth animations
 */

(function() {
    let skillsChart = null;

    /**
     * Skills data structure with proficiency levels (0-100)
     */
    const skillsData = {
        de: {
            labels: ['HTML & CSS', 'JavaScript', 'Python', 'SQL', 'Git & GitHub', 'UI/UX Design', 'REST APIs', 'Figma'],
            datasetLabel: 'Kompetenzniveau'
        },
        en: {
            labels: ['HTML & CSS', 'JavaScript', 'Python', 'SQL', 'Git & GitHub', 'UI/UX Design', 'REST APIs', 'Figma'],
            datasetLabel: 'Proficiency Level'
        }
    };

    // Proficiency levels (0-100) for each skill
    const proficiencyLevels = [85, 75, 70, 65, 80, 75, 70, 70];

    /**
     * Create or update the radar chart
     */
    function createSkillsChart(lang = 'de') {
        const canvas = document.getElementById('skillsRadarChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const data = skillsData[lang] || skillsData.de;

        // Destroy existing chart if it exists
        if (skillsChart) {
            skillsChart.destroy();
        }

        // Create new chart
        skillsChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: data.datasetLabel,
                    data: proficiencyLevels,
                    backgroundColor: 'rgba(0, 122, 255, 0.15)',
                    borderColor: 'rgba(0, 122, 255, 0.8)',
                    borderWidth: 2,
                    pointBackgroundColor: '#007aff',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointHoverBackgroundColor: '#0051d5',
                    pointHoverBorderColor: '#ffffff',
                    pointHoverBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
                layout: {
                    padding: {
                        top: 20,
                        bottom: 20
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            display: true,
                            font: {
                                size: 11,
                                family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                            },
                            color: '#6e6e73',
                            backdropColor: 'transparent'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.08)',
                            lineWidth: 1
                        },
                        pointLabels: {
                            font: {
                                size: 13,
                                weight: '500',
                                family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                            },
                            color: '#1d1d1f',
                            padding: 12
                        },
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.08)',
                            lineWidth: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 13,
                                weight: '500',
                                family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                            },
                            color: '#1d1d1f',
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        titleFont: {
                            size: 13,
                            weight: '600',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                        },
                        bodyFont: {
                            size: 12,
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                        },
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.r + '%';
                            }
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                },
                interaction: {
                    mode: 'point',
                    intersect: true
                }
            }
        });

        console.log('✅ Skills Radar Chart created successfully');
    }

    /**
     * Update chart when language changes
     */
    function updateChartLanguage() {
        const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'de';
        createSkillsChart(currentLang);
    }

    /**
     * Initialize chart when DOM is ready
     */
    function initSkillsChart() {
        // Wait for i18n to be ready
        if (document.documentElement.classList.contains('i18n-ready')) {
            const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'de';
            createSkillsChart(currentLang);
        } else {
            // Wait for i18n to be ready
            const checkReady = setInterval(() => {
                if (document.documentElement.classList.contains('i18n-ready')) {
                    clearInterval(checkReady);
                    const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'de';
                    createSkillsChart(currentLang);
                }
            }, 100);
        }

        // Listen for language change events
        window.addEventListener('languageChanged', updateChartLanguage);

        console.log('✅ Skills Chart module initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSkillsChart);
    } else {
        initSkillsChart();
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
        if (skillsChart) {
            skillsChart.destroy();
        }
    });
})();
