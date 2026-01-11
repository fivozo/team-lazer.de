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

/* =========================================
   MAIN.JS - SCROLL FIX, LOGIC & LIVE CHAT
   ========================================= */

// --- FIX: BEI RELOAD SOFORT NACH OBEN ---
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
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
  document.querySelectorAll('.scroll-reveal, .slide-left, .slide-right, .stats-card, .universe-card, .feature-box, .bento-box, .member-card').forEach(el => observer.observe(el));

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
  
  // Accordion
  const accHeaders = document.querySelectorAll('.accordion-header');
  accHeaders.forEach(header => {
    header.addEventListener('click', () => header.parentElement.classList.toggle('active'));
  });

  // Tile Spawner
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

  // --- LIVE CHAT START ---
  initLiveChat();
});

/* =========================================
   LIVE CHAT LOGIC (BOT -> SUPPORT)
   ========================================= */
function initLiveChat() {
  // 1. HTML INJECTION
  const chatHTML = `
    <div id="tl-chat-container">
      <div class="chat-window" id="chatWindow">
        <div class="chat-header">
          <div class="chat-partner">
            <div class="chat-partner-avatar" id="chatAvatar"><i class="fa-solid fa-robot"></i></div>
            <div class="chat-partner-info">
              <h4 id="chatName">Lazer Bot</h4>
              <span id="chatStatus">Online</span>
            </div>
          </div>
          <button class="chat-close" id="chatCloseBtn"><i class="fa-solid fa-xmark"></i></button>
        </div>
        
        <div class="chat-body" id="chatBody">
          <div class="chat-msg bot">
            Hallo! 👋 Ich bin der digitale Assistent von Team Lazer.
            <br>Wie kann ich dir helfen?
          </div>
          <div class="chat-msg bot">
            Tipp: Schreib <b>"Support"</b>, um mit einem echten Menschen zu sprechen.
          </div>
        </div>
        
        <div class="typing-indicator" id="typingIndicator">Lazer Bot schreibt...</div>

        <div class="chat-footer">
          <input type="text" class="chat-input" id="chatInput" placeholder="Nachricht..." autocomplete="off">
          <button class="chat-send" id="chatSendBtn"><i class="fa-solid fa-paper-plane"></i></button>
        </div>
      </div>

      <button class="chat-toggle-btn" id="chatToggleBtn">
        <i class="fa-solid fa-comments"></i>
      </button>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatHTML);

  // 2. ELEMENTS & VARIABLES
  const toggleBtn = document.getElementById('chatToggleBtn');
  const windowEl = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatCloseBtn');
  const inputEl = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSendBtn');
  const bodyEl = document.getElementById('chatBody');
  const typingEl = document.getElementById('typingIndicator');
  
  // Status Variables
  let isSupportMode = false;

  // 3. EVENTS
  toggleBtn.addEventListener('click', () => windowEl.classList.toggle('active'));
  closeBtn.addEventListener('click', () => windowEl.classList.remove('active'));

  const sendMessage = () => {
    const text = inputEl.value.trim();
    if(!text) return;

    // User Message
    addMessage(text, 'user');
    inputEl.value = '';

    // Logic Handler
    if(isSupportMode) {
      handleSupportLogic(text);
    } else {
      handleBotLogic(text);
    }
  };

  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') sendMessage();
  });

  // 4. HELPER FUNCTIONS
  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.classList.add('chat-msg', sender);
    div.innerHTML = text;
    bodyEl.appendChild(div);
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  function showTyping(show) {
    if(show) typingEl.classList.add('visible');
    else typingEl.classList.remove('visible');
  }

  // --- BOT LOGIC ---
  function handleBotLogic(text) {
    showTyping(true);
    
    // Einfache Keywords
    const lower = text.toLowerCase();
    let reply = "Das habe ich leider nicht verstanden. Schreib 'Hilfe' für Optionen.";

    if(lower.includes('hallo') || lower.includes('hi') || lower.includes('hey')) {
      reply = "Hey! Schön dich zu sehen. Suchst du nach einem Bot oder Design?";
    } else if(lower.includes('preis') || lower.includes('kostet')) {
      reply = "Unsere Preise sind individuell. Für Bots starten wir oft bei 0€ (Public) bis hin zu Custom-Lösungen.";
    } else if(lower.includes('discord')) {
      reply = "Unser Discord ist der beste Ort für alles: <a href='https://discord.gg/DEINLINK' target='_blank' style='color:#4ade80;text-decoration:underline;'>Hier klicken</a>";
    } else if(lower.includes('support') || lower.includes('hilfe') || lower.includes('mensch')) {
      reply = "Alles klar, ich verbinde dich mit dem Support Team... 🔄";
      setTimeout(() => switchToSupportMode(), 2000); // Trigger Support Switch
    }

    setTimeout(() => {
      showTyping(false);
      if(!isSupportMode) addMessage(reply, 'bot'); // Nur senden wenn nicht gerade gewechselt wurde
    }, 800 + Math.random() * 500); // Natürliche Verzögerung
  }

  // --- SUPPORT SWITCH ---
  function switchToSupportMode() {
    isSupportMode = true;
    
    // UI Change
    addMessage("<i>Verbinde mit Server...</i>", 'bot');
    
    setTimeout(() => {
      // Visuelle Änderung am Header
      document.getElementById('chatAvatar').innerHTML = '<i class="fa-solid fa-headset"></i>';
      document.getElementById('chatAvatar').style.background = '#e11d48'; // Rot/Pink für Support
      document.getElementById('chatName').innerText = "Support Agent";
      document.getElementById('chatStatus').innerText = "Schreibt...";
      
      addMessage("Hallo! Hier ist der Support. Wie kann ich dir weiterhelfen?", 'bot');
      showTyping(false);
    }, 2500);
  }

  // --- SUPPORT LOGIC (Simulation) ---
  function handleSupportLogic(text) {
    showTyping(true);
    // Simuliert eine Antwortzeit von Menschen
    setTimeout(() => {
      showTyping(false);
      addMessage("Danke für die Nachricht. Ein Teammitglied wird sich gleich darum kümmern. (Dies ist eine Demo)", 'bot');
    }, 2000);
  }
}