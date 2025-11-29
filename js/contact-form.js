/**
 * Contact Form Handler
 * Shows success message when redirected from FormSubmit
 */

(function() {
    // Check if we're on the contact page
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('form-success-message');

    if (!contactForm) {
        console.log('ℹ️ Contact form not found on this page');
        return;
    }

    // Check if we were redirected back with success parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        // Hide form and show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Clean up URL (remove ?success=true)
        window.history.replaceState({}, document.title, window.location.pathname);

        console.log('✅ Form submitted successfully');
    }

    console.log('✅ Contact form initialized');
})();
