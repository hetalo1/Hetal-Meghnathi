// CLEANED script.js — full version with theme, scroll, nav, animations

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
body.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', newTheme);
  themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('theme', newTheme);
});

// Smooth scrolling and nav update
const pageNavItems = document.querySelectorAll('.page-nav-item');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
      updateActiveNav(targetId);
    }
  });
});

pageNavItems.forEach(item => {
  item.addEventListener('click', function () {
    const sectionId = '#' + this.getAttribute('data-section');
    const section = document.querySelector(sectionId);
    if (section) {
      window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

function updateActiveNav(targetId) {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === targetId) {
      link.classList.add('active');
    }
  });

  const sectionName = targetId.substring(1);
  pageNavItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-section') === sectionName) {
      item.classList.add('active');
    }
  });
}

// Scroll animations
function animateOnScroll() {
  const aboutImg = document.querySelector('.about-img');
  const aboutContent = document.querySelector('.about-content');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (isInViewport(aboutImg)) {
    aboutImg.classList.add('animate');
    aboutContent.classList.add('animate');

    document.querySelectorAll('.skill-progress').forEach(bar => {
      bar.style.width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
    });
  }

  portfolioItems.forEach((item, index) => {
    if (isInViewport(item)) {
      setTimeout(() => {
        item.classList.add('animate');
      }, index * 200);
    }
  });
}

function isInViewport(element) {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

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

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', () => {
  handleScroll();
  animateOnScroll();
});

// Mobile Menu Toggle
const menuToggle = document.createElement('div');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav').appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
