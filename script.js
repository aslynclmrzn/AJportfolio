// ===========================
// Smooth Scrolling at Navigation
// Ang section na ito ay nag-handle ng smooth scrolling kapag nag-click sa nav links
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Pumili ng lahat ng navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Para sa bawat link, mag-add ng click event
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Pigilan ang default behavior
            const targetId = this.getAttribute('href'); // Kunin ang target ID
            const targetSection = document.querySelector(targetId); // Hanapin ang target
            
            // Mag-scroll smoothly sa target section
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth', // Smooth animation
                    block: 'start' // Simulan sa top ng viewport
                });
            }
        });
    });
});

// ===========================
// Contact Form Handling
// Ang section na ito ay nag-process ng form at nag-validate ng data
// ===========================

// Kunin ang contact form
const contactForm = document.getElementById('contactForm');

// Kung may form, mag-add ng submit event
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Pigilan ang default form submission
        
        // Kunin ang form values
        const name = this.querySelector('input[type="text"]').value; // Pangalan
        const email = this.querySelector('input[type="email"]').value; // Email
        const message = this.querySelector('textarea').value; // Message
        
        // Tingnan kung walang laman ang mga fields
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            showNotification('Complete all fields.', 'error');
            return;
        }
        
        // Tingnan kung valid ang email
        if (!isValidEmail(email)) {
            showNotification('Use valid email address.', 'error');
            return;
        }
        
        // Ipakita ang success message
        showNotification('Message sent!', 'success');
        
        // Clear ang form
        this.reset();
        
        // Log ang data
        console.log('Form submitted:', { name, email, message });
    });
}

// ===========================
// Utility Functions - Tulong na Functions
// ===========================

/**
 * Tingnan kung valid ang email format
 * @param {string} email - Ang email na i-check
 * @return {boolean} - True kung valid, false kung hindi
 */
function isValidEmail(email) {
    // Gumagamit ng regex para check ang email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Ipakita ang notification message sa screen
 * @param {string} message - Ang message na ipapakita
 * @param {string} type - Type: 'success' o 'error'
 */
function showNotification(message, type) {
    // Gumawa ng notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Idagdag sa page
    document.body.appendChild(notification);
    
    // Ipakita with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Tanggalin after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===========================
// Scroll Animations
// Ang section na ito ay nag-animate ng elements habang nag-scroll
// ===========================

/**
 * Sumusubaybay sa elements at nag-add ng animation kapag visible na sila
 * Gumagamit ng Intersection Observer para sa better performance
 */
const observerOptions = {
    threshold: 0.1, // Mag-trigger kapag 10% ng element ay visible
    rootMargin: '0px 0px -100px 0px' // Start animation 100px bago makita
};

// Gumawa ng observer instance
const observer = new IntersectionObserver(function(entries) {
    // Para sa bawat observed element
    entries.forEach(entry => {
        // Kung makikita na ang element
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in'); // Mag-add ng animation class
            observer.unobserve(entry.target); // Stop observing (one-time lang)
        }
    });
}, observerOptions);

// Kapag nag-load ang page, i-observe ang lahat ng cards
document.addEventListener('DOMContentLoaded', function() {
    // Pumili ng lahat ng elements na dapat i-animate
    const elementsToObserve = document.querySelectorAll(
        '.project-card, .skill-category, .stat'
    );
    
    // Para sa bawat element, simulan ang observation
    elementsToObserve.forEach(el => observer.observe(el));
});

// ===========================
// Active Navigation Link
// Update ang active link habang nag-scroll ang user
// ===========================

/**
 * I-highlight ang active nav link base sa scroll position
 * Tinutukoy kung aling section ang nakikita at nag-highlight ng corresponding link
 */
window.addEventListener('scroll', function() {
    let current = ''; // Ang current section
    
    // Kunin ang lahat ng sections
    const sections = document.querySelectorAll('section');
    
    // Para sa bawat section, tingnan kung nasa view ba
    sections.forEach(section => {
        const sectionTop = section.offsetTop; // Position ng section
        const sectionHeight = section.clientHeight; // Height ng section
        
        // Kung current scroll ay nasa section na
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id'); // Store ang ID
        }
    });
    
    // Kunin ang lahat ng nav links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Tanggalin ang active class sa lahat
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // I-add active class sa matching link
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Dynamic Content
// Nag-add ng animation delay sa staggered cards
// ===========================

/**
 * Nagdadagdag ng animation delay sa bawat project card
 * Gumagawa ng cascading effect kung saan mag-animate one by one ang cards
 */
document.addEventListener('DOMContentLoaded', function() {
    // Kunin ang lahat ng project cards
    const cards = document.querySelectorAll('.project-card');
    
    // Para sa bawat card, i-set ang animation delay
    cards.forEach((card, index) => {
        // Bawat card ay may 0.1 segundo na gap
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// ===========================
// Mobile Menu
// Para sa mobile navigation functionality
// ===========================

/**
 * Nag-toggle ng mobile menu visibility
 * Ipakita o itago ang mobile menu
 */
function toggleMobileMenu() {
    // Kunin ang nav menu
    const navMenu = document.querySelector('.nav-menu');
    
    // Kung may menu, i-toggle ang active class
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Nag-add ng notification CSS styles
// Lumilikha ng stylesheet para sa notification messages na displayed sa screen
const style = document.createElement('style');
style.textContent = `
    /* Notification styling */
    .notification {
        position: fixed; /* Fixed sa bottom ng screen */
        bottom: -100px; /* Initially hidden */
        left: 50%;
        transform: translateX(-50%); /* Center align */
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 600;
        z-index: 1000;
        transition: bottom 0.3s ease; /* Smooth animation */
        max-width: 90%;
    }
    
    /* Kapag may show class, ipakita */
    .notification.show {
        bottom: 2rem;
    }
    
    /* Success notification - green */
    .notification-success {
        background-color: #10b981;
    }
    
    /* Error notification - red */
    .notification-error {
        background-color: #ef4444;
    }
    
    /* Active navigation link styling */
    .nav-link.active {
        color: #2563eb; /* New color */
        font-weight: 700; /* Bold */
    }
    
    /* Animate in class */
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    /* Fade in animation keyframes */
    @keyframes fadeInUp {
        from {
            opacity: 0; /* Start - transparent */
            transform: translateY(30px); /* Start - slightly lower */
        }
        to {
            opacity: 1; /* End - fully visible */
            transform: translateY(0); /* End - original position */
        }
    }
`;

// Idagdag ang styles sa document head
document.head.appendChild(style);