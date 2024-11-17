class ProjectSlider {
    constructor() {
        this.slider = document.querySelector('.project-slider');
        this.projects = [
            {
                title: 'Solar Power Plant',
                description: '2MW base load solar power plant in Katanga',
                image: 'images/projects/energy/solar-plant.jpg',
                category: 'Energy'
            },
            {
                title: 'Gemstone Mining',
                description: 'Community partnership in Kambove territory',
                image: 'images/projects/mining/gemstone-mining.jpg',
                category: 'Mining'
            },
            // Add more projects here
        ];
        
        this.currentSlide = 0;
        this.init();
    }

    init() {
        this.createSlider();
        this.createControls();
        this.startAutoPlay();
    }

    createSlider() {
        this.slider.innerHTML = `
            <div class="slider-container">
                <div class="slider-track">
                    ${this.projects.map(project => this.createSlide(project)).join('')}
                </div>
                <div class="slider-dots"></div>
            </div>
        `;

        // Create dots
        const dotsContainer = this.slider.querySelector('.slider-dots');
        this.projects.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    createSlide(project) {
        return `
            <div class="slider-slide">
                <div class="project-card">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="project-info">
                        <span class="project-category">${project.category}</span>
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                    </div>
                </div>
            </div>
        `;
    }

    createControls() {
        const prevButton = document.createElement('button');
        prevButton.className = 'slider-control prev';
        prevButton.innerHTML = '&#10094;';
        prevButton.addEventListener('click', () => this.prevSlide());

        const nextButton = document.createElement('button');
        nextButton.className = 'slider-control next';
        nextButton.innerHTML = '&#10095;';
        nextButton.addEventListener('click', () => this.nextSlide());

        this.slider.appendChild(prevButton);
        this.slider.appendChild(nextButton);
    }

    goToSlide(index) {
        this.currentSlide = index;
        const track = this.slider.querySelector('.slider-track');
        track.style.transform = `translateX(-${index * 100}%)`;

        // Update dots
        const dots = this.slider.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.projects.length) % this.projects.length;
        this.goToSlide(this.currentSlide);
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.projects.length;
        this.goToSlide(this.currentSlide);
    }

    startAutoPlay() {
        setInterval(() => this.nextSlide(), 5000);
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectSlider();
}); 