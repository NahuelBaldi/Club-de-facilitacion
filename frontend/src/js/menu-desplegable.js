// console.log('menu-desplegable.js cargado')

// document.addEventListener('DOMContentLoaded', () => {
//     const menuItems = document.querySelectorAll('.menu-item');
  
//     menuItems.forEach(item => {
//       const link = item.querySelector('.menu-link');
//       const submenu = item.querySelector('.submenu');
  
//       // Usamos timeout para evitar parpadeo
//       let timeout;
  
//       item.addEventListener('mouseenter', () => {
//         clearTimeout(timeout);
//         item.classList.add('hovering');
//         link.setAttribute('aria-expanded', 'true');
//         submenu.setAttribute('aria-hidden', 'false');
//       });
  
//       item.addEventListener('mouseleave', () => {
//         timeout = setTimeout(() => {
//           item.classList.remove('hovering');
//           link.setAttribute('aria-expanded', 'false');
//           submenu.setAttribute('aria-hidden', 'true');
//         }, 150); // Pequeño retardo evita el parpadeo
//       });
//     });
//   });


 

const initMenuDesplegable = () =>{
  // Se busca dentro del contenedor inyectado para evitar ambigüedades
  const menuItems = document.querySelectorAll('#container-nav .menu-item');
  
  menuItems.forEach(item => {
    const link = item.querySelector('.menu-link');
    const submenu = item.querySelector('.submenu');

    let timeout;

    item.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      item.classList.add('hovering');

      // Verificamos que link no sea null
      if (link) {
        link.setAttribute('aria-expanded', 'true');
      }
      // Solo intentamos modificar el submenu si existe
      if (submenu) {
        submenu.setAttribute('aria-hidden', 'false');
      }
    });

    item.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        item.classList.remove('hovering');

        if (link) {
          link.setAttribute('aria-expanded', 'false');
        }
        if (submenu) {
          submenu.setAttribute('aria-hidden', 'true');
        }
      }, 150);
    });
  });
}

document.addEventListener('navbarLoaded', initMenuDesplegable);

// Si el DOM ya está cargado, inicializamos inmediatamente, de lo contrario esperamos
// if (document.readyState !== 'loading') {
//   initMenuDesplegable();
// } else {
//   document.addEventListener('navbarLoaded', initMenuDesplegable);
// }
