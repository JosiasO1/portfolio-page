/**
 * Spotify Player Toggle
 * Handles the display of Spotify playlist embed on Über mich page
 * Shows 5-6 tracks in list view (not mini player)
 */

(function() {
    // Check if we're on the Über mich page
    const musikBtn = document.getElementById("musik-button");
    const container = document.getElementById("spotify-container");

    if (!musikBtn || !container) {
        console.log('ℹ️ Spotify player elements not found on this page');
        return;
    }

    // Get translated button texts
    function getButtonText(isShown) {
        const lang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'de';
        const translations = window.getTranslations ? window.getTranslations() : {};

        if (isShown) {
            // Player is shown, button should say "hide"
            return lang === 'en' ? "🎧 Hide Player" : "🎧 Player ausblenden";
        } else {
            // Player is hidden, button should say "show/listen"
            return translations.interest_music_btn || "🎧 Meine Playlist anhören";
        }
    }

    musikBtn.addEventListener("click", () => {
        // If the player hasn't been inserted yet, add the iframe
        if (container.innerHTML.trim() === "") {
            // TODO: Replace the playlist ID below with your own Spotify playlist URL/ID
            // Format: https://open.spotify.com/playlist/YOUR_PLAYLIST_ID
            // Current playlist: 6m9PPqb4kF9Na8wGhqEjwd
            //
            // How to get your playlist ID:
            // 1. Open Spotify and go to your playlist
            // 2. Click "..." -> Share -> Copy link to playlist
            // 3. Extract the ID from: https://open.spotify.com/playlist/YOUR_PLAYLIST_ID
            // 4. Replace the ID in the src below

            container.innerHTML = `
                <iframe
                    class="spotify-playlist-embed"
                    style="border-radius:12px"
                    src="https://open.spotify.com/embed/playlist/6m9PPqb4kF9Na8wGhqEjwd?utm_source=generator&theme=0"
                    width="100%"
                    height="520"
                    frameborder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Spotify Playlist Player"
                    aria-label="Spotify Playlist Embed">
                </iframe>
            `;
            console.log('✅ Spotify playlist player loaded (shows 5-6 tracks)');
        }

        // Toggle visibility with smooth transition
        const isHidden = container.style.display === "none" || container.style.display === "";
        container.style.display = isHidden ? "block" : "none";

        // Update button text with i18n support
        musikBtn.textContent = getButtonText(!isHidden);

        console.log(`🎵 Spotify player ${isHidden ? 'shown' : 'hidden'}`);
    });

    console.log('✅ Spotify player initialized');
})();
