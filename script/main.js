/* =====================================================
   TEAM LAZER – main.js (clean, full)
   - Navbar: mobile drawer (burger), ARIA, scroll-lock, outside/ESC close
   - Chat widget: open/close + demo reply
   - Reviews: paged carousel (auto page every 5s; responsive per-view)
   - Announce: rotating pop-in card (changes text periodically)
   ===================================================== */
'use strict';

const $  = (q, r = document) => r.querySelector(q);
const $$ = (q, r = document) => Array.from(r.querySelectorAll(q));

document.addEventListener('DOMContentLoaded', () => {
  /* ===========================
     1) NAVBAR / MOBILE MENU
     =========================== */
  const burgerBtn  = $('#burgerBtn');
  const mobileMenu = $('#mobileMenu');

  const openMenu = () => {
    if (!mobileMenu || !burgerBtn) return;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  };

  const closeMenu = () => {
    if (!mobileMenu || !burgerBtn) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  };

  const toggleMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  };

  burgerBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking outside the drawer
  document.addEventListener('click', (e) => {
    if (!mobileMenu?.classList.contains('open')) return;
    if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close when a link inside the drawer is clicked
  $$('#mobileMenu a').forEach((a) => {
    a.addEventListener('click', () => closeMenu());
  });

  // ESC closes drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // On resize to desktop, ensure drawer is closed
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) closeMenu();
  });

  /* ===========================
     2) CHAT WIDGET
     =========================== */
  const chatButton = $('#chatButton');
  const chatPopup  = $('#chatPopup');
  const closeChat  = $('#closeChat');
  const chatBody   = $('#chatBody');
  const chatForm   = $('#chatForm');
  const chatInput  = $('#chatInput');

  const openChat = () => {
    if (!chatPopup) return;
    chatPopup.classList.add('open');
    chatPopup.setAttribute('aria-hidden', 'false');
    // Fokus leicht verzögert, damit Rendering fertig ist
    requestAnimationFrame(() => chatInput?.focus());
  };

  const closeChatF = () => {
    if (!chatPopup) return;
    chatPopup.classList.remove('open');
    chatPopup.setAttribute('aria-hidden', 'true');
  };

  const toggleChat = () => {
    if (!chatPopup) return;
    chatPopup.classList.contains('open') ? closeChatF() : openChat();
  };

  chatButton?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleChat();
  });

  closeChat?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeChatF();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!chatPopup?.classList.contains('open')) return;
    if (!chatPopup.contains(e.target) && !chatButton.contains(e.target)) {
      closeChatF();
    }
  });

  // ESC closes chat
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeChatF();
  });

  // Demo messaging
  chatForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = chatInput.value.trim();
    if (!val) return;
    appendMsg('user', val);
    chatInput.value = '';
    setTimeout(() => {
      appendMsg('bot', 'Danke! Dies ist eine Demo-Antwort. Live-Support folgt. ✨');
    }, 600);
  });

  function appendMsg(type, text) {
    if (!chatBody) return;
    const el = document.createElement('div');
    el.className = `msg ${type}`;
    el.textContent = text;
    chatBody.appendChild(el);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  /* =================================================
     4) ANNOUNCE Rotator (pop-in alle 10s)
     HTML: #announceCard  #announceLabel  #announceText
     ================================================= */
  (function AnnounceRotator () {
    const card  = document.getElementById('announceCard');
    const label = document.getElementById('announceLabel');
    const text  = document.getElementById('announceText');
    if (!card || !label || !text) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const offers = [
      {
        label: 'GTA ONLINE',
        icon:  'fa-solid fa-car',
        html:  'Yo! Auf jeden Money-Boost in GTA Online gibt’s <b>+2.000.000 GTA$</b> obendrauf.'
      },
      {
        label: 'RDO',
        icon:  'fa-solid fa-horse',
        html:  'RDO Money + Gold: <b>+$1.000</b> & <b>+10 Goldbarren</b> gratis auf deinen Boost.'
      },
      {
        label: 'PSN',
        icon:  'fab fa-playstation',
        html:  'Nur kurz: <b>10 % Rabatt</b> auf PSN-Guthaben – Code: <b>LAZER10</b>.'
      }
    ];

    let i = 0;
    let timer;

    const render = (idx, animate = true) => {
      const o = offers[idx % offers.length];
      label.innerHTML = `<i class="${o.icon}"></i> ${o.label}`;
      text.innerHTML  = o.html;

      if (animate && !prefersReduced) {
        card.classList.remove('is-animating');
        void card.offsetWidth; // reflow, um CSS-Animation neu zu starten
        card.classList.add('is-animating');
      }
    };

    const next = () => {
      i = (i + 1) % offers.length;
      render(i, true);
    };

    const play = () => { stop(); timer = setInterval(next, 10000); }; // alle 10s
    const stop = () => { if (timer) clearInterval(timer); timer = null; };

    render(i, false);
    play();

    // Pause bei Hover / Tab-Wechsel
    card.addEventListener('mouseenter', stop);
    card.addEventListener('mouseleave', play);
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : play());

    // Reduced motion: ohne Pop, etwas schnellerer Wechsel
    if (prefersReduced) {
      stop();
      setInterval(next, 9000);
    }
  })();
});
