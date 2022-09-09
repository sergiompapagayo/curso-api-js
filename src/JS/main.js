const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  }
});

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      const url = entry.target.getAttribute('data-image');
      entry.target.setAttribute('src', url);
    }
  }) 
});

function renderMovies(array, container, lazyLoad = false) {
  container.innerHTML = ``;
  array.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImage = document.createElement('img');
    movieImage.setAttribute('id', `id${movie.id}`);
    movieImage.classList.add('movie-img');
    movieImage.setAttribute(
      lazyLoad ? 'data-image' : 'src',
      `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);
    movieImage.setAttribute('alt', movie.title);

    if(lazyLoad) lazyLoader.observe(movieImage);

    movieContainer.appendChild(movieImage);
    container.appendChild(movieContainer);
  });
}

const getTrendingMoviesPreview = async() => {
  try {
    const response = await api.get('/trending/movie/day');
    const trendingMovies = response.data.results;
    renderMovies(trendingMovies, $trendingPreviewMovieList, true);
  } catch(error) {
    alert(error);
  }
}

const getTrendingMovies = async() => {
  try {
    const response = await api.get('/trending/movie/day');
    const trendingMovies = response.data.results;
    renderMovies(trendingMovies, $genericSection, true);
  } catch(error) {
    alert(error);
  }
}

const getCategoriesList = async() => {
  try {
    const response = await api.get('/genre/movie/list');
    const categories = response.data.genres;
    $categoriesPreviewMovieList.innerHTML = ``;
    categories.forEach(category => {
      $categoriesPreviewMovieList.innerHTML += 
      `
      <div class="category-container">
      <h3 id="id${category.id}" class="category-title">${category.name}</h3>
      </div>
      `;
    });
  } catch(error) {
    alert(error);
  }
}

const getMoviesByCategory = async(id) => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: id,
      }
    });
    const moviesByCategory = response.data.results;
    renderMovies(moviesByCategory, $genericSection);
  } catch(error) {
    alert(error);
  }
}

const getMoviesBySearch = async(query) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query
      }
    });
    const moviesByCategory = response.data.results;
    renderMovies(moviesByCategory, $genericSection);
  } catch(error) {
    alert(error);
  }
}

const getMoviebyId = async(id) => {
  try {
    const response = await api.get('/movie/' + id);
    const movie = response.data;
    $movieDetailTitle.textContent = movie.original_title;
    $movieDetailScore.textContent = movie.vote_average;
    $movieDetailDescription.textContent = movie.overview;
    $headerSection.style.background = `
      linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
      ), 
      url("https://image.tmdb.org/t/p/w500/${movie.poster_path}")
    `;
    $movieDetailCategoriesList.innerHTML = ``;
    movie.genres.forEach(category => {
      $movieDetailCategoriesList.innerHTML += 
      `
      <div class="category-container">
      <h3 id="id${category.id}" class="category-title">${category.name}</h3>
      </div>
      `;
    });
  } catch(error) {
    alert(error);
  }
}

const getRelatedMovies = async(id) => {
  try {
    const { data } = await api.get(`/movie/${id}/recommendations`);
    const movies = data.results;
    renderMovies(movies, $relatedMovies);

  } catch(error) {
    alert(error);
  }
}