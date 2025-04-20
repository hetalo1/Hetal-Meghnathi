// Mobile Responsiveness Enhancements

// ====== 1. Create Mobile Menu Elements ======
document.addEventListener('DOMContentLoaded', function() {
  // Create the hamburger menu button
  const menuToggle = document.createElement('div');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
  
  // Find the navigation element and add the menu toggle button
  const nav = document.querySelector('nav');
  const navLinks = document.querySelector('.nav-links');
  nav.insertBefore(menuToggle, navLinks);
  
  // Add click event to toggle the mobile menu
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('show');
    // Change icon based on menu state
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('show')) {
      icon.className = 'fas fa-times';
    } else {
      icon.className = 'fas fa-bars';
    }
  });
  
  // Close mobile menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('show');
        menuToggle.querySelector('i').className = 'fas fa-bars';
      }
    });
  });
  
  // Add CSS for mobile menu
  const style = document.createElement('style');
  style.textContent = `
    /* Mobile Menu Styles */
    .menu-toggle {
      display: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--dark-color);
      z-index: 1000;
    }
    
    @media screen and (max-width: 768px) {
      /* Show menu toggle on mobile */
      .menu-toggle {
        display: block;
      }
      
      /* Hide default nav links */
      .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background: var(--header-bg);
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
        transform: translateY(-150%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: var(--nav-shadow);
        z-index: 999;
      }
      
      /* Show nav links when active */
      .nav-links.show {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
      
      /* Style nav items for mobile */
      .nav-links li {
        margin: 15px 0;
        width: 100%;
        text-align: center;
      }
      
      .nav-links a {
        display: block;
        padding: 10px 0;
        width: 100%;
      }
      
      /* Hero Section Adjustments */
      .hero-content h1 {
        font-size: 2.5rem;
      }
      
      /* About Section Adjustments */
      .about-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      /* Portfolio Items Adjustments */
      .portfolio-grid {
        grid-template-columns: 1fr;
      }
      
      /* Contact Section Adjustments */
      .contact-content {
        flex-direction: column;
      }
      
      /* Fix margin and padding for smaller screens */
      section {
        padding: 4rem 1rem;
      }
      
      .container {
        padding: 0 1rem;
      }
      
      /* Adjust page nav dots for mobile */
      .page-nav {
        right: 10px;
      }
      
      /* Adjust theme toggle position */
      .theme-toggle {
        top: 15px;
        right: 15px;
      }
      
      /* Better touch targets for mobile */
      .btn {
        padding: 12px 20px;
        min-width: 150px;
      }
      
      /* Portfolio content adjustments */
      .portfolio-content {
        padding: 1rem;
      }
      
      /* Skill bars adjustment */
      .skill-bar {
        height: 8px;
      }
      
      /* Footer adjustments */
      footer {
        padding: 1.5rem 0;
      }
    }
    
    /* Medium-sized screens */
    @media screen and (min-width: 769px) and (max-width: 1024px) {
      .about-grid {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }
      
      .portfolio-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .container {
        padding: 0 1.5rem;
      }
    }
  `;
  
  document.head.appendChild(style);
  
  // Handle window resize to reset menu state
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      menuToggle.querySelector('i').className = 'fas fa-bars';
    }
  });
  
  // Add touch support for better mobile interaction
  let touchStartY = 0;
  let touchEndY = 0;
  
  document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
  }, false);
  
  document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    if (touchEndY < touchStartY && (touchStartY - touchEndY > 50)) {
      // Swipe up - hide nav if shown
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        menuToggle.querySelector('i').className = 'fas fa-bars';
      }
    }
  }
  
  // Optimize animations for mobile
  if (window.innerWidth <= 768) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      // Disable animations for users who prefer reduced motion
      const disableAnimationsStyle = document.createElement('style');
      disableAnimationsStyle.textContent = `
        * {
          animation: none !important;
          transition: none !important;
        }
      `;
      document.head.appendChild(disableAnimationsStyle);
    } else {
      // Simpler animations for mobile
      const mobileAnimationsStyle = document.createElement('style');
      mobileAnimationsStyle.textContent = `
        .about-img.animate, .about-content.animate, .portfolio-item.animate {
          transition-duration: 0.3s;
        }
      `;
      document.head.appendChild(mobileAnimationsStyle);
    }
  }
  
  // Improve scrolling performance by throttling scroll event
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        scrollTimeout = null;
        handleScroll();
      }, 20); // Throttle to 50fps
    }
  }, { passive: true });
});
