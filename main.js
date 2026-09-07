// App-Style Portfolio Interactive Script - Waiman Ao

document.addEventListener('DOMContentLoaded', () => {
  // Theme Switcher Logic
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const html = document.documentElement;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      if (typeof window.update3DTheme === 'function') {
        window.update3DTheme(newTheme);
      }
    });
  }

  // Contact Modal Sheet Toggle
  const contactModal = document.getElementById('contactModal');
  const openContactBtn = document.getElementById('openContactBtn');
  const openContactHero = document.getElementById('openContactHero');
  const openContactDock = document.getElementById('openContactDock');
  const closeContactBtn = document.getElementById('closeContactBtn');

  function openModal() {
    if (contactModal) contactModal.classList.add('active');
  }

  function closeModal() {
    if (contactModal) contactModal.classList.remove('active');
  }

  if (openContactBtn) openContactBtn.addEventListener('click', openModal);
  if (openContactHero) openContactHero.addEventListener('click', openModal);
  if (openContactDock) openContactDock.addEventListener('click', openModal);
  if (closeContactBtn) closeContactBtn.addEventListener('click', closeModal);

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) closeModal();
    });
  }

  // Print / PDF Resume Action
  const printResumeBtn = document.getElementById('printResumeBtn');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Skills Category Filter Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // App Dock Active Tab Scroll Spy
  const dockItems = document.querySelectorAll('.dock-item[href]');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    dockItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSection}`) {
        item.classList.add('active');
      }
    });
  });

  // Scroll Reveal Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
