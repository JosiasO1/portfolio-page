/**
 * Quote of the Day - ZenQuotes API Integration with localStorage Caching
 * Displays a daily motivational quote on the homepage
 * Caches quotes for 24h to avoid unnecessary API calls
 */

(function() {
    const quoteCard = document.getElementById('quoteOfDay');

    if (!quoteCard) {
        console.log('ℹ️ Quote of the Day element not found on this page');
        return;
    }

    const loadingElement = quoteCard.querySelector('.quote-loading');
    const contentElement = quoteCard.querySelector('.quote-content');
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');

    // Fallback quote (shown immediately on first load)
    const FALLBACK_QUOTE = {
        text: '"Das Leben ist zu kurz, um nicht seinen Leidenschaften zu folgen."',
        author: 'Unbekannt'
    };

    const API_TIMEOUT = 2500; // 2.5 seconds

    // Get today's date as cache key
    function getTodayKey() {
        const today = new Date();
        return `dailyQuote:${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    }

    // Show quote immediately (no loading spinner)
    function displayQuote(text, author) {
        quoteText.textContent = text;
        quoteAuthor.textContent = `— ${author}`;
        loadingElement.style.display = 'none';
        contentElement.style.display = 'block';
        contentElement.style.animation = 'fadeInUp 0.6s ease-out forwards';
    }

    // Fetch quote with timeout
    async function fetchQuoteWithTimeout() {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

        try {
            const response = await fetch(
                'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://zenquotes.io/api/today'),
                { signal: controller.signal }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.length > 0) {
                return {
                    text: `"${data[0].q}"`,
                    author: data[0].a
                };
            }

            return null;

        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                console.warn('⏱️ Quote API timeout after 2.5s');
            } else {
                console.error('❌ Error fetching quote:', error);
            }

            return null;
        }
    }

    // Main function
    async function initQuoteOfDay() {
        const cacheKey = getTodayKey();
        const cachedQuote = localStorage.getItem(cacheKey);

        // 1️⃣ Check cache first - instant display
        if (cachedQuote) {
            try {
                const quote = JSON.parse(cachedQuote);
                displayQuote(quote.text, quote.author);
                console.log('✅ Quote loaded from cache (instant)');
                return;
            } catch (e) {
                console.warn('⚠️ Invalid cache data, fetching new quote');
            }
        }

        // 2️⃣ No cache: Show fallback immediately (no loading spinner)
        displayQuote(FALLBACK_QUOTE.text, FALLBACK_QUOTE.author);
        console.log('📝 Fallback quote displayed (instant)');

        // 3️⃣ Try to fetch fresh quote in background
        const freshQuote = await fetchQuoteWithTimeout();

        if (freshQuote) {
            // Update display with fresh quote
            displayQuote(freshQuote.text, freshQuote.author);

            // Save to cache
            localStorage.setItem(cacheKey, JSON.stringify(freshQuote));
            console.log('✅ Fresh quote fetched and cached:', freshQuote.text);
        } else {
            console.log('ℹ️ Using fallback quote (API unavailable)');
        }
    }

    // Start non-blocking
    initQuoteOfDay();

    console.log('✅ Quote of the Day initialized');
})();
