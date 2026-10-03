// Imagen de respaldo por si falla el servidor de imágenes
const fallbackPoster = "https://placehold.co/500x750/1a1d24/3b82f6?text=Poster+No+Disponible";
const fallbackBackground = "https://placehold.co/1920x1080/0d0f12/1a1d24?text=Fondo+No+Disponible";

// Base de datos de películas actualizada con enlaces más estables
const movies = [
    {
        id: 1,
        title: "Dune",
        genre: "Ciencia Ficción",
        description: "Paul Atreides debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia y su pueblo, enfrentándose a fuerzas malignas en un conflicto épico.",
        poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        background: "https://image.tmdb.org/t/p/original/lzWHmYdfeFiMIb4HTEWPEoD0eRv.jpg"
    },
    {
        id: 2,
        title: "El Señor de los Anillos: La Comunidad",
        genre: "Fantasía",
        description: "Un joven hobbit de la Comarca y ocho compañeros emprenden un peligroso viaje hacia Mordor para destruir el poderoso Anillo Único.",
        poster: "https://image.tmdb.org/t/p/original/p6QjtBmO6U105l44U0qMDSLxT0L.jpg",
        background: "https://image.tmdb.org/t/p/original/8VMyk8qcOhEwAzAtIjx0WoQmBZg.jpg"
    },
    {
        id: 3,
        title: "Interstellar",
        genre: "Ciencia Ficción",
        description: "Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por garantizar la supervivencia de la raza humana.",
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        background: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
    },
    {
        id: 4,
        title: "El Laberinto del Fauno",
        genre: "Fantasía",
        description: "En la España de posguerra, una niña descubre un laberinto ancestral donde un fauno le revela su verdadero y mágico destino.",
        poster: "https://image.tmdb.org/t/p/original/hFWd6jck0HA56t0d3ZDddy2ZMd1.jpg",
        background: "https://image.tmdb.org/t/p/original/xIhWOLB49laP0RRT28pdDG9ktWR.jpg"
    },
    {
        id: 5,
        title: "Blade Runner 2049",
        genre: "Ciencia Ficción",
        description: "El descubrimiento de un secreto largamente oculto lleva a un joven blade runner a buscar a Rick Deckard, desaparecido hace 30 años.",
        poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
        background: "https://image.tmdb.org/t/p/original/ilRyazdflIgEqO5VDlsmBRAgcZt.jpg"
    },
    {
        id: 6,
        title: "Harry Potter y el Prisionero de Azkaban",
        genre: "Fantasía",
        description: "Harry Potter regresa a Hogwarts para su tercer año, enfrentándose al misterio que rodea a Sirius Black, un prisionero fugado.",
        poster: "https://image.tmdb.org/t/p/original/kJamr8lNfj8MocyAYbZDSb3WkUT.jpg",
        background: "https://image.tmdb.org/t/p/original/htmYEfH7TQgzsXHCnNXxmoYKQtL.jpg"
    }
];

// Función para crear la tarjeta de la película dinámicamente
function createMovieCard(movie, containerId) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.onclick = () => showMovieDetails(movie.id);

    // Agregamos onerror para cargar una imagen por defecto si la original falla
    card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackPoster}';">
        <div class="movie-card-info">
            <h3 class="movie-card-title">${movie.title}</h3>
            <span class="movie-card-genre">${movie.genre}</span>
        </div>
    `;
    document.getElementById(containerId).appendChild(card);
}

// Renderiza el catálogo principal
function renderCatalog(moviesToRender, title = "Catálogo de Películas") {
    const grid = document.getElementById('movie-grid');
    grid.innerHTML = ''; // Limpiamos la grilla
    document.getElementById('catalog-title').textContent = title;

    moviesToRender.forEach(movie => createMovieCard(movie, 'movie-grid'));
}

// Filtra por categorías en la barra de navegación
function filterMovies(genre) {
    showView('home');
    const filtered = movies.filter(m => m.genre === genre);
    renderCatalog(filtered, `Películas de ${genre}`);
}

// Abre los detalles de la película
function showMovieDetails(id) {
    const movie = movies.find(m => m.id === id);
    if (!movie) return;

    // Elementos del DOM
    const bgElement = document.getElementById('detail-background');
    const posterElement = document.getElementById('detail-poster');

    // Configuramos los textos
    document.getElementById('detail-title').textContent = movie.title;
    document.getElementById('detail-genre').textContent = movie.genre;
    document.getElementById('detail-description').textContent = movie.description;

    // Manejo de imágenes con respaldo en caso de error
    bgElement.style.backgroundImage = `url(${movie.background})`;

    // Si la imagen de póster falla en detalles, usa el respaldo
    posterElement.onerror = function () {
        this.src = fallbackPoster;
    };
    posterElement.src = movie.poster;

    // Películas relacionadas
    const relatedGrid = document.getElementById('related-grid');
    relatedGrid.innerHTML = '';
    const related = movies.filter(m => m.genre === movie.genre && m.id !== id).slice(0, 4);
    related.forEach(rel => createMovieCard(rel, 'related-grid'));

    showView('detail');
}

// Control de vistas
function showView(viewName) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    if (viewName === 'home') {
        document.getElementById('catalog-view').classList.add('active');
        renderCatalog(movies);
    } else if (viewName === 'detail') {
        document.getElementById('detail-view').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'live') {
        document.getElementById('live-view').classList.add('active');
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    renderCatalog(movies);
});