document.addEventListener('DOMContentLoaded', () => {
    // Movie Data (can be expanded or fetched from an external source)
    const movies = [
        {
            title: 'Gone Girl',
            year: 2014,
            genre: ['Drama', 'Thriller', 'Mystery'],
            rating: 5,
            poster: 'images/gonegirl.jpg',
            description: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
            director: 'David Fincher',
            starring: ['Ben Affleck', 'Rosamund Pike' , 'Neil Patrick Harris']
        },
        {
            title: 'Shutter Island',
            year: 2010,
            genre: ['Drama', 'Thriller', 'Mystery'],
            rating: 5,
            poster: 'images/shutterisland.jpg',
            description: 'World War II soldier-turned-U.S. Marshal Teddy Daniels investigates the disappearance of a patient from a hospital for the criminally insane, but his efforts are compromised by troubling visions and a mysterious doctor.',
            director: 'Martin Scorsese',
            starring: ['Leonardo DiCaprio', 'Mark Ruffalo', 'Ben Kingsley']
        },
        {
            title: 'Past Lives',
            year: 2023,
            genre: ['Drama', 'Romance'],
            rating: 5,
            poster: 'images/pastlives.jpg',
            description: 'Nora and Hae Sung, two childhood friends, are reunited in New York for one fateful week as they confront notions of destiny, love, and the choices that make a life.',
            director: 'Celine Song',
            starring: ['Greta Lee', 'Teo Yoo', 'John Magaro']
        }
        // Add more movies here
    ];

    // DOM Elements
    const moviesGrid = document.querySelector('.movies-grid');
    const genreFilter = document.getElementById('genre-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const yearFilter = document.getElementById('year-filter');
    const prevButton = document.querySelector('.pagination-prev');
    const nextButton = document.querySelector('.pagination-next');
    const currentPageSpan = document.querySelector('.current-page');
    const totalPagesSpan = document.querySelector('.total-pages');

    // Pagination variables
    const moviesPerPage = 6;
    let currentPage = 1;
    let filteredMovies = [];

    // Function to create movie card HTML
    function createMovieCardHTML(movie) {
        return `
            <article class="movie-card" data-genre="${movie.genre.map(g => g.toLowerCase()).join(' ')}" data-rating="${movie.rating}" data-year="${movie.year}">
                <div class="movie-card-header">
                    <h2 class="movie-title">${movie.title}</h2>
                    <span class="movie-year">${movie.year}</span>
                </div>
                <div class="movie-card-body">
                    <div class="movie-poster">
                        <img src="${movie.poster}" alt="${movie.title} Movie Poster">
                    </div>
                    <div class="movie-details">
                        <div class="movie-metadata">
                            <span class="movie-genre">${movie.genre.join(' / ')}</span>
                            <span class="movie-rating">${'⭐'.repeat(movie.rating)}</span>
                        </div>
                        <div class="movie-description">
                            <p>${movie.description}</p>
                        </div>
                        <div class="movie-additional-info">
                            <p><strong>Director:</strong> ${movie.director}</p>
                            <p><strong>Starring:</strong> ${movie.starring.join(', ')}</p>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }

    // Function to filter and render movies
    function renderMovies() {
        // Apply filters
        filteredMovies = movies.filter(movie => {
            const genreMatch = genreFilter.value === 'all' || 
                movie.genre.map(g => g.toLowerCase()).includes(genreFilter.value);
            
            const ratingMatch = ratingFilter.value === 'all' || 
                movie.rating === parseInt(ratingFilter.value);
            
            const yearMatch = yearFilter.value === 'all' || 
                (yearFilter.value === '2020' && movie.year >= 2020) ||
                (yearFilter.value === '2010' && movie.year >= 2010 && movie.year < 2020) ||
                (yearFilter.value === '2000' && movie.year >= 2000 && movie.year < 2010) ||
                (yearFilter.value === 'before2000' && movie.year < 2000);

            return genreMatch && ratingMatch && yearMatch;
        });

        // Pagination calculations
        const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
        currentPage = Math.min(currentPage, totalPages);

        // Render movies for current page
        const startIndex = (currentPage - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        const pageMovies = filteredMovies.slice(startIndex, endIndex);

        // Update grid
        moviesGrid.innerHTML = pageMovies.map(createMovieCardHTML).join('');

        // Update pagination
        currentPageSpan.textContent = currentPage;
        totalPagesSpan.textContent = totalPages;
        
        // Update pagination buttons
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    // Event Listeners for Filters
    [genreFilter, ratingFilter, yearFilter].forEach(filter => {
        filter.addEventListener('change', () => {
            currentPage = 1;
            renderMovies();
        });
    });

    // Pagination Event Listeners
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderMovies();
        }
    });

    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderMovies();
        }
    });

    // Initial render
    renderMovies();
});