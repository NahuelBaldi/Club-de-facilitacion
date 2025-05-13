import emailjs from 'https://cdn.skypack.dev/@emailjs/browser';

// Inicializá con tu clave pública
emailjs.init(EMAILJS_PUBLIC_KEY); // reemplazá con tu clave real

document.addEventListener("DOMContentLoaded", () => {
     const tabButtons = document.querySelectorAll(".tab-btn");
    let tipoContacto = "Facilitador";

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {

            tabButtons.forEach(btn => {
                btn.classList.remove("active");
            })
            button.classList.add("active");

            tipoContacto = button.getAttribute("data-type");
            console.log("Tipo de contacto: ",tipoContacto);
        })
    })

    const params = new URLSearchParams(window.location.search);
    const nombreEvento = params.get("evento");
    
    if (nombreEvento) {
        document.getElementById("evento").value = nombreEvento;
        document.getElementById("mensaje-evento").textContent =
            `Estás solicitando participar en: ${nombreEvento}`;
    }

  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
  e.preventDefault();
  const mensajeElemento = document.getElementById("mensaje-evento");
  mensajeElemento.textContent = "⏳ Enviando mensaje...";

  // Primero asignamos el valor correcto al input oculto
  document.getElementById("contactType").value = tipoContacto;

  // Luego lo leemos
  const contactType = document.getElementById("contactType").value;
  const evento = document.getElementById("evento").value;

  const formData = {
    contactType: contactType,
    name: this.name.value,
    email: this.email.value,
    phone: this.phone.value,
    message: this.message.value,
    evento: evento,
    newsletter: this.newsletter.checked ? "Sí" : "No"
  };

  console.log("Formulario enviado con los siguientes datos:", formData);

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
    .then(() => {
      document.getElementById("mensaje-evento").textContent = "🎉¡Mensaje enviado con éxito!";
      form.reset();
    })
    .catch((error) => {
      document.getElementById("mensaje-evento").textContent = "❌Error al enviar el mensaje.";
      console.error("Error:", error);
    });
});
});