// Este archivo se encarga de cargar el contenido HTML de los componentes en el index.html
//Lo que hacemos es crear una funcion que recive el id del contenedor, la ruta del archivo html que queremos cargar y el nombre del evento que queremos despachar una vez que el componente se haya cargado correctamente
// La funcion hace una peticion fetch al archivo html y si la respuesta es correcta, lo convierte a texto y lo agrega al contenedor que le pasamos como parametro
// Luego despacha un evento personalizado que indica que el componente ya se cargó
// Si hay un error en la peticion, lo captura y lo muestra en la consola
//Luego cuendo el dom se cargo por completo llamamos a la funcion para pasarle los parametros y cargar el navbar y los demas componentes que queramos cargar

// const loadHTMLComponent = (containerId, file, eventName) => {
//     fetch(file)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }
//         return response.text();
//       })
//       .then(data => {
//         const container = document.getElementById(containerId);
//         container.innerHTML = data;
//         // Despacha un evento personalizado que indica que el componente ya se cargó
//         document.dispatchEvent(new Event(eventName));
//       })
//       .catch(error => console.error(`Error al cargar ${file}:`, error));
//   };
  
//   window.addEventListener('DOMContentLoaded', () => {
//     // Cargar el navbar
//     loadHTMLComponent("container-nav", "/frontend/src/components/navbar.html", "navbarLoaded");
//     // Cargar el formulario de contactos
//     loadHTMLComponent("container-contact", "/frontend/src/components/footer.html", "footerLoaded");
//   });
  
//   window.addEventListener("load", () => {
//     const hash = window.location.hash;
//     if (hash) {
//         setTimeout(() => {
//             const target = document.querySelector(hash);
//             if (target) {
//                 target.scrollIntoView({ behavior: "smooth" });
//             }
//         }, 100); // Ajustá el tiempo si es necesario
//     }
// });

const loadHTMLComponent = async (containerId, file, eventName) => {
  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.text();
    const container = document.getElementById(containerId);
    container.innerHTML = data;

    // Despacha un evento personalizado que indica que el componente ya se cargó
    document.dispatchEvent(new Event(eventName));
  } catch (error) {
    console.error(`Error al cargar ${file}:`, error);
  }
};

window.addEventListener('DOMContentLoaded', async () => {
  // Cargar el navbar y esperar a que esté listo
  await loadHTMLComponent("container-nav", "/frontend/src/components/navbar.html", "navbarLoaded");

  // Cargar el footer
  await loadHTMLComponent("container-contact", "/frontend/src/components/footer.html", "footerLoaded");
});

window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (hash) {
    setTimeout(() => {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Ajustá el tiempo si es necesario
  }
});