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
        if(entry.target.querySelector('.counter')) {
            startCounters();
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.scroll-reveal, .slide-left, .slide-right, .stats-card, .universe-card, .feature-box').forEach(el => observer.observe(el));

  // --- COUNTER ANIMATION ---
  let countersStarted = false;
  function startCounters() {
    if(countersStarted) return;
    countersStarted = true;
    
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || "";
      const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
      
      const duration = 2000; 
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if(current >= target) {
          current = target;
          clearInterval(timer);
        }
        let formattedNumber = current.toFixed(decimals).replace('.', ',');
        counter.innerText = formattedNumber + suffix;
      }, stepTime);
    });
  }

  // --- SCROLL LADDER LOGIC (Jump, Pulse & Custom Stick Man) ---
  const ladderEnergy = document.getElementById('ladderEnergy');
  const ladderDots = document.querySelectorAll('.ladder-dot');
  
  if (ladderEnergy && window.innerWidth > 900) {
    
    let lastSectionId = "";
    let idleTimer = null;
    let despawnTimer = null;

    // Funktion: Männlein aktivieren
    const spawnLittleMan = () => {
      // Nur spawnen, wenn er nicht schon da ist oder gerade geht
      if (!ladderEnergy.classList.contains('little-man') && !ladderEnergy.classList.contains('exiting')) {
        ladderEnergy.classList.add('little-man');
      }
    };

    // Funktion: Männlein entfernen (mit Animation)
    const despawnLittleMan = () => {
      // Wenn das Männlein aktiv ist und noch nicht im "Exiting" Modus
      if (ladderEnergy.classList.contains('little-man') && !ladderEnergy.classList.contains('exiting')) {
        
        // 1. Exiting Animation starten
        ladderEnergy.classList.add('exiting');
        
        // 2. Warten bis Animation vorbei ist (400ms laut CSS), dann Klassen entfernen
        clearTimeout(despawnTimer);
        despawnTimer = setTimeout(() => {
          ladderEnergy.classList.remove('little-man');
          ladderEnergy.classList.remove('exiting');
          
          // Original Pulse wiederherstellen, falls wir noch auf dem Dot stehen
          ladderEnergy.classList.add('pulsing'); 
        }, 400); // Zeit muss zur CSS animation: despawnMan passen
      } else {
        // Fallback: Timer resetten, falls wir scrollen während wir schon warten
        clearTimeout(idleTimer);
      }
    };

    const updateLadder = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // A) User scrollt -> Männlein muss weg
      despawnLittleMan();
      
      // B) Neuen Idle Timer setzen (5 Sekunden Ruhe -> Spawn)
      clearTimeout(idleTimer);
      idleTimer = setTimeout(spawnLittleMan, 5000);

      // C) Normale Leiter Logik (Position finden)
      let currentSectionId = "home"; 
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - windowHeight/2)) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId !== lastSectionId) {
        lastSectionId = currentSectionId;
        
        ladderDots.forEach(dot => {
          const target = dot.getAttribute('data-target').substring(1);
          
          if (target === currentSectionId) {
            dot.classList.add('active');
            
            const dotTop = dot.offsetTop;
            const dotHeight = dot.offsetHeight;
            const centerPos = dotTop + (dotHeight / 2);

            // Bewegung
            // Wir entfernen kurz 'pulsing', damit der Sprung sauber aussieht
            if(!ladderEnergy.classList.contains('little-man')) {
                ladderEnergy.classList.remove('pulsing');
                ladderEnergy.classList.remove('landed');
                void ladderEnergy.offsetWidth; // Reflow
                ladderEnergy.classList.add('jumping');
            }
            
            ladderEnergy.style.top = centerPos + 'px';

            setTimeout(() => {
              ladderEnergy.classList.remove('jumping');
              ladderEnergy.classList.add('landed');
              if(!ladderEnergy.classList.contains('little-man')) {
                  ladderEnergy.classList.add('pulsing');
              }
            }, 600);

          } else {
            dot.classList.remove('active');
          }
        });
      }
    };

    // Init
    setTimeout(() => updateLadder(), 100);
    window.addEventListener('scroll', updateLadder);

    // Klick Handler
    ladderDots.forEach(dot => {
      dot.addEventListener('click', () => { /* ... wie gehabt ... */ });
    });
  }

    // Init
    setTimeout(() => updateLadder(), 100);
    window.addEventListener('scroll', updateLadder);

    // Click Handler
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