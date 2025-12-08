/**
 * Quote of the Day - ZenQuotes API Integration
 * Displays a daily motivational quote on the homepage
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

    async function fetchQuoteOfDay() {
        try {
            console.log('📡 Fetching Quote of the Day...');

            // Try ZenQuotes API with CORS proxy
            const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://zenquotes.io/api/today'));

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.length > 0) {
                const quote = data[0];

                // Update quote content
                quoteText.textContent = `"${quote.q}"`;
                quoteAuthor.textContent = `— ${quote.a}`;

                // Hide loading, show content with animation
                setTimeout(() => {
                    loadingElement.style.display = 'none';
                    contentElement.style.display = 'block';
                    contentElement.style.animation = 'fadeInUp 0.6s ease-out forwards';

                    console.log('✅ Quote of the Day loaded:', quote.q);
                }, 500);
            }

        } catch (error) {
            console.error('❌ Error fetching Quote of the Day:', error);

            // Show fallback quote on error
            quoteText.textContent = '"Das Leben ist zu kurz, um nicht seinen Leidenschaften zu folgen."';
            quoteAuthor.textContent = '— Unbekannt';

            loadingElement.style.display = 'none';
            contentElement.style.display = 'block';
            contentElement.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    }

    // Fetch quote when page loads
    fetchQuoteOfDay();

    console.log('✅ Quote of the Day initialized');
})();
