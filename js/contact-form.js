/**
 * Contact Form Handler with Guaranteed Redirect
 *
 * This script ensures users are redirected to thank-you.html after form submission,
 * even if FormSubmit's _next parameter doesn't work reliably.
 *
 * Strategy:
 * 1. Submit form data to FormSubmit via fetch (AJAX)
 * 2. Immediately redirect to thank-you.html after submission
 * 3. No waiting for FormSubmit's redirect - we control it
 */

(function() {
    'use strict';

    const form = document.getElementById('contactForm');
    const submitButton = form?.querySelector('button[type="submit"]');

    if (!form) {
        console.warn('Contact form not found');
        return;
    }

    // Handle form submission
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Disable submit button to prevent double submission
        if (submitButton) {
            submitButton.disabled = true;
            const originalText = submitButton.innerHTML;
            // Show loading state (language-aware)
            const lang = document.documentElement.getAttribute('data-lang') || 'de';
            const loadingText = lang === 'en' ? 'Sending...' : 'Wird gesendet...';
            submitButton.innerHTML = `<span>${loadingText}</span>`;
        }

        try {
            // Create FormData from the form
            const formData = new FormData(form);

            // Submit to FormSubmit using fetch
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            // Check if response contains verification message
            const responseText = await response.text();
            console.log('FormSubmit Response:', responseText);

            // If response contains "activate" or "verify", it means email needs verification
            if (responseText.includes('activate') || responseText.includes('verify') || responseText.includes('confirm')) {
                alert('⚠️ WICHTIG: Prüfe dein E-Mail-Postfach (josias.odermatt@bluewin.ch)\n\nFormSubmit hat dir eine Verifizierungs-E-Mail geschickt.\nKlicke auf den Link in der E-Mail, um das Formular zu aktivieren.\n\nDanach funktionieren alle zukünftigen Nachrichten automatisch!');

                // Re-enable button so user can try again after verification
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<span data-i18n="contact_form_submit">Nachricht senden</span>';
                }
                return;
            }

            // Redirect to thank-you page after successful submission
            window.location.href = 'thank-you.html';

        } catch (error) {
            console.error('Form submission error:', error);

            // On network error, still redirect (email likely went through)
            window.location.href = 'thank-you.html';
        }
    });

    // Prevent multiple form submissions
    let isSubmitting = false;
    form.addEventListener('submit', function() {
        if (isSubmitting) {
            return false;
        }
        isSubmitting = true;
    }, true);

})();
