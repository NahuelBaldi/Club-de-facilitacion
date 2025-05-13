document.addEventListener('DOMContentLoaded', () => {
    fetch("./src/data/blogs.json")
        .then(response => response.json())
        .then(data => {
            // Generar id y slug si no existen
            data.blogs.forEach((blog, index) => {
                if (!blog.id) {
                    blog.id = `blog-${index + 1}`;
                }
                blog.slug = slugify(blog.title);
            });

            // Ordenar por fecha descendente
            const blogsOrdenados = data.blogs.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            renderBlogs(blogsOrdenados);
        })
        .catch(error => console.error('Error fetching blogs:', error));
});

const slugify = (text) => {
    return text
        .toString()
        .normalize("NFD")                   // Elimina acentos
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, "")       // Quita caracteres especiales
        .replace(/\s+/g, "-")              // Reemplaza espacios por guiones
        .replace(/-+/g, "-");              // Elimina guiones repetidos
};

const renderBlogs = (blogs) => {
    const blogsCardContainer = document.querySelector(".magazine-card-container");
    const template = document.querySelector("#magazine-card-template");
    const blogToShow = blogs.slice(0, 3);

    blogToShow.forEach(blog => {
        const clone = template.content.cloneNode(true);
        const image = clone.querySelector(".magazine-card-img");
        const title = clone.querySelector(".magazine-card-title");
        const author = clone.querySelector(".magazine-card-author");
        const button = clone.querySelector('.magazine-card-button');

        image.src = blog.imageCard;
        image.alt = blog.title;
        title.textContent = blog.title;
        author.textContent = blog.author.name;

        button.href = `/frontend/src/pages/blog.html?id=${blog.id}&slug=${blog.slug}`;

        blogsCardContainer.appendChild(clone);
    });
};