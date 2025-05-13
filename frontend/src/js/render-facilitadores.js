document.addEventListener("DOMContentLoaded", () => {
  fetch("/frontend/src/data/facilitadores.json")
    .then(response => response.json())
    .then(data => renderAgrupaciones(data.agrupaciones))
    .catch(error => console.error("Error cargando los datos de facilitadores:", error));
});

// === Función para renderizar agrupaciones ===
function renderAgrupaciones(agrupaciones) {
  const contenedor = document.getElementById("contenedor");
  const templateAgrupacion = document.getElementById("template-agrupacion");
  const templateFacilitador = document.getElementById("template-facilitador");

  const BANDERA_DEFAULT = "imagenes/banderas/default.png";

  agrupaciones.forEach(agrupacion => {
    const grupoClone = templateAgrupacion.content.cloneNode(true);

    // Nombre y bandera
    const banderaImg = grupoClone.querySelector(".bandera");
    banderaImg.src = agrupacion.bandera || BANDERA_DEFAULT;
    banderaImg.alt = `Bandera de ${agrupacion.nombre}`;
    grupoClone.querySelector(".nombre-agrupacion").textContent = agrupacion.nombre;

    // Renderizar facilitadores
    const facilitadoresContainer = grupoClone.querySelector(".contenedor-facilitadores");
    agrupacion.facilitadores.forEach(facilitador => {
      const card = crearCardFacilitador(facilitador, templateFacilitador);
      facilitadoresContainer.appendChild(card);
    });

    contenedor.appendChild(grupoClone);
  });
}

// === Función para renderizar una card de facilitador ===
function crearCardFacilitador(facilitador, template) {
  const clone = template.content.cloneNode(true);

  clone.querySelector(".nombre").textContent = facilitador.nombre;
  clone.querySelector(".ocupacion").textContent = facilitador.ocupacion;
  clone.querySelector(".descripcion").textContent = facilitador.descripcion;

  const img = clone.querySelector(".imagen");
  img.src = facilitador.imagen;
  img.alt = `Foto de ${facilitador.nombre}`;

  const emailBtn = clone.querySelector(".btn-email");
  emailBtn.href = `mailto:${facilitador.email}`;

  const linkedinBtn = clone.querySelector(".btn-linkedin");
  linkedinBtn.href = facilitador.linkedin;

  return clone;
}