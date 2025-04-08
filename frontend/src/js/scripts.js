document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
  
    menuItems.forEach(item => {
      const link = item.querySelector('.menu-link');
      const submenu = item.querySelector('.submenu');
  
      // Usamos timeout para evitar parpadeo
      let timeout;
  
      item.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        item.classList.add('hovering');
        link.setAttribute('aria-expanded', 'true');
        submenu.setAttribute('aria-hidden', 'false');
      });
  
      item.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
          item.classList.remove('hovering');
          link.setAttribute('aria-expanded', 'false');
          submenu.setAttribute('aria-hidden', 'true');
        }, 150); // Pequeño retardo evita el parpadeo
      });
    });
  });