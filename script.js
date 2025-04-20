// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                 (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the saved theme
body.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', newTheme);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // Handle project page links differently
        if (targetId.startsWith('#project-')) {
            showProjectPage(targetId);
            return;
        }
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav item
            updateActiveNav(targetId);
        }
    });
});

// Show project page
function showProjectPage(projectId) {
    // Hide all project pages
    document.querySelectorAll('.project-page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Hide main content
    document.getElementById('main-content').style.display = 'none';
    
    // Show the selected project page
    const projectPage = document.querySelector(projectId);
    if (projectPage) {
        projectPage.style.display = 'block';
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Back to portfolio functionality
document.addEventListener('click', function(e) {
    if (e.target && e.target.matches('a[href="#portfolio"]')) {
        // Show main content
        document.getElementById('main-content').style.display = 'block';
        
        // Hide all project pages
        document.querySelectorAll('.project-page').forEach(page => {
            page.style.display = 'none';
        });
        
        // Scroll to portfolio
        const portfolioSection = document.querySelector('#portfolio');
        if (portfolioSection) {
            window.scrollTo({
                top: portfolioSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
});

// Page navigation dots
const pageNavItems = document.querySelectorAll('.page-nav-item');

pageNavItems.forEach(item => {
    item.addEventListener('click', function() {
        const sectionId = '#' + this.getAttribute('data-section');
        const section = document.querySelector(sectionId);
        
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav item based on scroll position
function updateActiveNav(targetId) {
    // Update navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
    
    // Update page nav dots
    const sectionName = targetId.substring(1);
    pageNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionName) {
            item.classList.add('active');
        }
    });
}

// Scroll animation
function animateOnScroll() {
    const aboutImg = document.querySelector('.about-img');
    const aboutContent = document.querySelector('.about-content');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // About section animation
    if (isInViewport(aboutImg)) {
        aboutImg.classList.add('animate');
        aboutContent.classList.add('animate');
        
        // Animate skill bars
        document.querySelectorAll('.skill-progress').forEach(bar => {
            bar.style.width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
        });
    }
    
    // Portfolio items animation
    portfolioItems.forEach((item, index) => {
        if (isInViewport(item)) {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 200);
        }
    });
}

// Check if element is in viewport
function isInViewport(element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Update active section on scroll
function handleScroll() {
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    updateActiveNav(currentSection);
    animateOnScroll();
}

// Initialize
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', () => {
    handleScroll();
    animateOnScroll();
});
// Add to script.js
const menuToggle = document.createElement('div');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav').appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});
