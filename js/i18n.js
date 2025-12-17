/**
 * i18n (Internationalization) System
 * Handles language switching between German (DE) and English (EN)
 * Stores language preference in localStorage
 */

(function() {
    const STORAGE_KEY = 'portfolio_language';
    const DEFAULT_LANG = 'de';
    let currentLanguage = DEFAULT_LANG;
    let translations = {};

    // Initialize global cache
    if (!window.__i18nCache) {
        window.__i18nCache = {};
    }

    /**
     * Load translation JSON file for given language
     */
    async function loadTranslations(lang) {
        // Check cache first
        if (window.__i18nCache[lang]) {
            translations = window.__i18nCache[lang];
            console.log(`✅ Loaded ${lang} translations from cache`);
            return true;
        }

        // Fetch from server
        try {
            const response = await fetch(`lang/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${lang}.json`);
            }
            translations = await response.json();

            // Store in cache
            window.__i18nCache[lang] = translations;

            return true;
        } catch (error) {
            console.error(`Error loading translations for ${lang}:`, error);
            return false;
        }
    }

    /**
     * Apply translations to all elements with data-i18n attribute
     */
    function applyTranslations() {
        // Standard text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                // Check if element has a placeholder attribute (for inputs)
                if (element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[key]);
                } else {
                    element.textContent = translations[key];
                }
            }
        });

        // Placeholder-specific (for inputs/textareas without data-i18n)
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[key]) {
                element.setAttribute('placeholder', translations[key]);
            }
        });

        // HTML content (use sparingly, only where needed)
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            if (translations[key]) {
                element.innerHTML = translations[key];
            }
        });
    }

    /**
     * Get current language
     */
    function getCurrentLanguage() {
        return currentLanguage;
    }

    /**
     * Get all translations for current language
     */
    function getTranslations() {
        return translations;
    }

    /**
     * Update active language indicator in UI
     */
    function updateLanguageUI(lang) {
        document.querySelectorAll('.lang-switch span').forEach(span => {
            const spanLang = span.getAttribute('data-lang');
            if (spanLang === lang) {
                span.classList.add('active');
            } else {
                span.classList.remove('active');
            }
        });
    }

    /**
     * Update HTML lang attribute
     */
    function updateHtmlLang(lang) {
        document.documentElement.setAttribute('lang', lang);
    }

    /**
     * Set language and apply translations
     */
    async function setLanguage(lang) {
        // Validate language
        if (lang !== 'de' && lang !== 'en') {
            console.warn(`Invalid language: ${lang}. Falling back to ${DEFAULT_LANG}`);
            lang = DEFAULT_LANG;
        }

        currentLanguage = lang;

        // Load translations
        const success = await loadTranslations(lang);
        if (!success) {
            console.error(`Failed to set language to ${lang}`);
            return;
        }

        // Apply translations
        applyTranslations();

        // Update UI
        updateLanguageUI(lang);
        updateHtmlLang(lang);

        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, lang);

        // Mark translations as ready (removes i18n-loading, adds i18n-ready)
        document.documentElement.classList.remove('i18n-loading');
        document.documentElement.classList.add('i18n-ready');

        // Dispatch event for other scripts to react to language change
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { lang: lang, translations: translations }
        }));

        console.log(`✅ Language set to: ${lang.toUpperCase()}`);
    }

    /**
     * Get saved language from localStorage or use default
     */
    function getSavedLanguage() {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved || DEFAULT_LANG;
    }

    /**
     * Initialize language system
     */
    async function initLanguage() {
        const savedLang = getSavedLanguage();
        await setLanguage(savedLang);

        // Attach click handlers to language switcher
        document.querySelectorAll('.lang-switch span').forEach(span => {
            span.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                setLanguage(lang);
            });
        });

        console.log('✅ i18n system initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguage);
    } else {
        initLanguage();
    }

    // Expose API globally
    window.setLanguage = setLanguage;
    window.getCurrentLanguage = getCurrentLanguage;
    window.getTranslations = getTranslations;
})();
