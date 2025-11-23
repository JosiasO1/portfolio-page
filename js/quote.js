// Zitat des Tages - Quotable API Integration
// Lädt täglich ein inspirierendes Zitat von quotable.io (CORS-freundlich)

(function() {
    const CACHE_KEY = 'dailyquote_cache';
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 Stunden

    // Fallback-Zitate falls API nicht erreichbar
    const FALLBACK_QUOTES = [
        { q: "Der einzige Weg, grossartige Arbeit zu leisten, ist zu lieben, was du tust.", a: "Steve Jobs" },
        { q: "Die Zukunft gehört denen, die an die Schönheit ihrer Träume glauben.", a: "Eleanor Roosevelt" },
        { q: "Der beste Weg, die Zukunft vorherzusagen, ist sie zu erschaffen.", a: "Peter Drucker" },
        { q: "Phantasie ist wichtiger als Wissen, denn Wissen ist begrenzt.", a: "Albert Einstein" },
        { q: "Das Geheimnis des Erfolgs ist anzufangen.", a: "Mark Twain" },
        { q: "Sei du selbst die Veränderung, die du dir wünschst für diese Welt.", a: "Mahatma Gandhi" },
        { q: "Es ist nie zu spät, das zu werden, was du hättest sein können.", a: "George Eliot" }
    ];

    // Zitat basierend auf Tag des Jahres (für Fallback)
    function getFallbackQuote() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const dayOfYear = Math.floor((now - start) / 86400000);
        return FALLBACK_QUOTES[dayOfYear % FALLBACK_QUOTES.length];
    }

    // Cache prüfen
    function getCachedQuote() {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { quote, timestamp } = JSON.parse(cached);
                // Prüfen ob Cache noch gültig (24h)
                if (Date.now() - timestamp < CACHE_DURATION) {
                    return quote;
                }
            }
        } catch (e) {
            console.warn('Cache read error:', e);
        }
        return null;
    }

    // Zitat cachen
    function cacheQuote(quote) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                quote: quote,
                timestamp: Date.now()
            }));
        } catch (e) {
            console.warn('Cache write error:', e);
        }
    }

    // Zitat in DOM anzeigen
    function displayQuote(quote) {
        const textEl = document.getElementById('quote-text');
        const authorEl = document.getElementById('quote-author');

        if (textEl && authorEl) {
            textEl.textContent = `"${quote.q}"`;
            authorEl.textContent = `— ${quote.a}`;
        }
    }

    // Zitat von Quotable API laden
    async function fetchFromAPI() {
        try {
            const response = await fetch('https://api.quotable.io/random?maxLength=150');

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            if (data && data.content && data.author) {
                return {
                    q: data.content,
                    a: data.author
                };
            }
            throw new Error('Invalid response');
        } catch (error) {
            console.warn('Quotable API error:', error.message);
            return null;
        }
    }

    // Hauptfunktion
    async function loadQuote() {
        const textEl = document.getElementById('quote-text');

        // Nur auf Startseite ausführen
        if (!textEl) return;

        // 1. Erst Cache prüfen
        let quote = getCachedQuote();
        if (quote) {
            console.log('📚 Quote from cache');
            displayQuote(quote);
            return;
        }

        // 2. Sofort Fallback anzeigen (kein "Lädt...")
        const fallback = getFallbackQuote();
        displayQuote(fallback);

        // 3. Im Hintergrund API abfragen
        quote = await fetchFromAPI();

        if (quote) {
            console.log('✅ Quote from API');
            displayQuote(quote);
            cacheQuote(quote);
        } else {
            // Fallback cachen für Konsistenz
            console.log('⚠️ Using fallback quote');
            cacheQuote(fallback);
        }
    }

    // Initialisierung
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadQuote);
        } else {
            loadQuote();
        }
    }

    init();

    // SPA Page-Transition Support
    window.addEventListener('pageContentLoaded', loadQuote);
})();
