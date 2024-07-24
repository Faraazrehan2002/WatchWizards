const global = {
    currentPage: window.location.pathname,
    search: {
        term: '',
        type: '',
        page: 1,
        totalPages: 1,
    },
    api: {
        api_key: '1425d005db001f914cf3740055f9de84',
        api_url: 'https://api.themoviedb.org/3',
    },
};

async function displayPopularMovies(){
    const { results } = await fetchAPIData('movie/popular');
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <div>
                <a href="movie-details.html?id=${movie.id}">
                    ${
                        movie.poster_path?`<img
                        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                        class="card-img-top"
                        alt="${movie.title}"
                        />`:
                        `<img
                        src="images/no-image.jpg"
                        class="card-img-top"
                        alt="${movie.title}"
                        />`
                    }
                </a>
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">
                    <small class="text-muted">Release: ${movie.release_date}</small>
                    </p>
                </div>
                </div>`;
        document.querySelector('#popular-movies').appendChild(div);
    });
}


async function displayPopularShows(){
    const { results } = await fetchAPIData('tv/popular');
    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <div>
            <a href="tv-details.html?id=${show.id}">
                ${
                    show.poster_path?
                    `<img
                    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                    class="card-img-top"
                    alt="${show.name}"
                    />`:
                    `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="${show.name}"
                    />`
                }
            </a>
            <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">
                <small class="text-muted">Aired: ${show.first_air_date}</small>
                </p>
            </div>
            </div>`;
        document.querySelector('#popular-shows').appendChild(div);
    });
}

async function displayMovieDetails(){
    const movieId = window.location.search.split('=')[1];
    const movie = await fetchAPIData(`movie/${movieId}`);
    displayBackgroundImage('movie', movie.backdrop_path);
    const div = document.createElement('div');
    div.classList.add('details-top');
    div.innerHTML = `
    <div>
          <div>
            ${movie.backdrop_path? 
                `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
                />`:
                `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
                />`
            }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => {
                return `<li>${genre.name}</li>`
              }).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${movie.budget.toLocaleString()}</li>
            <li><span class="text-secondary">Revenue:</span> $${movie.revenue.toLocaleString()}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime}mins</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
              ${movie.production_companies.map((company) => {
                return `<span>${company.name}</span>`
              }).join(', ')}
          </div>
        </div>`;
    document.querySelector('#movie-details').appendChild(div);
}

async function displayShowDetails(){
    const showId = window.location.search.split('=')[1];
    const show = await fetchAPIData(`tv/${showId}`);
    displayBackgroundImage('tv', show.backdrop_path)
    const div = document.createElement('div');
    div.classList.add('details-top');
    div.innerHTML = `
    <div class="details-top">
          <div>
            ${show.poster_path?`<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
                />`:
                `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${show.name}"
                />`}
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => {
                return `<li>${genre.name}</li>`
              }).join(' ')}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Aired Episode:</span> ${show.last_episode_to_air.name}
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
              ${show.production_companies.map((company) => {
                return `<span>${company.name}</span>`
              }).join(', ')}
          </div>
        </div>`;
        document.querySelector('#show-details').appendChild(div);
}

async function displayNowPlayingMovies(){
    const { results } = await fetchAPIData('movie/now_playing');
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
            ${
                movie.poster_path?
                `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />`:
                `<img src="./images/no-image.jpg" alt="${movie.title}" />`
            }
            </a>
            <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
            </h4>
        `;
        document.querySelector('.swiper-wrapper').appendChild(div);
        initSwiper();
    });
}

async function displayNowPlayingShows(){
    const { results } = await fetchAPIData('tv/airing_today');
    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
            <a href="movie-details.html?id=${show.id}">
            ${
                show.poster_path?
                `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}" />`:
                `<img src="./images/no-image.jpg" alt="${show.name}" />`
            }
            </a>
            <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${show.vote_average.toFixed(1)} / 10
            </h4>
        `;
        document.querySelector('.swiper-wrapper').appendChild(div);
        initSwiper();
    });
}

async function search(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    global.search.type = urlParams.get('type');
    global.search.term = urlParams.get('search-term');
    if(global.search.term !== '' && global.search.term !== null){
        const { results } = await searchAPIData();
        console.log(results);
        results.forEach((result) => {
            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
                <div>
                    <a href="${
                        result.title?
                        `movie-details.html?id=${result.id}`:
                        `tv-details.html?id=${result.id}`
                    }">
                        ${
                            result.poster_path?
                            `<img src="https://image.tmdb.org/t/p/w500${result.poster_path}" class="card-img-top" alt="${result.title}" />`:
                            `<img src="images/no-image.jpg" class="card-img-top" alt="${result.title}" />`
                        }
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${
                            result.title?
                            result.title:
                            result.name
                        }</h5>
                        <p class="card-text">
                            <small class="text-muted">${
                                result.release_date?
                                `Release: ${result.release_date}`:
                                `Aired: ${result.first_air_date}`
                            }</small>
                        </p>
                    </div>
                </div>
            `;
            document.querySelector('#search-results').appendChild(div);
        });
    }else{
        showAlert('Please enter a search term');
    }
}

async function fetchAPIData(endpoint){
    const API_KEY = global.api.api_key;
    const API_URL = global.api.api_url;
    showSpinner();
    const response = await fetch(`
        ${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US
    `);
    const data = await response.json();
    hideSpinner();
    return data;
}

async function searchAPIData(){
    const API_KEY = global.api.api_key;
    const API_URL = global.api.api_url;
    showSpinner();
    const response = await fetch(`
        ${API_URL}/search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}
    `);
    const data = await response.json();
    hideSpinner();
    return data;
}


function displayBackgroundImage(type, backdropPath){
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdropPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.2';
    if(type === 'movie'){
        document.querySelector('#movie-details').appendChild(overlayDiv);
    }else{
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}

function initSwiper(){
    const swiper = new Swiper('.swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            freeMode: true,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                500: {
                    slidesPerView: 2,
                },
                700: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 4,
                },
            },
        });
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

function showAlert(message, className){
    const div = document.createElement('div');
    div.classList.add('alert', className);
    div.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(div);
    setTimeout(() => {
        div.remove();
    }, 4000);
}

function highlightActiveLink(e){
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active');
        }
    });
}

function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            displayNowPlayingMovies();
            displayPopularMovies();
            break;
        case '/shows.html':
            displayNowPlayingShows();
            displayPopularShows();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayShowDetails();
            break;
        case '/search.html':
            search();
            break;
    }
    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);