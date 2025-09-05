// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initContactForm();
    initFloatingElements();
    initSmoothScrolling();
    initThemeToggle();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        if (window.scrollY > 50) {
            if (isDark) {
                navbar.style.background = 'rgba(26, 26, 26, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        } else {
            if (isDark) {
                navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            navbar.style.boxShadow = 'none';
        }
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Typing animation for hero subtitle
function initTypingAnimation() {
    const typingTexts = document.querySelectorAll('.typing-text');
    let currentIndex = 0;
    let isDeleting = false;
    let currentText = '';
    let typeSpeed = 100;

    function typeWriter() {
        const fullText = typingTexts[currentIndex].textContent;
        
        if (isDeleting) {
            currentText = fullText.substring(0, currentText.length - 1);
            typeSpeed = 50;
        } else {
            currentText = fullText.substring(0, currentText.length + 1);
            typeSpeed = 100;
        }

        // Update the display text
        const displayElement = document.querySelector('.hero-subtitle');
        if (displayElement) {
            displayElement.textContent = currentText;
        }

        if (!isDeleting && currentText === fullText) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % typingTexts.length;
            typeSpeed = 500; // Pause before next text
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typing animation
    if (typingTexts.length > 0) {
        setTimeout(typeWriter, 1000);
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .publication-item, .education-item, .contact-item, .stat-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });
}

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const increment = target / 50;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 30);
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Let the form submit naturally to Formspree
        // Formspree will handle the submission and redirect
    });
    
    // Handle form submission success/error
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    } else if (urlParams.get('error') === 'true') {
        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(element => {
        const speed = element.dataset.speed || 1;
        const randomDelay = Math.random() * 2;
        
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${6 / speed}s`;
        
        // Add mouse interaction
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 1;
        const yPos = -(scrolled * speed * 0.1);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Project card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Skill tag hover effects
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            this.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'none';
        });
    });
});

// Add loading animation to page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Initialize hero elements with hidden state
document.addEventListener('DOMContentLoaded', function() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Project Modal functionality
const projectData = {
    smartsled: {
        title: "SmartSled App",
        icon: "🛷",
        description: "A comprehensive mobile application designed to control and monitor smart sled devices. This innovative solution provides real-time device management, performance tracking, and user-friendly controls for advanced sled technology.",
        features: [
            "Real-time device monitoring and control",
            "Bluetooth Low Energy (BLE) connectivity",
            "Performance analytics and reporting",
            "User-friendly interface design",
            "Offline functionality with data sync",
            "Push notifications for alerts"
        ],
        tech: ["Flutter", "Firebase", "REST APIs", "BLE", "Dart", "Cloud Functions"]
    },
    deepcourses: {
        title: "DeepCourses App",
        icon: "🎓",
        description: "An advanced e-learning platform that provides offline course access with comprehensive control mechanisms. Designed for educational institutions and training organizations to deliver content efficiently.",
        features: [
            "Offline course content access",
            "Advanced access control system",
            "Progress tracking and analytics",
            "Multi-media content support",
            "User management and authentication",
            "Course completion certificates"
        ],
        tech: ["Flutter", "Firebase", "Dart", "Cloud Storage", "Authentication"]
    },
    refit: {
        title: "ReFit App",
        icon: "🏋️",
        description: "A comprehensive fitness tracking application that combines workout planning with AI-powered recommendations. Features intelligent exercise suggestions, progress monitoring, and personalized fitness plans.",
        features: [
            "AI-powered workout recommendations",
            "Personalized fitness plans",
            "Progress tracking and analytics",
            "Exercise demonstration videos",
            "Social features and challenges",
            "Nutrition tracking integration"
        ],
        tech: ["Flutter", "Firebase", "AI/ML", "Dart", "Cloud Functions"]
    },
    wefab: {
        title: "WeFab Platform",
        icon: "🏭",
        description: "The ultimate platform for consumers and businesses to post custom projects in manufacturing and design. Whether you need CNC milling, 3D printing, welding, CAD design, or custom packaging, WeFab helps you connect with skilled professionals and shops across a wide range of fabrication and design services.",
        features: [
            "Post projects with detailed requirements and images",
            "Get quotes from qualified professionals",
            "CNC milling & turning services",
            "3D printing (FDM, SLA, etc.)",
            "Welding, sheet metal, and tube bending",
            "CAD & industrial design services",
            "Waterjet cutting and UV printing",
            "Resin casting, metal casting, and more",
            "Track project progress and communicate in-app",
            "Secure payments and delivery tracking"
        ],
        tech: ["Flutter", "Firebase", "Dart", "Payment Gateway", "Real-time Chat", "File Upload"]
    },
    medicines: {
        title: "Medicines Orders App",
        icon: "💊",
        description: "A lightweight Flutter application for managing medicine orders efficiently, designed for environments without a dedicated database system. Uses Excel spreadsheets as the primary data storage and exchange format, making it ideal for small pharmacies or distributors who rely on Excel workflows.",
        features: [
            "Create, update, and track medicine orders",
            "Excel spreadsheet integration for data storage",
            "User-friendly mobile interface design",
            "XLSX/CSV file read/write capabilities",
            "Order management and tracking system",
            "Ideal for small pharmacies and distributors",
            "No database dependency required",
            "Efficient data exchange format"
        ],
        tech: ["Flutter", "Dart", "Excel Integration", "XLSX/CSV", "Mobile UI", "File Processing"]
    },
    companyapp: {
        title: "Middle East First Responders",
        icon: "🏢",
        description: "A comprehensive platform for companies to display their services and courses. Users can create accounts, subscribe to courses, take exams, and receive auto-generated certificates with full information.",
        features: [
            "Company services and course catalog display",
            "User account creation and management",
            "Course subscription and enrollment system",
            "Interactive online exams and assessments",
            "Auto-generated certificates with full details",
            "Progress tracking and analytics dashboard",
            "Payment processing for course subscriptions",
            "Admin panel for course and user management"
        ],
        tech: ["Next.js", "Express.js", "MySQL", "Authentication", "Payment Gateway", "PDF Generation"]
    },
    erp: {
        title: "ERP System",
        icon: "📊",
        description: "A complete Enterprise Resource Planning (ERP) system with full compliance to Saudi Arabia's ZATCA Phase 2 e-invoicing requirements. Comprehensive business management solution.",
        features: [
            "Complete ERP functionality",
            "ZATCA Phase 2 e-invoicing compliance",
            "Financial management and reporting",
            "Inventory and supply chain management",
            "Customer relationship management",
            "Multi-company and multi-branch support"
        ],
        tech: ["AngularJS", ".NET Framework", "SQL Server", "ZATCA SDK", "Enterprise"]
    },
    pos: {
        title: "POS Web App",
        icon: "🛒",
        description: "A sophisticated multi-branch Point-of-Sale system designed for retail businesses. Features comprehensive sales management, inventory tracking, and multi-location support.",
        features: [
            "Multi-branch sales management",
            "Real-time inventory tracking",
            "Customer management system",
            "Sales reporting and analytics",
            "Payment processing integration",
            "Staff management and permissions"
        ],
        tech: ["Angular", ".NET Core", "SQLite", "SQL Server", "Payment APIs"]
    },
    videoanalytics: {
        title: "AI Video Analytics App",
        icon: "👁️‍🗨️",
        description: "An advanced multi-camera real-time analytics system that provides comprehensive video surveillance with AI-powered detection, tracking, and reporting capabilities.",
        features: [
            "Multi-camera real-time monitoring",
            "AI-powered object detection and tracking",
            "Facial recognition and identification",
            "Behavioral analysis and alerts",
            "Comprehensive reporting dashboard",
            "Scalable cloud architecture"
        ],
        tech: ["Python", "YOLO", "StrongSORT", "InsightFace", "Flask", "PostgreSQL", "OpenCV"]
    },
    cadview: {
        title: "CADView",
        icon: "🏗️",
        description: "A sophisticated 3D CAD viewer and converter that transforms STEP/IGES files into optimized GLB/GLTF formats. Features advanced mesh optimization and 3D visualization capabilities.",
        features: [
            "3D CAD file viewing and manipulation",
            "STEP/IGES to GLB/GLTF conversion",
            "Advanced mesh optimization algorithms",
            "Interactive 3D visualization",
            "File format compatibility",
            "Performance optimization tools"
        ],
        tech: ["Python", "Node.js", "PostgreSQL", "3D Graphics", "File Processing"]
    },
    privacy: {
        title: "Privacy-Preserving Camera Analytics",
        icon: "🔒",
        description: "An innovative AI system that anonymizes individuals in surveillance feeds while maintaining scene utility. Ensures privacy compliance while preserving analytical value.",
        features: [
            "Real-time individual anonymization",
            "Privacy-preserving analytics",
            "Scene utility maintenance",
            "Compliance with privacy regulations",
            "Advanced ID masking techniques",
            "Real-time processing capabilities"
        ],
        tech: ["MATLAB", "Computer Vision", "Privacy Algorithms", "Real-time Processing"]
    }
};

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const project = projectData[projectId];
    
    if (!project) return;
    
    // Update modal content
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalIcon').textContent = project.icon;
    document.getElementById('modalDescription').textContent = project.description;
    
    // Update features list
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Update tech stack
    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = '';
    project.tech.forEach(tech => {
        const span = document.createElement('span');
        span.textContent = tech;
        techContainer.appendChild(span);
    });
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Theme Toggle Functionality
function initThemeToggle() {
    const themeBtn = document.getElementById('themeBtn');
    const themeIcon = document.getElementById('themeIcon');
    const themeMenu = document.getElementById('themeMenu');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Get saved theme or default to 'device'
    let currentTheme = localStorage.getItem('theme') || 'device';
    
    // Apply initial theme
    applyTheme(currentTheme);
    updateThemeIcon(currentTheme);
    updateActiveOption(currentTheme);
    
    // Theme button click handler
    themeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        themeMenu.style.display = themeMenu.style.display === 'block' ? 'none' : 'block';
    });
    
    // Theme option click handlers
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            currentTheme = theme;
            
            // Save theme preference
            localStorage.setItem('theme', theme);
            
            // Apply theme
            applyTheme(theme);
            updateThemeIcon(theme);
            updateActiveOption(theme);
            
            // Close menu
            themeMenu.style.display = 'none';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function() {
        themeMenu.style.display = 'none';
    });
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', function() {
            if (currentTheme === 'device') {
                applyTheme('device');
                updateThemeIcon('device');
            }
        });
    }
}

function applyTheme(theme) {
    const body = document.body;
    
    // Remove existing theme classes
    body.removeAttribute('data-theme');
    
    if (theme === 'light') {
        body.setAttribute('data-theme', 'light');
    } else if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
    } else if (theme === 'device') {
        // Use system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.setAttribute('data-theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
        }
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    
    if (theme === 'light') {
        themeIcon.className = 'fas fa-sun';
    } else if (theme === 'dark') {
        themeIcon.className = 'fas fa-moon';
    } else if (theme === 'device') {
        themeIcon.className = 'fas fa-desktop';
    }
}

function updateActiveOption(theme) {
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.theme === theme) {
            option.classList.add('active');
        }
    });
}
