document.addEventListener('DOMContentLoaded', () => {
  
  // --- MOBILE MENU ---
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  burgerBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = burgerBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });

  // --- SCROLL ANIMATIONS ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Start Counter Animation if stats section is visible
        if(entry.target.querySelector('.counter')) {
            startCounters();
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.scroll-reveal, .slide-left, .slide-right, .stat-item').forEach(el => observer.observe(el));

  // --- NUMBER COUNTER ANIMATION ---
  let countersStarted = false;
  function startCounters() {
    if(countersStarted) return;
    countersStarted = true;
    
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const increment = target / 50; // Geschwindigkeit
      
      const updateCounter = () => {
        const c = +counter.innerText;
        if(c < target) {
          counter.innerText = Math.ceil(c + increment);
          setTimeout(updateCounter, 30);
        } else {
          counter.innerText = target + "+"; // Add + at the end
        }
      };
      updateCounter();
    });
  }

  // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      mobileMenu.classList.remove('active'); // Close menu on click
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if(targetSection){
          window.scrollTo({
            top: targetSection.offsetTop - 80, // Offset for fixed header
            behavior: 'smooth'
          });
      }
    });
  });

});