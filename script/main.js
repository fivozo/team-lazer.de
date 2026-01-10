/* =========================================
   MAIN.JS - SCROLL FIX & LOGIC
   ========================================= */

// --- FIX: BEI RELOAD SOFORT NACH OBEN ---
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'; // Verbietet dem Browser, die Position zu merken
}
// Hartes Scrollen nach oben (bevor der Rest lädt)
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  // Sicherheitshalber nochmal kurz nach dem Laden
  setTimeout(() => window.scrollTo(0, 0), 10);

  // Mobile Menu
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if(burgerBtn) {
    burgerBtn.addEventListener('click', () => mobileMenu.classList.toggle('active'));
  }

  // Scroll Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.scroll-reveal, .slide-left, .slide-right, .stats-card, .universe-card, .feature-box').forEach(el => observer.observe(el));

  // Counter
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || "";
    const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
    let count = 0;
    const update = () => {
      count += target / 60;
      if(count < target) {
        counter.innerText = count.toFixed(decimals).replace('.', ',') + suffix;
        requestAnimationFrame(update);
      } else {
        counter.innerText = target + suffix;
      }
    };
    update();
  });
  
  // Accordion (About Page)
  const accHeaders = document.querySelectorAll('.accordion-header');
  accHeaders.forEach(header => {
    header.addEventListener('click', () => header.parentElement.classList.toggle('active'));
  });

  // Tile Spawner (Hintergrund Animation)
  const tileContainer = document.getElementById('tileContainer');
  if(tileContainer) {
    setInterval(() => {
      const tile = document.createElement('div');
      tile.className = 'bg-tile';
      const size = Math.random() * 40 + 20;
      tile.style.width = size + 'px'; tile.style.height = size + 'px';
      tile.style.left = Math.random() * 100 + 'vw';
      tile.style.animationDuration = (Math.random() * 10 + 15) + 's';
      tileContainer.appendChild(tile);
      setTimeout(() => tile.remove(), 25000);
    }, 2000);
  }
});