const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  }
});

const getTrendingMoviesPreview = async() => {
  try {
    const response = await api.get('/trending/movie/day');
    const trendingMovies = response.data.results;
    $trendingPreviewMovieList.innerHTML = ``;
    trendingMovies.forEach(movie => {
      $trendingPreviewMovieList.innerHTML += 
      `
      <div class="movie-container">
        <img
          src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
          class="movie-img"
          alt="${movie.title}"
        />
      </div>
      `;
    });
  } catch(error) {
    alert(error);
  }
}

const getCategoriesList = async() => {
  try {
    const response = await api.get('/genre/movie/list');
    const categories = response.data.genres;
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
