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
   MAIN.JS - SCROLL FIX, LOGIC & PRO LIVE CHAT
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
   LIVE CHAT LOGIC (REALISTIC & PRO)
   ========================================= */
function initLiveChat() {
  // Pfad-Logik für Bilder
  const isPagesDir = window.location.pathname.includes('/pages/');
  const imgPrefix = isPagesDir ? '../images/' : './images/';
  const logoUrl = imgPrefix + 'tl-logo-nobg.webp';

  // 1. HTML INJECTION
  const chatHTML = `
    <div id="tl-chat-container">
      <div class="chat-window" id="chatWindow">
        <div class="chat-header" id="chatHeader">
          <div class="chat-partner">
            <div class="chat-partner-avatar" id="chatAvatar">
              <img src="${logoUrl}" alt="TL Bot">
            </div>
            <div class="chat-partner-info">
              <h4 id="chatName">TEAM LAZER BOT</h4>
              <span id="chatStatus">Online</span>
            </div>
          </div>
          <button class="chat-close" id="chatCloseBtn"><i class="fa-solid fa-xmark"></i></button>
        </div>
        
        <div class="chat-body" id="chatBody">
          <div class="chat-msg bot">
            Willkommen im Core von <b>TEAM LAZER</b>. ⚡
          </div>
          <div class="chat-msg bot">
            Ich bin dein Assistent. Frag mich nach <b>Preisen</b>, <b>Features</b> oder unserem <b>Team</b>.
            <br><br>
            Tipp: Schreib <b>"Support"</b>, um mit einem echten Menschen zu sprechen.
          </div>
        </div>
        
        <div class="typing-indicator" id="typingIndicator">
          <i class="fa-solid fa-circle-notch fa-spin"></i> schreibt...
        </div>

        <div class="chat-footer">
          <input type="text" class="chat-input" id="chatInput" placeholder="Nachricht..." autocomplete="off">
          <button class="chat-send" id="chatSendBtn"><i class="fa-solid fa-paper-plane"></i></button>
        </div>
      </div>

      <button class="chat-toggle-btn" id="chatToggleBtn">
        <i class="fa-solid fa-comment-dots"></i>
      </button>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatHTML);

  // 2. ELEMENTS & VARIABLES
  const toggleBtn = document.getElementById('chatToggleBtn');
  const windowEl = document.getElementById('chatWindow');
  const headerEl = document.getElementById('chatHeader');
  const closeBtn = document.getElementById('chatCloseBtn');
  const inputEl = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSendBtn');
  const bodyEl = document.getElementById('chatBody');
  const typingEl = document.getElementById('typingIndicator');
  
  const avatarEl = document.getElementById('chatAvatar');
  const nameEl = document.getElementById('chatName');
  const statusEl = document.getElementById('chatStatus');
  
  let isSupportMode = false;
  let isTyping = false; // Verhindert Spam während Antwort

  // 3. EVENTS
  toggleBtn.addEventListener('click', () => {
    windowEl.classList.toggle('active');
    if(windowEl.classList.contains('active')) inputEl.focus();
  });
  
  closeBtn.addEventListener('click', () => windowEl.classList.remove('active'));

  const sendMessage = () => {
    const text = inputEl.value.trim();
    if(!text) return;
    if(isTyping) return; // Warten bis Antwort da ist

    // User Message sofort anzeigen
    addMessage(text, 'user');
    inputEl.value = '';

    // Logik ausführen
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
    scrollToBottom();
  }

  function addSystemMessage(text) {
    const div = document.createElement('div');
    div.style.textAlign = 'center';
    div.style.fontSize = '0.8rem';
    div.style.color = 'var(--text-muted)';
    div.style.margin = '10px 0';
    div.style.fontStyle = 'italic';
    div.innerHTML = text;
    bodyEl.appendChild(div);
    scrollToBottom();
  }

  function scrollToBottom() {
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  function showTyping(show) {
    isTyping = show;
    if(show) {
      typingEl.classList.add('visible');
    } else {
      typingEl.classList.remove('visible');
    }
    scrollToBottom();
  }

  // ===========================================
  // 5. BOT INTELLIGENZ (ERWEITERT)
  // ===========================================
  function handleBotLogic(text) {
    // Schreib-Animation starten
    showTyping(true);
    
    // Zufällige "Denkzeit" für Realismus (1s - 2.5s)
    const delay = 1000 + Math.random() * 1500;
    const lower = text.toLowerCase();

    setTimeout(() => {
      let reply = "";

      // --- LOGIC TREE ---
      
      // 1. Begrüßung
      if(lower.match(/^(hallo|hi|hey|moin|servus|guten tag)/)) {
        reply = "Hey! 👋 Wie kann ich dir heute helfen? Suchst du Development oder Community-Support?";
      }
      
      // 2. Preise / Kosten
      else if(lower.match(/(preis|kosten|geld|teuer|bezahlen|angebot|kaufen)/)) {
        reply = "Wir arbeiten projektbasiert. <br>• <b>Public Bots:</b> Oft kostenlos.<br>• <b>Custom Dev:</b> Individuelles Angebot.<br>Komm in den Discord für einen Kostenvoranschlag!";
      }

      // 3. Discord / Join
      else if(lower.match(/(discord|link|invite|beitreten|server)/)) {
        reply = "Werde Teil der Elite. Hier ist der Link: <br><a href='https://discord.gg/DEINLINK' target='_blank' style='color:#4ade80; text-decoration:underline; font-weight:700;'>👉 Jetzt Beitreten</a>";
      }

      // 4. Team / Jobs / Bewerbung
      else if(lower.match(/(team|job|bewerbung|suchen|mitmachen|admin|mod)/)) {
        reply = "Wir suchen immer Talente! Egal ob Dev, Designer oder Mod. <br>Schick uns ein Ticket im Discord mit deinen Skills. 🔥";
      }

      // 5. Features / Was könnt ihr
      else if(lower.match(/(feature|was könnt ihr|skills|programmieren|coden|sprache)/)) {
        reply = "Unser Stack: <b>JS, Python, React, SQL</b>. <br>Wir bauen Dashboards, Custom Discord Bots, API-Schnittstellen und komplette Webseiten wie diese hier.";
      }
      
      // 6. Status / Uptime
      else if(lower.match(/(status|uptime|online|lag|down)/)) {
        reply = "Alle Systeme laufen normal. ✅ <br>Uptime: 99.9%. Falls du Probleme hast, melde dich beim Support.";
      }

      // 7. Support / Mensch
      else if(lower.match(/(support|hilfe|mensch|person|mitarbeiter|problem|fehler|bug)/)) {
        showTyping(false); // Bot typing aus
        initiateSupportSwitch();
        return; // Bot Logik beenden
      }

      // 8. Fun / Smalltalk
      else if(lower.includes("danke")) {
        reply = "Gerne doch! 😎";
      }
      else if(lower.includes("wer bist du")) {
        reply = "Ich bin Version 2.0 des Team Lazer Interface Bots. Programmiert für Effizienz.";
      }

      // Fallback
      else {
        reply = "Dazu finde ich nichts in meiner Datenbank. 🤔 <br>Versuch es mit Keywords wie <b>Preise</b>, <b>Discord</b> oder schreib <b>Support</b>.";
      }

      // Antwort senden
      showTyping(false);
      addMessage(reply, 'bot');

    }, delay);
  }

  // ===========================================
  // 6. SUPPORT WECHSEL (REALISTISCH)
  // ===========================================
  function initiateSupportSwitch() {
    addMessage("Verstanden. Ich leite dich weiter... 🔄", 'bot');
    
    // Kurze Pause vor dem "System"-Wechsel
    setTimeout(() => {
      addSystemMessage("Verbindung zum Support-Server wird hergestellt...");
      
      setTimeout(() => {
        switchToSupportMode();
      }, 2000);
      
    }, 1000);
  }

  function switchToSupportMode() {
    isSupportMode = true;
    
    // VISUELLE ÄNDERUNG (Man merkt es sofort)
    // 1. Header Farbe ändern (Rot/Pink Verlauf)
    headerEl.style.background = "linear-gradient(90deg, rgba(220, 38, 38, 0.2), rgba(10, 11, 16, 0.9))";
    headerEl.style.borderBottomColor = "rgba(220, 38, 38, 0.3)";

    // 2. Avatar ändern (Headset)
    avatarEl.innerHTML = '<i class="fa-solid fa-headset" style="font-size: 1.2rem;"></i>';
    avatarEl.style.borderColor = "#ef4444";
    avatarEl.style.background = "rgba(239, 68, 68, 0.1)";
    avatarEl.style.boxShadow = "0 0 15px rgba(239, 68, 68, 0.4)";

    // 3. Text ändern
    nameEl.innerText = "Marc (Support)";
    nameEl.style.color = "#ef4444"; // Rötlich
    statusEl.innerHTML = "Verbunden <i class='fa-solid fa-circle' style='font-size:6px; color:#4ade80; margin-left:5px;'></i>";

    // 4. System Nachricht
    addSystemMessage("Du bist nun mit einem Mitarbeiter verbunden.");

    // 5. Erste Nachricht vom Menschen (simuliert)
    showTyping(true);
    setTimeout(() => {
      showTyping(false);
      addMessage("Hallo! 👋 Hier ist Marc vom Support-Team. Ich sehe, du hast Fragen. Worum geht es genau?", 'bot'); // Klasse 'bot' hier für Links-Ausrichtung nutzen, auch wenn es Mensch ist
    }, 2500);
  }

  // ===========================================
  // 7. HUMAN SUPPORT LOGIK
  // ===========================================
  function handleSupportLogic(text) {
    showTyping(true);
    
    // Menschen brauchen länger zum Antworten
    const humanDelay = 3000 + Math.random() * 3000; 

    setTimeout(() => {
      showTyping(false);
      
      // Einfache Simulation eines Gesprächs
      const lower = text.toLowerCase();
      let reply = "";

      if(lower.includes("hallo") || lower.includes("hi")) {
        reply = "Hi! Wie kann ich dir helfen?";
      } else if(text.length < 5) {
        reply = "Kannst du das etwas genauer beschreiben?";
      } else {
        reply = "Alles klar, ich schaue mir das an. Da ich aktuell nur eine Demo bin, komm bitte für echte Hilfe auf unseren Discord Server. Dort können wir das klären! 😄";
      }

      addMessage(reply, 'bot'); // 'bot' Klasse sorgt dafür, dass die Nachricht links erscheint
    }, humanDelay);
  }
}