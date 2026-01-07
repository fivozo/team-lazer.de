document.addEventListener('DOMContentLoaded', () => {
  
  // --- MOBILE MENU ---
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  burgerBtn.addEventListener('click', () => {
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

  // --- SEARCH FUNCTIONALITY (Realtime Filter) ---
  const searchInput = document.getElementById('globalSearch');
  const mobileSearch = document.getElementById('mobileSearchInput');
  const items = document.querySelectorAll('.game-card');

  function filterItems(query) {
    const term = query.toLowerCase();
    items.forEach(item => {
      const name = item.getAttribute('data-name');
      if (name.includes(term)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  if(searchInput) searchInput.addEventListener('keyup', (e) => filterItems(e.target.value));
  if(mobileSearch) mobileSearch.addEventListener('keyup', (e) => filterItems(e.target.value));


  // --- FAQ ACCORDION ---
  const accHeaders = document.querySelectorAll('.accordion-header');
  accHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });


  // --- CHATBOT WIDGET ---
  const chatToggle = document.getElementById('chatToggle');
  const chatWindow = document.getElementById('chatWindow');
  const chatClose = document.getElementById('chatClose');
  const chatInput = document.getElementById('userChatInput');
  const sendBtn = document.getElementById('sendMessage');
  const messagesContainer = document.getElementById('chatMessages');

  // Toggle
  chatToggle.addEventListener('click', () => chatWindow.classList.add('active'));
  chatClose.addEventListener('click', () => chatWindow.classList.remove('active'));

  // Send Function
  window.sendQuickReply = (type) => {
    let userText = "";
    let botText = "";

    if (type === 'lieferzeit') {
      userText = "Wie lange dauert die Lieferung?";
      botText = "In der Regel benötigen wir 30-60 Minuten nach Erhalt deiner Daten. 🕒";
    } else if (type === 'sicherheit') {
      userText = "Ist das sicher?";
      botText = "Absolut. Wir nutzen private Methoden und testen diese täglich. Kein Bann-Risiko für dich! 🛡️";
    } else if (type === 'human') {
      userText = "Ich brauche einen Menschen.";
      botText = "Kein Problem! Komm einfach auf unseren Discord Server und öffne ein Ticket. Ein Supporter hilft dir sofort. Link oben im Menü!";
    }

    addMessage(userText, 'user');
    setTimeout(() => addMessage(botText, 'bot'), 600);
  };

  sendBtn.addEventListener('click', handleUserMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserMessage();
  });

  function handleUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    
    // Simple Fake AI
    setTimeout(() => {
      addMessage("Danke für deine Nachricht! Ich bin nur ein Bot, aber ein Mitarbeiter schaut sich das gleich an. Komm am besten auf unseren Discord!", 'bot');
    }, 1000);
  }

  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.classList.add('msg', sender);
    div.innerText = text;
    // Insert before options if exist
    const options = document.querySelector('.chat-options');
    if (options && sender === 'bot') {
        // keep options at bottom? No, just append
    }
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

});