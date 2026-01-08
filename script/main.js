document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if(burgerBtn) {
    burgerBtn.addEventListener('click', () => mobileMenu.classList.toggle('active'));
  }

  // Scroll Animations (Reveal)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.scroll-reveal, .fade-in-up').forEach(el => observer.observe(el));

  // Counter (Home)
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || "";
    let count = 0;
    const update = () => {
      count += target / 50;
      if(count < target) {
        counter.innerText = Math.ceil(count) + suffix;
        requestAnimationFrame(update);
      } else {
        counter.innerText = target + suffix;
      }
    };
    update();
  });

  // Accordion (About)
  const accHeaders = document.querySelectorAll('.accordion-header');
  accHeaders.forEach(h => {
    h.addEventListener('click', () => {
      h.parentElement.classList.toggle('active');
    });
  });

  // Tile Spawner (About Easter Egg)
  const tileContainer = document.getElementById('tileContainer');
  if(tileContainer) {
    setInterval(() => {
      const tile = document.createElement('div');
      tile.className = 'bg-tile';
      const size = Math.random() * 40 + 20;
      tile.style.width = size + 'px';
      tile.style.height = size + 'px';
      tile.style.left = Math.random() * 100 + 'vw';
      tileContainer.appendChild(tile);
      setTimeout(() => tile.remove(), 15000);
    }, 2000);
  }
});