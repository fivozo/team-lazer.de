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
      }
    });
  }, { threshold: 0.1 });

  // Alle relevanten Klassen beobachten
  document.querySelectorAll('.scroll-reveal, .slide-left, .slide-right, .accordion-item').forEach(el => observer.observe(el));

  // --- FAQ ACCORDION ---
  const accHeaders = document.querySelectorAll('.accordion-header');
  accHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });

  // --- CART LOGIC REMOVED (Website Mode) ---
  // Code für cartTrigger, closeCart, cartSidebar wurde entfernt.

  // --- CHATBOT ---
  const chatToggle = document.getElementById('chatToggle');
  const chatWindow = document.getElementById('chatWindow');
  const chatClose = document.getElementById('chatClose');
  const chatMessages = document.getElementById('chatMessages');
  const userChatInput = document.getElementById('userChatInput');
  const sendMessageBtn = document.getElementById('sendMessage');

  chatToggle?.addEventListener('click', () => chatWindow.classList.add('active'));
  chatClose?.addEventListener('click', () => chatWindow.classList.remove('active'));

  window.sendQuickReply = (type) => {
    let reply = "";
    let senderName = "TL Bot";
    let userText = "Frage";

    // Neue Logik für normale Website
    if(type === 'support') {
        reply = "Unser Support-Team ist täglich auf Discord erreichbar. Erstelle einfach ein Ticket!";
        userText = "Support?";
    }
    if(type === 'community') {
        reply = "Wir sind eine Gaming-Community mit Fokus auf GTA, CoD und mehr. Jeder ist willkommen!";
        userText = "Community?";
    }
    if(type === 'human') {
      reply = "Verstanden. Bitte komm auf unseren Discord, ein Admin kümmert sich um dich.";
      userText = "Mensch?";
    }
    
    addUserMessage(userText);

    setTimeout(() => {
      addBotMessage(reply, senderName);
    }, 600);
  };

  // Manuelles Senden
  sendMessageBtn?.addEventListener('click', () => {
    const text = userChatInput.value.trim();
    if(text) {
      addUserMessage(text);
      userChatInput.value = "";
      setTimeout(() => addBotMessage("Ich bin nur ein Bot. Bitte nutze Discord für direkten Kontakt.", "TL Bot"), 800);
    }
  });

  userChatInput?.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') sendMessageBtn.click();
  });

  function addUserMessage(text) {
    const userContainer = document.createElement('div');
    userContainer.className = 'msg-container user';
    userContainer.innerHTML = `<span class="msg-sender">Du</span><div class="msg user">${text}</div>`;
    chatMessages.appendChild(userContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addBotMessage(text, sender) {
    const botContainer = document.createElement('div');
    botContainer.className = 'msg-container bot';
    botContainer.innerHTML = `<span class="msg-sender">${sender}</span><div class="msg bot">${text}</div>`;
    chatMessages.appendChild(botContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});