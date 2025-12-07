/**
 * Spotify Player Toggle
 * Handles the display of Spotify playlist embed on Über mich page
 */

(function() {
    // Check if we're on the Über mich page
    const musikBtn = document.getElementById("musik-button");
    const container = document.getElementById("spotify-container");

    if (!musikBtn || !container) {
        console.log('ℹ️ Spotify player elements not found on this page');
        return;
    }

    musikBtn.addEventListener("click", () => {
        // If the player hasn't been inserted yet, add the iframe
        if (container.innerHTML.trim() === "") {
            container.innerHTML = `
                <iframe data-testid="embed-iframe"
                        style="border-radius:12px"
                        src="https://open.spotify.com/embed/playlist/6m9PPqb4kF9Na8wGhqEjwd?utm_source=generator"
                        width="100%"
                        height="650"
                        frameborder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy">
                </iframe>
            `;
            console.log('✅ Spotify player loaded');
        }

        // Toggle visibility
        const isHidden = container.style.display === "none" || container.style.display === "";
        container.style.display = isHidden ? "block" : "none";

        // Update button text
        musikBtn.textContent = isHidden ? "🎧 Player ausblenden" : "🎧 Meine Playlist anhören";

        console.log(`🎵 Spotify player ${isHidden ? 'shown' : 'hidden'}`);
    });

    console.log('✅ Spotify player initialized');
})();
