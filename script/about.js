document.addEventListener('DOMContentLoaded', () => {

  // --- 1. ACCORDION LOGIC (Die Klapper) ---
  const accItems = document.querySelectorAll('.accordion-item');

  accItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      // Wenn man will, dass nur eins gleichzeitig offen ist:
      // accItems.forEach(i => { if(i !== item) i.classList.remove('active'); });
      
      item.classList.toggle('active');
    });
  });


  // --- 2. EASTER EGG: RISING TILES ---
  const tileContainer = document.getElementById('tileContainer');
  
  if (tileContainer) {
    const spawnTile = () => {
      const tile = document.createElement('div');
      tile.classList.add('bg-tile');
      
      // Zufällige Größe (klein und technisch)
      const size = Math.random() * 40 + 10; // 10px bis 50px
      tile.style.width = size + 'px';
      tile.style.height = size + 'px';
      
      // Zufällige Position (X-Achse)
      tile.style.left = Math.random() * 100 + 'vw';
      
      // Zufällige Geschwindigkeit
      const duration = Math.random() * 5 + 5; // 5 bis 10 Sekunden
      tile.style.animationDuration = duration + 's';
      
      tileContainer.appendChild(tile);

      // Aufräumen nach Animation
      setTimeout(() => {
        tile.remove();
      }, duration * 1000);
    };

    // Alle 500ms eine neue Kachel spawnen
    setInterval(spawnTile, 500);
    
    // Initiale Kacheln erstellen (damit es nicht leer startet)
    for(let i=0; i<10; i++) spawnTile();
  }
  
});