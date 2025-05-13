
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("evento-card-button")) {
      const card = e.target.closest(".evento-card");
      const title = card.querySelector(".evento-card-title").textContent;
      const id = card.dataset.id;
  
      console.log("Botón clickeado. ID del evento", id);
  
      // Ejemplo: Redirigir a una página de detalle con ID ficticio o real
    //   const id = card.dataset.id;
      window.location.href = `/frontend/src/pages/detail-event.html?id=${id}#detalles-del-evento`;
    //   ?id=${id}
    
    }
  });