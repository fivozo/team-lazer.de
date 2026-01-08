document.addEventListener('DOMContentLoaded', () => {
  
  // --- MOBILE MENU & STANDARD ANIMATIONS (Code beibehalten...) ---
  // (Füge hier deinen bestehenden Code für Burger Menu, Scroll Reveal etc. ein)
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  burgerBtn?.addEventListener('click', () => { mobileMenu.classList.toggle('active'); });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if(entry.target.querySelector('.counter')) startCounters();
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.scroll-reveal, .slide-left, .slide-right, .stats-card, .universe-card, .feature-box').forEach(el => observer.observe(el));

  let countersStarted = false;
  function startCounters() { /* (Dein Counter Code hier) */ 
    if(countersStarted) return; countersStarted = true;
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => { /* ... */ }); // (Kürz ich hier ab, lass deinen drin)
  }

  // --- SCROLL LADDER LOGIC (JUMP & PULSE) ---
  const ladderEnergy = document.getElementById('ladderEnergy');
  const ladderDots = document.querySelectorAll('.ladder-dot');
  
  if (ladderEnergy && window.innerWidth > 900) {
    
    let lastSectionId = "";
    let isJumping = false;

    const updateLadder = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Finde die aktuell aktive Sektion
      let currentSectionId = "home"; // Default Start
      
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        // Sektion ist aktiv, wenn sie die Mitte des Screens erreicht
        if (scrollY >= (sectionTop - windowHeight/2)) {
          currentSectionId = section.getAttribute('id');
        }
      });

      // Nur updaten, wenn sich die Sektion geändert hat
      if (currentSectionId !== lastSectionId) {
        lastSectionId = currentSectionId;
        
        ladderDots.forEach(dot => {
          const target = dot.getAttribute('data-target').substring(1);
          
          if (target === currentSectionId) {
            dot.classList.add('active');
            
            // --- SPRUNG LOGIK ---
            // Berechne exakte Mitte des Dots
            const dotTop = dot.offsetTop;
            const dotHeight = dot.offsetHeight;
            // Da ladderEnergy transform(-50%, -50%) hat, setzen wir top auf die Mitte des Dots
            const centerPos = dotTop + (dotHeight / 2);

            // 1. Reset Classes
            ladderEnergy.classList.remove('pulsing');
            ladderEnergy.classList.remove('landed');
            
            // 2. Trigger Jump
            // Trick: Reflow erzwingen um Animation neu zu starten
            void ladderEnergy.offsetWidth; 
            ladderEnergy.classList.add('jumping');
            
            // 3. Move Vertical
            ladderEnergy.style.top = centerPos + 'px';

            // 4. Nach Landung (600ms = Transition Zeit)
            setTimeout(() => {
              ladderEnergy.classList.remove('jumping');
              ladderEnergy.classList.add('landed'); // Macht "Puff" Effekt
              ladderEnergy.classList.add('pulsing'); // Startet Pulsieren
            }, 600);

          } else {
            dot.classList.remove('active');
          }
        });
      }
    };

    // Initiale Position setzen (ohne Animation beim Laden)
    setTimeout(() => updateLadder(), 100);
    
    window.addEventListener('scroll', updateLadder);

    // Klick auf Dots
    ladderDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetId = dot.getAttribute('data-target');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // --- SMOOTH SCROLL (Allgemein) ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      mobileMenu.classList.remove('active');
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if(targetSection){
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
          });
      }
    });
  });

});