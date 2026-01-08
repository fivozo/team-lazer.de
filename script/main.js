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

  document.querySelectorAll('.scroll-reveal, .slide-left, .slide-right').forEach(el => observer.observe(el));

  // --- CHATBOT (Angepasst für Community/Services) ---
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
    let senderName = "Team Lazer";
    let userText = "";

    if(type === 'discord') {
      userText = "Wo finde ich euren Discord?";
      reply = "Klick einfach oben rechts auf 'Join Discord' oder schau in die Links im Footer! Wir freuen uns auf dich.";
    }
    if(type === 'bots') {
      userText = "Ich brauche einen Bot.";
      reply = "Cool! Wir programmieren Custom Bots für Discord und Minecraft. Komm auf unseren Server und erstell ein Ticket für eine Anfrage.";
    }
    if(type === 'boosts') {
      userText = "Verkauft ihr Accounts?";
      reply = "Ja, wir bieten sichere Accounts, Boosts und Unlocks für diverse Games an. Schreib uns im Discord für aktuelle Angebote.";
    }

    addUserMessage(userText);
    setTimeout(() => {
      addBotMessage(reply, senderName);
    }, 600);
  };

  sendMessageBtn?.addEventListener('click', () => {
    const text = userChatInput.value.trim();
    if(text) {
      addUserMessage(text);
      userChatInput.value = "";
      setTimeout(() => addBotMessage("Am schnellsten erreichst du uns direkt über Discord!", "Team Lazer"), 800);
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