let category = '';
let categoryId = '';
let movieId = '';
let infiniteSrcoll = undefined;
let page = 0;
let maxPages;

function navigator() {
  if(infiniteSrcoll) {
    window.removeEventListener('scroll', infiniteSrcoll, {passive: false});
    infiniteSrcoll = undefined;
  }
  if(location.hash.startsWith('#trends')) {
    trendsPage();
  } else if(location.hash.startsWith('#search=')) {
    searchPage();
  } else if(location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if(location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }
  if(infiniteSrcoll) {
    window.addEventListener('scroll', infiniteSrcoll, {passive: false});
  }
}
function homePage() {
  $headerSection.classList.remove('header-container--long');
  $headerSection.style.background = '';
  $headerHomeButton.classList.add('inactive');
  $headerTitle.classList.remove('inactive');
  $headerCategoryTitle.classList.add('inactive');
  $searchForm.classList.remove('inactive');

  $trendingPreviewSection.classList.remove('inactive');

  $categoriesPreviewSection.classList.remove('inactive');

  $favoritesMovieSection.classList.remove('inactive');

  $genericSection.classList.add('inactive');

  $movieDetailSection.classList.add('inactive');

  getTrendingMoviesPreview();
  getCategoriesList();
  getLikedMovies();
}
function categoriesPage() {
  $headerSection.classList.remove('header-container--long');
  $headerSection.style.background = '';
  $headerHomeButton.classList.remove('inactive');
  $headerTitle.classList.add('inactive');
  $headerCategoryTitle.classList.remove('inactive');
  $searchForm.classList.add('inactive');

  $trendingPreviewSection.classList.add('inactive');

  $categoriesPreviewSection.classList.add('inactive');

  $favoritesMovieSection.classList.add('inactive');

  $genericSection.classList.remove('inactive');

  $movieDetailSection.classList.add('inactive');

  $headerCategoryTitle.textContent = category;
  const [_, categoryId] = location.hash.split('=');
  getMoviesByCategory(categoryId);
  infiniteSrcoll = getMoreMoviesByCategory(categoryId);
}
function movieDetailsPage() {
  console.log('Movie Details Page');
  $headerSection.classList.add('header-container--long');
  $headerHomeButton.classList.remove('inactive');
  $headerTitle.classList.add('inactive');
  $headerCategoryTitle.classList.add('inactive');
  $searchForm.classList.add('inactive');

  $trendingPreviewSection.classList.add('inactive');

  $categoriesPreviewSection.classList.add('inactive');

  $favoritesMovieSection.classList.add('inactive');

  $genericSection.classList.add('inactive');

  $movieDetailSection.classList.remove('inactive');

  getMoviebyId(movieId);
  getRelatedMovies(movieId);
}
function searchPage() {
  $headerSection.classList.remove('header-container--long');
  $headerSection.style.background = '';
  $headerHomeButton.classList.remove('inactive');
  $headerTitle.classList.add('inactive');
  $headerCategoryTitle.classList.add('inactive');
  $searchForm.classList.remove('inactive');

  $trendingPreviewSection.classList.add('inactive');

  $categoriesPreviewSection.classList.add('inactive');

  $favoritesMovieSection.classList.add('inactive');

  $genericSection.classList.remove('inactive');

  $movieDetailSection.classList.add('inactive');

  getMoviesBySearch($searchFormInput.value);
  infiniteSrcoll = getMoreMoviesBySearch($searchFormInput.value);
}
function trendsPage() {
  $headerSection.classList.remove('header-container--long');
  $headerSection.style.background = '';
  $headerHomeButton.classList.remove('inactive');
  $headerTitle.classList.add('inactive');
  $headerCategoryTitle.classList.remove('inactive');
  $searchForm.classList.add('inactive');

  $trendingPreviewSection.classList.add('inactive');

  $categoriesPreviewSection.classList.add('inactive');

  $favoritesMovieSection.classList.add('inactive');

  $genericSection.classList.remove('inactive');

  $movieDetailSection.classList.add('inactive');

  $headerCategoryTitle.textContent = 'Tendencias';
  getTrendingMovies();
  infiniteSrcoll = getMoreTrendingMovies;
}

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteSrcoll, false);

document.addEventListener('click', (e) => {
  console.log(e.target);
  if(e.target.matches('.searchButton')) {
    location.hash = '#search=' + $searchFormInput.value;
  }
  if(e.target.matches('.trendingPreview-btn')) {
    location.hash = '#trends';
  }
  if(e.target.matches('.header-home-button')) {
    location.hash = '';
  }
  if(e.target.matches('.category-title')) {
    categoryId = e.target.id.slice(2);
    category = e.target.textContent;
    location.hash = `#category=${categoryId}`;
  }
  if(e.target.matches('.movie-img')) {
    movieId = e.target.id.slice(2);
    location.hash = `#movie=${movieId}`;
  }
  document.documentElement.scrollTop = 0;
});
