document.addEventListener('DOMContentLoaded', function() {
    // About page specific functionality
    // Update copyright year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}); 