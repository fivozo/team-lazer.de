document.addEventListener('DOMContentLoaded', () => {
  
  // --- MOBILE MENU ---
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  burgerBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = burgerBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars'); icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars');
    }
  });

  // --- SCROLL ANIMATIONS ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if(entry.target.querySelector('.counter')) startCounters();
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.scroll-reveal, .slide-left, .slide-right, .stats-card, .universe-card, .feature-box').forEach(el => observer.observe(el));

  // --- COUNTER ---
  let countersStarted = false;
  function startCounters() {
    if(countersStarted) return; countersStarted = true;
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || "";
      const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
      const duration = 2000; const stepTime = 20; const steps = duration / stepTime; const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if(current >= target) { current = target; clearInterval(timer); }
        let formattedNumber = current.toFixed(decimals).replace('.', ',');
        counter.innerText = formattedNumber + suffix;
      }, stepTime);
    });
  }

  // --- SCROLL LADDER DOTS (Navigation only) ---
  const scrollIndicator = document.getElementById('scrollIndicator');
  const ladderDots = document.querySelectorAll('.ladder-dot');
  
  if (scrollIndicator && window.innerWidth > 900) {
    const updateScrollDot = () => {
      let currentId = "home";
      const midLine = window.scrollY + window.innerHeight/2;
      document.querySelectorAll('section').forEach(sec => {
        if(midLine >= sec.offsetTop) currentId = sec.getAttribute('id');
      });
      
      ladderDots.forEach(dot => {
        const target = dot.getAttribute('data-target').substring(1);
        if(target === currentId) {
          dot.classList.add('active');
          scrollIndicator.classList.add('active'); // Pulsing effect
          const topPos = dot.offsetTop + dot.offsetHeight/2;
          scrollIndicator.style.top = topPos + 'px';
        } else {
          dot.classList.remove('active');
        }
      });
    };
    window.addEventListener('scroll', updateScrollDot);
    setTimeout(updateScrollDot, 100);
    
    // Dot Click
    ladderDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetSection = document.querySelector(dot.getAttribute('data-target'));
        if(targetSection) window.scrollTo({ top: targetSection.offsetTop - 100, behavior: 'smooth' });
      });
    });
  }

  // --- FREE ROAMING STICK MAN (The AI) ---
  const stickMan = document.getElementById('freeStickMan');
  const wrapper = stickMan?.querySelector('.man-wrapper');
  
  if (stickMan && window.innerWidth > 900) {
    let isIdle = false;
    let idleTimer = null;
    let aiLoop = null;

    // Start Position (Center Screen)
    let posX = window.innerWidth / 2;
    let posY = window.innerHeight / 2;
    
    const thoughts = ["?", "Zzz...", "Hunger", "Wo hin?", "Laufen...", "Team Lazer", "Code?", "Bug?", "Kaffee?", "AFK?"];

    const updatePos = (x, y, speed) => {
      stickMan.style.transition = `top ${speed}s linear, left ${speed}s linear`;
      stickMan.style.left = x + 'px';
      stickMan.style.top = y + 'px';
      posX = x; 
      posY = y;
    };

    const showThought = () => {
      const bubble = document.createElement('div');
      bubble.className = 'thought-bubble';
      bubble.innerText = thoughts[Math.floor(Math.random() * thoughts.length)];
      bubble.style.left = posX + 'px';
      bubble.style.top = (posY - 60) + 'px'; // Überm Kopf
      document.body.appendChild(bubble);
      setTimeout(() => bubble.remove(), 3000);
    };

    const decideNextMove = () => {
      if (!isIdle) return; // Stop if not idle

      const action = Math.random(); 

      if (action < 0.6) { 
        // --- WALK ---
        stickMan.classList.remove('sitting');
        stickMan.classList.add('walking');

        // Random target (padded from edges)
        const targetX = Math.random() * (window.innerWidth - 100) + 50;
        const targetY = Math.random() * (window.innerHeight - 100) + 50;
        
        // Direction
        if (targetX > posX) wrapper.style.transform = "scaleX(-1)"; // Right
        else wrapper.style.transform = "scaleX(1)"; // Left

        // Speed calculation
        const dist = Math.hypot(targetX - posX, targetY - posY);
        const duration = dist / 150; // Speed factor

        updatePos(targetX, targetY, duration);

        aiLoop = setTimeout(decideNextMove, duration * 1000);

      } else if (action < 0.9) {
        // --- SIT ---
        stickMan.classList.remove('walking');
        stickMan.classList.add('sitting');
        
        if(Math.random() > 0.5) showThought();

        aiLoop = setTimeout(decideNextMove, Math.random() * 3000 + 2000);

      } else {
        // --- STAND ---
        stickMan.classList.remove('walking');
        stickMan.classList.remove('sitting');
        aiLoop = setTimeout(decideNextMove, 1000);
      }
    };

    // --- IDLE CHECKER ---
    const resetIdle = () => {
      clearTimeout(idleTimer);
      clearTimeout(aiLoop);
      
      if (isIdle) {
        isIdle = false;
        stickMan.classList.remove('active'); // Hide
        stickMan.classList.remove('walking', 'sitting');
      }

      // Wait 3 seconds then start AI
      idleTimer = setTimeout(() => {
        isIdle = true;
        stickMan.classList.add('active'); // Show
        
        // Teleport near random spot to start
        posX = Math.random() * (window.innerWidth - 100) + 50;
        posY = Math.random() * (window.innerHeight - 100) + 50;
        stickMan.style.transition = 'none';
        stickMan.style.left = posX + 'px';
        stickMan.style.top = posY + 'px';

        decideNextMove();
      }, 3000);
    };

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('scroll', resetIdle);
    window.addEventListener('click', resetIdle);
    
    resetIdle(); // Init
  }
});