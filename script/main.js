document.addEventListener('DOMContentLoaded', () => {
  
  // --- MOBILE MENU ---
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if(burgerBtn) {
    burgerBtn.addEventListener('click', () => mobileMenu.classList.toggle('active'));
  }

  // --- SCROLL ANIMATIONS ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.scroll-reveal, .fade-in-up').forEach(el => observer.observe(el));

  // --- COUNTER (Home) ---
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
        counter.innerText = target.toString().replace('.', ',') + suffix;
      }
    };
    update();
  });

  // --- ACCORDION (About) ---
  const accHeaders = document.querySelectorAll('.accordion-header');
  accHeaders.forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('active');
    });
  });

  // --- EASTER EGG (About Tiles) ---
  const tileContainer = document.getElementById('tileContainer');
  if(tileContainer) {
    setInterval(() => {
      const tile = document.createElement('div');
      tile.className = 'bg-tile';
      const size = Math.random() * 40 + 20;
      tile.style.width = size + 'px'; tile.style.height = size + 'px';
      tile.style.left = Math.random() * 100 + 'vw';
      tile.style.animationDuration = (Math.random() * 10 + 15) + 's'; // Langsam (15-25s)
      tileContainer.appendChild(tile);
      setTimeout(() => tile.remove(), 25000);
    }, 2000); // Weniger Kacheln
  }
});