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

  document.querySelectorAll('.scroll-reveal, .slide-left, .slide-right, .stats-card, .game-card, .feature-box').forEach(el => observer.observe(el));

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

  // --- SCROLL LADDER LOGIC (Simple) ---
  const scrollIndicator = document.getElementById('scrollIndicator');
  const ladderDots = document.querySelectorAll('.ladder-dot');
  
  if (scrollIndicator && window.innerWidth > 900) {
    const updateLadder = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      let currentSectionId = "home"; 
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - windowHeight/2)) {
          currentSectionId = section.getAttribute('id');
        }
      });

      ladderDots.forEach(dot => {
        const target = dot.getAttribute('data-target').substring(1);
        if (target === currentSectionId) {
          dot.classList.add('active');
          // Move Indicator
          const centerPos = dot.offsetTop + (dot.offsetHeight / 2);
          scrollIndicator.style.top = centerPos + 'px';
          scrollIndicator.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    setTimeout(() => updateLadder(), 100);
    window.addEventListener('scroll', updateLadder);

    // Klick
    ladderDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const target = document.querySelector(dot.getAttribute('data-target'));
        if(target) window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
      });
    });
  }

  // --- SMOOTH SCROLL ---
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