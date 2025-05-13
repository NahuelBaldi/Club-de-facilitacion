
document.addEventListener('DOMContentLoaded', ()=>{
    fetch('./src/data/events.json')// fetch toma las rutas relativas a el index.html
        .then(response => response.json())
        .then(data => renderEvents(data.events))
        .catch(error => console.error('Error fetching data:', error));
});

const renderEvents = (events) => {

    const template = document.getElementById('evento-template');
    const container = document.querySelector('.eventos-container');
    
    events.forEach(evento=>{
        const clon = template.content.cloneNode(true);

        const img = clon.querySelector('.evento-card-img');
            img.src=evento.image;
            img.alt=evento.title;

        const title = clon.querySelector('.evento-card-title');
            title.textContent = evento.title;
        const type = clon.querySelector('.evento-card-type');
            type.textContent = evento.type;
        const description = clon.querySelector('.evento-card-description');
            description.textContent = evento.description;
        const modality = clon.querySelector('.evento-card-modality');
            modality.textContent = evento.modality;
        const fechaContainer = clon.querySelector('.evento-card-date');
            const date = evento.date;

            const formatearFecha = (fechaStr) => {
                const opciones = { day: "numeric", month: "long", year: "numeric", timeZone:"UTC" };
                const fecha = new Date(fechaStr);
                return fecha.toLocaleDateString("es-ES", opciones);
              };

              if (date?.from && date?.to) {
                if (date.from === date.to) {
                  const fechaUnica = formatearFecha(date.from);
                  fechaContainer.textContent = `El ${fechaUnica}`;
                } else {
                  const fechaDesde = formatearFecha(date.from);
                  const fechaHasta = formatearFecha(date.to);
                  fechaContainer.textContent = `Del ${fechaDesde} hasta ${fechaHasta}`;
                }
              } else {
                fechaContainer.textContent = "Fecha no disponible";
              }
            
        const id = clon.querySelector('.evento-card');
            id.dataset.id = evento.id;
        container.appendChild(clon);
    })
}

