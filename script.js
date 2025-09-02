// Portfolio Interactive JavaScript
// Author: Brenda Bochaberi

// Wait for DOM to load before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // ============ NAVIGATION FUNCTIONALITY ============
    
    // Mobile menu toggle
    const sidemenu = document.getElementById("sidemenu");
    
    function openmenu() {
        sidemenu.style.right = "0";
    }
    
    function closemenu() {
        sidemenu.style.right = "-200px";
    }
    
    // Make functions global so onclick handlers can access them
    window.openmenu = openmenu;
    window.closemenu = closemenu;
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu after clicking a link
                closemenu();
            }
        });
    });
    
    // ============ TAB FUNCTIONALITY ============
    
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");
    
    function opentab(tabname) {
        // Remove active classes from all tabs and contents
        for (let tablink of tablinks) {
            tablink.classList.remove("active-link");
        }
        for (let tabcontent of tabcontents) {
            tabcontent.classList.remove("active-tab");
        }
        
        // Add active class to clicked tab and corresponding content
        event.currentTarget.classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");
    }
    
    // Make function global for onclick handlers
    window.opentab = opentab;
    
    // ============ FOOTER YEAR UPDATE ============
    
    // Update footer with current year
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
    
    // ============ TYPING ANIMATION ============
    
    const typingText = document.querySelector('.header-text h1');
    if (typingText) {
        // Define the text content without HTML tags
        const words = ["Hi,", "I'm", "Brenda Bochaberi", "hybrid", "data", "Scientist"];
        const nameIndex = 2; // Index of "Bochaberi" to apply span styling
        const lineBreakAfter = 2; // Add line break after "Bochaberi"
        
        typingText.innerHTML = '';
        let currentWordIndex = 0;
        
        function typeNextWord() {
            if (currentWordIndex < words.length) {
                const word = words[currentWordIndex];
                let wordToAdd = word;
                
                // Apply span styling to "Brenda Bochaberi"
                if (currentWordIndex === 2) { // "Brenda"
                    wordToAdd = '<span>' + word;
                } else if (currentWordIndex === nameIndex) { // "Bochaberi"
                    wordToAdd = word + '</span>';
                }
                
                // Add the word to the display
                if (currentWordIndex === 0) {
                    typingText.innerHTML = wordToAdd;
                } else {
                    typingText.innerHTML += ' ' + wordToAdd;
                }
                
                // Add line break after "Bochaberi"
                if (currentWordIndex === lineBreakAfter) {
                    typingText.innerHTML += '<br>';
                }
                
                currentWordIndex++;
                setTimeout(typeNextWord, 300); // Delay between words
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeNextWord, 1000);
    }
    
    // ============ SCROLL ANIMATIONS ============
    
    // Add scroll animation for sections
    const sections = document.querySelectorAll('#about, #services, #portfolio, #contact');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollY = window.pageYOffset;
            
            if (scrollY > (sectionTop - windowHeight + 100)) {
                section.classList.add('animate-in');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    
    // ============ SKILL PROGRESS ANIMATION ============
    
    // Animate skill levels when about section comes into view
    const skillsSection = document.getElementById('skills');
    const skillBars = skillsSection ? skillsSection.querySelectorAll('.skill-progress') : [];
    
    function animateSkillBars() {
        const skillsSectionTop = document.getElementById('about').offsetTop;
        const windowHeight = window.innerHeight;
        const scrollY = window.pageYOffset;
        
        if (scrollY > (skillsSectionTop - windowHeight + 200)) {
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                }, index * 300);
            });
            
            // Remove event listener after animation
            window.removeEventListener('scroll', animateSkillBars);
        }
    }
    
    window.addEventListener('scroll', animateSkillBars);
    
    // Also trigger when skills tab is clicked
    const skillsTab = document.querySelector('[onclick="opentab(\'skills\')"]');
    if (skillsTab) {
        skillsTab.addEventListener('click', () => {
            setTimeout(() => {
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width + '%';
                    }, index * 200);
                });
            }, 100);
        });
    }
    
    // ============ PORTFOLIO HOVER EFFECTS ============
    
    const workItems = document.querySelectorAll('.work');
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // ============ CONTACT FORM HANDLING ============
    
    const contactForm = document.querySelector('form[name="submit-to-google-sheet"]');
    const msg = document.getElementById('msg');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('Name');
            const email = formData.get('Email');
            const message = formData.get('Message');
            
            // Basic validation
            if (!name || !email || !message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading message
            showMessage('Sending message...', 'loading');
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                showMessage('Message sent successfully! Thank you for contacting me.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
    
    function showMessage(text, type) {
        msg.innerHTML = text;
        msg.className = type;
        
        // Clear message after 5 seconds
        setTimeout(() => {
            msg.innerHTML = '';
            msg.className = '';
        }, 5000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ============ NAVBAR BACKGROUND ON SCROLL ============
    
    const navbar = document.querySelector('nav');
    const header = document.getElementById('header');
    
    function updateNavbar() {
        const scrollY = window.pageYOffset;
        
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    
    // ============ BACK TO TOP BUTTON ============
    
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button
    function toggleBackToTop() {
        const scrollY = window.pageYOffset;
        
        if (scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', toggleBackToTop);
    
    // ============ PRELOADER (Optional) ============
    
    // Hide preloader after page loads
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
});

// ============ INTERSECTION OBSERVER FOR ANIMATIONS ============

// More modern approach for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.services-list div, .work, .contact-left, .contact-right');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});
