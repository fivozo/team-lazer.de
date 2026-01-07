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

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

  // --- FAQ ACCORDION ---
  const accHeaders = document.querySelectorAll('.accordion-header');
  accHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      // Close others (optional)
      document.querySelectorAll('.accordion-item').forEach(i => {
        if(i !== item) i.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });

  // --- CART SLIDEBOARD & LOGIC (MOCK) ---
  const cartTrigger = document.getElementById('cartTrigger');
  const closeCart = document.getElementById('closeCart');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartTotalValue = document.getElementById('cartTotalValue');
  const cartCountLabel = document.getElementById('cartCount');

  // Dummy Data (Beispielhafte Warenkorb Inhalte)
  // In der Realität würdest du das aus localStorage oder DB laden
  let cart = [
    { id: 1, name: "GTA V Money Drop", price: 10.00, qty: 1, img: "./images/banners/gta.png" },
    { id: 2, name: "CoD Unlock All", price: 25.00, qty: 1, img: "./images/banners/cod.png" }
  ];

  function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
  }

  cartTrigger?.addEventListener('click', toggleCart);
  closeCart?.addEventListener('click', toggleCart);
  cartOverlay?.addEventListener('click', toggleCart);

  // Render Cart Items
  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalQty = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Dein Warenkorb ist leer.</div>';
    } else {
      cart.forEach((item, index) => {
        total += item.price * item.qty;
        totalQty += item.qty;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <img src="${item.img}" alt="${item.name}">
          <div class="cart-item-details">
            <span class="cart-item-title">${item.name}</span>
            <span class="cart-item-price">${(item.price * item.qty).toFixed(2)} €</span>
            <div class="cart-controls">
              <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
              <span>${item.qty}</span>
              <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
              <button class="remove-btn" onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `;
        cartItemsContainer.appendChild(div);
      });
    }

    cartTotalValue.innerText = total.toFixed(2) + ' €';
    cartCountLabel.innerText = totalQty;
  }

  // Global functions for inline onclick (Quick & Dirty for demo)
  window.updateQty = (index, change) => {
    if (cart[index].qty + change > 0) {
      cart[index].qty += change;
    } else {
      // Wenn 0 erreicht, entfernen (optional)
    }
    renderCart();
  };

  window.removeItem = (index) => {
    cart.splice(index, 1);
    renderCart();
  };

  // Init Cart
  renderCart();


  // --- CHATBOT ---
  const chatToggle = document.getElementById('chatToggle');
  const chatWindow = document.getElementById('chatWindow');
  const chatClose = document.getElementById('chatClose');
  const chatMessages = document.getElementById('chatMessages');

  chatToggle?.addEventListener('click', () => chatWindow.classList.add('active'));
  chatClose?.addEventListener('click', () => chatWindow.classList.remove('active'));

  window.sendQuickReply = (type) => {
    let reply = "";
    if(type === 'lieferzeit') reply = "Die Bearbeitungszeit variiert zwischen 30 Minuten (kleine Boosts) und bis zu 5 Tagen (große Account-Pakete).";
    if(type === 'support') reply = "Du kannst uns via E-Mail (support@team-lazer.de) oder direkt im Discord erreichen. Link ist im Footer!";
    if(type === 'human') reply = "Verstanden. Bitte komm auf unseren Discord und öffne ein Ticket, ein Mitarbeiter kümmert sich sofort um dich.";
    
    // User Msg
    const userDiv = document.createElement('div');
    userDiv.className = 'msg user';
    userDiv.innerText = type === 'human' ? 'Mensch?' : (type === 'support' ? 'Support' : 'Lieferzeit');
    chatMessages.appendChild(userDiv);

    // Bot Reply
    setTimeout(() => {
      const botDiv = document.createElement('div');
      botDiv.className = 'msg bot';
      botDiv.innerText = reply;
      chatMessages.appendChild(botDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 600);
  };
});