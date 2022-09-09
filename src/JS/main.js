const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  }
});

function renderMovies(array, container) {
  container.innerHTML = ``;
  array.forEach(movie => {
    container.innerHTML += 
    `
    <div class="movie-container">
      <img
        src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
        id="id${movie.id}"
        class="movie-img"
        alt="${movie.title}"
      />
    </div>
    `;
  });
}

const getTrendingMoviesPreview = async() => {
  try {
    const response = await api.get('/trending/movie/day');
    const trendingMovies = response.data.results;
    renderMovies(trendingMovies, $trendingPreviewMovieList);
  } catch(error) {
    alert(error);
  }
}

const getTrendingMovies = async() => {
  try {
    const response = await api.get('/trending/movie/day');
    const trendingMovies = response.data.results;
    renderMovies(trendingMovies, $genericSection);
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