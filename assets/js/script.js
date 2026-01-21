document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation ---
    const nav = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll Effect (Hide/Show Navbar & Shadow)
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 10) {
            nav.style.boxShadow = '0 10px 30px -10px rgba(2,12,27,0.7)';
            nav.style.height = 'var(--nav-scroll-height)';
        } else {
            nav.style.boxShadow = 'none';
            nav.style.height = 'var(--nav-height)';
        }

        lastScroll = currentScroll;
    });

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animate Hamburger
        const bars = mobileMenuBtn.querySelectorAll('.bar');
        if (navMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            // Reset Hamburger
            const bars = mobileMenuBtn.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });


    // --- Hero Typing Effect ---
    const textToType = "Performance Media Buyer building end-to-end systems — from website to scale.";
    const elementToType = document.querySelector('h2.big-heading.slate');
    let typeIndex = 0;

    // Clear initial content (in case HTML has it)
    elementToType.textContent = "";

    function typeWriter() {
        if (typeIndex < textToType.length) {
            elementToType.textContent += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 50); // Typing speed
        }
    }

    // Start typing after a slight delay
    setTimeout(typeWriter, 1000);





    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => {
        sec.style.opacity = '0';
        sec.style.transform = 'translateY(20px)';
        sec.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(sec);
    });

    // Stats Counter Animation
    const statsSection = document.querySelector('.internal-stats');
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !counted) {
            counted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16);

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString() + "+"; // Added + sign here dynamically too if needed, but HTML has it. HTML has span, so just number here.
                        // Actually HTML has <span class="plus">+</span> separately, so just number is fine.
                        counter.innerText = target.toLocaleString();
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // CSS for reveal
    const style = document.createElement('style');
    style.innerHTML = `
        .in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);





    // --- Behance Preview Mock Data ---
    const projectsGrid = document.getElementById('behance-projects');
    if (projectsGrid) {
        const mockProjects = [
            {
                title: "Examples of Landing Pages",
                category: "Web Design & Funnels",
                // Using a gradient placeholder
                color: "linear-gradient(45deg, #112240, #64ffda)"
            }
        ];

        mockProjects.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('project-card');

            card.innerHTML = `
                <div class="project-img-thumb" style="background: ${project.color}; position: relative;">
                    <i class="fab fa-behance" style="font-size: 3rem; color: rgba(255,255,255,0.1);"></i>
                </div>
                <div class="project-info">
                    <h3 class="project-title-small">${project.title}</h3>
                    <span class="project-cat">${project.category}</span>
                </div>
            `;

            // Link entire card to Behance
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open('https://www.behance.net/karimbdk', '_blank');
            });

            projectsGrid.appendChild(card);
        });
    }
    // const contactForm = document.getElementById('contact-form');
    // contactForm.addEventListener('submit', (e) => {
    //     // Allow default form submission to Formspree
    // });

    // --- Canvas Particles ---
    // --- Financial Growth Background Animation ---
    const canvasContainer = document.getElementById('particles-js');
    if (canvasContainer) {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        canvasContainer.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        // Symbols representing growth, revenue, and scale
        const symbols = ['$', '$$', '+30%', '+150%', 'ROI', 'SCALE', '5x', '↗', '7k+'];

        function resize() {
            width = canvas.width = canvasContainer.offsetWidth;
            height = canvas.height = canvasContainer.offsetHeight;
        }

        function createParticles() {
            particles = [];
            const count = Math.floor(width * 0.03); // Slightly less dense to not clutter
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    text: symbols[Math.floor(Math.random() * symbols.length)],
                    size: Math.random() * 14 + 10, // Bigger text
                    speed: Math.random() * 1 + 0.5, // Different speeds
                    opacity: Math.random() * 0.15 + 0.05 // Subtle opacity
                });
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                // Move Upwards
                p.y -= p.speed;

                // Reset if off screen
                if (p.y < -50) {
                    p.y = height + 50;
                    p.x = Math.random() * width;
                    p.text = symbols[Math.floor(Math.random() * symbols.length)]; // Randomize again
                }

                // Draw Text
                ctx.fillStyle = '#64ffda'; // Green theme color
                ctx.font = `${p.size}px "Fira Code", monospace`;
                ctx.globalAlpha = p.opacity;
                ctx.fillText(p.text, p.x, p.y);
            });

            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });

        resize();
        createParticles();
        animateParticles();
    }
});
