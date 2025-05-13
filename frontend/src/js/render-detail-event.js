const params = new URLSearchParams(window.location.search);
const id = params.get("id");
fetch("/frontend/src/data/events.json")
      .then(response => response.json())
      .then(data => renderEventsDetail(data.events, id))
      .catch(error => console.error('Error fetching data:', error));



const renderEventsDetail = (events, id) => {
    const template = document.getElementById("template-detail-event");
    const container = document.querySelector(".container-details-events");
    const evento = events.find(evento => evento.id == id);
    if (!evento) {
        console.error("Evento no encontrado");
        return;
    }
    const clon = template.content.cloneNode(true);

    const title = clon.querySelector(".detail-event-title");
        title.textContent = evento.title;
    const objetive = clon.querySelector(".description-paragraph");
        objetive.textContent = evento.objetive;
    
    const contenedorFacilitadores = clon.querySelector(".container-facilitators-cards");
    const templateFacilitador = document.getElementById("template-facilitator-card");

    const actividad = clon.querySelector(".actividad");
    actividad.textContent = evento.type;
    const dirigido = clon.querySelector(".dirigido");
    dirigido.textContent = evento.targetAudience;
    const modalidad = clon.querySelector(".modalidad");
    modalidad.textContent = evento.modality;
    // const lugar = clon.querySelector(".lugar");
    // lugar.textContent = evento.location.name
    const lugarLink = clon.querySelector(".lugar-link");
    lugarLink.textContent = evento.location.name
    lugarLink.href = evento.location.mapLink;
    const organizacion = clon.querySelector(".organizacion");
    if (evento.organizers && Array.isArray(evento.organizers)) {
        organizacion.textContent = evento.organizers.join(", ");
      } else {
        organizacion.textContent = "Sin organizadores";
      }
    
      const fechaElemento = clon.querySelector(".fecha");
      const horarioElemento = clon.querySelector(".horario");
      
      const { date, time } = evento;
      
      // Función para formatear fechas en español
      const formatearFecha = (fechaStr) => {
        const opciones = { day: "numeric", month: "long", year: "numeric" , timeZone:"UTC" };
        const fecha = new Date(fechaStr);
        return fecha.toLocaleDateString("es-ES", opciones);
      };
      
      // Renderizar fecha (desde - hasta)
      if (date?.from && date?.to) {
        if (date.from === date.to) {
          const fechaUnica = formatearFecha(date.from);
          fechaElemento.textContent = `El ${fechaUnica}`;
        } else {
          const fechaDesde = formatearFecha(date.from);
          const fechaHasta = formatearFecha(date.to);
          fechaElemento.textContent = `Del ${fechaDesde} hasta ${fechaHasta}`;
        }
      } else {
        fechaElemento.textContent = "Fecha no disponible";
      }
      
      // Renderizar horario (de - a)
      if (time?.from && time?.to) {
        horarioElemento.textContent = `De ${time.from}h a ${time.to}h`;
      } else {
        horarioElemento.textContent = "Horario no disponible";
      }

    
    evento.facilitatores.forEach(facilitador => {
        const clonFaclitador = templateFacilitador.content.cloneNode(true);
        const name = clonFaclitador.querySelector(".facilitator-card-name");
            name.textContent = facilitador.name;
        const image = clonFaclitador.querySelector(".facilitator-card-img");
            image.src = facilitador.photo;
            image.alt = facilitador.name;
       
        contenedorFacilitadores.appendChild(clonFaclitador);
        
    });
    
    
    container.appendChild(clon);
    const buttonContact = document.querySelector(".detail-button-cta");

    buttonContact.addEventListener("click", () => {
        const nombreEvento = encodeURIComponent(evento.title);
        window.location.href = `/frontend/index.html?evento=${nombreEvento}#contacto`;
})
}

