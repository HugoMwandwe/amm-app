document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const successPopup = document.getElementById('successPopup');
    const closeBtn = successPopup.querySelector('.btn-close');
    let canClose = false;

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show popup
            successPopup.classList.add('active');
            
            // Disable close button initially
            closeBtn.style.opacity = '0.5';
            closeBtn.style.cursor = 'not-allowed';
            
            // Reset form
            contactForm.reset();

            // After 3 seconds, allow popup to be closed
            setTimeout(() => {
                canClose = true;
                closeBtn.style.opacity = '1';
                closeBtn.style.cursor = 'pointer';
                
                // Optional: Add a visual indicator that the button is now clickable
                closeBtn.classList.add('ready');
            }, 3000);

            // Optional: Automatically close after 5 seconds
            setTimeout(() => {
                if (successPopup.classList.contains('active')) {
                    successPopup.classList.remove('active');
                    canClose = false;
                }
            }, 5000);
        });
    }

    // Close popup when close button is clicked
    closeBtn.addEventListener('click', function() {
        if (canClose) {
            successPopup.classList.remove('active');
            canClose = false;
        }
    });

    // Close popup when clicking outside
    successPopup.addEventListener('click', function(e) {
        if (e.target === successPopup && canClose) {
            successPopup.classList.remove('active');
            canClose = false;
        }
    });

    // Close popup when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successPopup.classList.contains('active') && canClose) {
            successPopup.classList.remove('active');
            canClose = false;
        }
    });
}); 