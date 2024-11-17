// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Service Tabs
class ServiceTabs {
    constructor() {
        this.tabContainer = document.querySelector('.service-tabs');
        this.tabs = this.tabContainer?.querySelectorAll('.tab');
        this.contents = this.tabContainer?.querySelectorAll('.tab-content');
        
        if (this.tabContainer) {
            this.init();
        }
    }

    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.target;
                this.switchTab(target);
            });
        });
    }

    switchTab(target) {
        this.tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.target === target);
        });

        this.contents.forEach(content => {
            content.classList.toggle('active', content.id === target);
        });
    }
}

// Initialize features
new ServiceTabs();

// Statistics Counter
function startCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Start counters when they come into view
const counterElements = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
});

counterElements.forEach(element => counterObserver.observe(element)); 