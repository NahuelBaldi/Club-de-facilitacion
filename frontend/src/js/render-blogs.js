document.addEventListener('DOMContentLoaded', () => {
    fetch("../data/blogs.json")
        .then(response => response.json())
        .then(data => {
            data.blogs.forEach((blog,index)=>{
              if(!blog.id){
                blog.id = `blog-${index+1}`
              }
              blog.slug = generarSlug(blog.title);
            })
            const blogsOrdenados = data.blogs.sort((a,b)=> new Date(b.fecha) - new Date(a.fecha));
            iniciarPaginacion(blogsOrdenados,5)

        })
        .catch(error=> console.error('Error fetching blogs:', error));
})

const generarSlug=(titulo)=>{
  return titulo
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "") 
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');
}

const iniciarPaginacion=(blogs, porPagina )=>{
    let paginaActual = 1;
    const totalPaginas = Math.ceil(blogs.length / porPagina);

    const renderPagina = (pagina) => {
        const inicio = (pagina - 1) * porPagina;
        const fin = inicio + porPagina;
        const blogsPagina = blogs.slice(inicio, fin);
        renderBlogs(blogsPagina);
        renderControles(pagina, totalPaginas);
    }
    const renderBlogs = (blogs) => {
        const container = document.querySelector(".blogs-container");
        const template = document.getElementById("blog-card-template");
        container.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos elementos

        blogs.forEach(blog=>{
            const clone = template.content.cloneNode(true);
            const card = clone.querySelector(".blog-card");

            // const slug = generarSlug(blog.title);
            // blog.slug = slug; 

            if (card) card.dataset.slug = blog.slug;
            const link = clone.querySelector(".blog-card-link");
            if (link) {
              link.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = `blog.html?id=${blog.id}&slug=${blog.slug}`;
              });
            }

            const img = clone.querySelector(".blog-card-image");
            img.src = blog.imageCard;
            img.alt = blog.title;

            const title = clone.querySelector(".blog-card-title");
            title.textContent = blog.title;

            const date = clone.querySelector(".blog-card-date")
            date.textContent = new Date(blog.fecha).toLocaleDateString( "es-ES",{
                day:"numeric",
                month:"long",
                year:"numeric",
                timeZone: "UTC"
            });

            const description = clone.querySelector(".blog-card-description");
            const primerParrafo = blog.content.find(c => c.type === "paragraph");
            description.textContent = primerParrafo ? primerParrafo.text.slice(0, 500) + "..." : "Sin descripción disponible.";

            container.appendChild(clone);
        })
    }

    const renderControles =(paginaActual,totalPaginas)=>{
        const contenedor = document.getElementById("pagination-controls");
  contenedor.innerHTML = "";

  const crearBoton = (texto, pagina, disabled = false, activo = false) => {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.classList.add("paginacion-btn");

    if (activo) btn.classList.add("activo");
    if (disabled) {
      btn.disabled = true;
      btn.classList.add("deshabilitado");
    } else {
      btn.addEventListener("click", () => renderPagina(pagina));
    }

    return btn;
  };

  // << Anterior
  contenedor.appendChild(crearBoton("<<", 1, paginaActual === 1));
  contenedor.appendChild(crearBoton("Anterior", paginaActual - 1, paginaActual === 1));

  // Números
  for (let i = 1; i <= totalPaginas; i++) {
    contenedor.appendChild(crearBoton(i, i, false, i === paginaActual));
  }

  // Siguiente >>
  contenedor.appendChild(crearBoton("Siguiente", paginaActual + 1, paginaActual === totalPaginas));
  contenedor.appendChild(crearBoton(">>", totalPaginas, paginaActual === totalPaginas));
}
renderPagina(paginaActual);

}


