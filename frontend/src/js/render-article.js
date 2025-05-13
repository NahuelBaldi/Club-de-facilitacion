document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");
    const blogSlug = urlParams.get("slug");

    fetch("../data/blogs.json")
        .then(response => response.json())
        .then(data => {
            // Generar slug para cada blog
            data.blogs.forEach((blog, index) => {
                if (!blog.id) blog.id = `blog-${index + 1}`;
                blog.slug = slugify(blog.title);
            });

            const blog = data.blogs.find(b => b.id === blogId);

            if (blog) {
                // Si el slug no coincide, redirige a la URL correcta (opcional pero recomendado)
                if (blog.slug !== blogSlug) {
                    const newUrl = `blog.html?id=${blog.id}&slug=${blog.slug}`;
                    window.history.replaceState({}, '', newUrl); // Reemplaza sin recargar
                }

                renderBlog(blog);
                setShareLinks(blog); 
            } else {
                console.error("Blog no encontrado");
            }
        })
        .catch(error => console.error("Error cargando blogs:", error));
});
// Funcion de los botones
function setShareLinks(blog) {
  const pageUrl = window.location.href;
  const shareText = encodeURIComponent(blog.title);

  document.getElementById("share-linkedin").href =
    `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
  document.getElementById("share-x").href =
    `https://twitter.com/intent/tweet?url=${pageUrl}&text=${shareText}`;
  document.getElementById("share-facebook").href =
    `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
  document.getElementById("share-whatsapp").href =
    `https://api.whatsapp.com/send?text=${shareText}%20${pageUrl}`;
  document.getElementById("share-telegram").href =
    `https://t.me/share/url?url=${pageUrl}&text=${shareText}`;
}

function slugify(text) {
    return text
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function renderBlog(blog) {
    const container = document.getElementById("blog-article");

    // Título del blog
    const title = document.createElement("h1");
    title.classList.add("blog-title")
    title.textContent = blog.title;
    container.appendChild(title);

    // Contenedor para la fecha y el tipo
const metaContainer = document.createElement("div");
metaContainer.classList.add("blog-meta");

// Fecha
const fechaElemento = document.createElement("span");
const formattedDate = new Date(blog.fecha).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
});
fechaElemento.textContent = formattedDate;
fechaElemento.classList.add("blog-meta-date");

// Tipo de artículo
const tipoElemento = document.createElement("span");
tipoElemento.textContent = blog.type;
tipoElemento.classList.add("blog-meta-type");

// Agregar al contenedor
metaContainer.appendChild(fechaElemento);
metaContainer.appendChild(tipoElemento);

// Agregar al contenedor principal
container.appendChild(metaContainer);
let imageCount = 0;
let paragraphCount = 0;
let subtitleCount = 0;
let headingCount = 0;
let listCount = 0;
    // Contenido dinámico
    blog.content.forEach(block => {
        let element;

        switch (block.type) {
            case "heading":
            element = document.createElement("h2");
            element.textContent = block.text;
            element.classList.add("blog-heading", `blog-heading-${headingCount}`);
            headingCount++;
            break;

            case "subtitle":
            element = document.createElement("h3");
            element.textContent = block.text;
            element.classList.add("blog-subtitle", `blog-subtitle-${subtitleCount}`);
            subtitleCount++;
            break;

            case "paragraph":
            element = document.createElement("p");
            element.innerHTML = block.text.replace(/\n/g, "<br>");
            element.classList.add("blog-paragraph", `blog-paragraph-${paragraphCount}`);
            paragraphCount++;
            break;

            case "list":
            element = document.createElement("ul");
            if (block.style === "check") {
                element.classList.add("blog-checklist", `blog-checklist-${listCount}`);
            } else {
                element.classList.add("blog-list", `blog-list-${listCount}`);
            }
            block.items.forEach(itemText => {
                const li = document.createElement("li");
                li.textContent = itemText;
                li.classList.add("blog-list-item");
                element.appendChild(li);
            });
            listCount++;
            break;

            case "image":
            element = document.createElement("img");
            element.src = block.src;
            element.alt = block.alt || "";
            element.classList.add("blog-img", `blog-img-${imageCount}`);
            imageCount++;
            break;
        }

        if (element) container.appendChild(element);

        
    });
    
    // Bloque de autor
    if (blog.author) {
    const authorContainer = document.createElement("div");
    authorContainer.classList.add("blog-author");

    const authorNameContainer = document.createElement("p");
    authorNameContainer.classList.add("blog-author-name");

    const authorLabel = document.createElement("span");
    authorLabel.classList.add("blog-author-label");
    authorLabel.textContent = "Autora: ";

    const authorLink = document.createElement("a");
    authorLink.href = "#";
    authorLink.classList.add("blog-author-link");
    authorLink.textContent = blog.author.name;

    authorNameContainer.appendChild(authorLabel);
    authorNameContainer.appendChild(authorLink);
    authorContainer.appendChild(authorNameContainer);

    const authorDetails = document.createElement("p");
    authorDetails.textContent = `${blog.author.profession}. ${blog.author.area}. ${blog.author.role}`;
    authorDetails.classList.add("blog-author-details");
    authorContainer.appendChild(authorDetails);

    container.appendChild(authorContainer);
}
    // Referencias
    if (blog.references?.length) {
    const referencesContainer = document.createElement("section");
    referencesContainer.classList.add("blog-references");

    const referencesTitle = document.createElement("h3");
    referencesTitle.classList.add("blog-references-title");
    referencesTitle.textContent = "Referencias";
    referencesContainer.appendChild(referencesTitle);

    const referencesList = document.createElement("ul");
    referencesList.classList.add("blog-references-list");

    blog.references.forEach(ref => {
        const listItem = document.createElement("li");
        listItem.classList.add("blog-references-item");

        const link = document.createElement("a");
        link.href = ref.link;
        link.target = "_blank";
        link.classList.add("blog-references-link");
        link.textContent = ref.title;

        listItem.appendChild(link);
        referencesList.appendChild(listItem);
    });

    referencesContainer.appendChild(referencesList);
    container.appendChild(referencesContainer);
}

}
