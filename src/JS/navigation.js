window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

let id = '';
let category = '';

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
    id = e.target.id.slice(2);
    category = e.target.textContent;
    location.hash = `#category=${id}`;
  }
  document.documentElement.scrollTop = 0;
});


function navigator() {
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

  $genericSection.classList.add('inactive');

  $movieDetailSection.classList.add('inactive');

  getTrendingMoviesPreview();
  getCategoriesList();
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

  $genericSection.classList.remove('inactive');

  $movieDetailSection.classList.add('inactive');

  $headerCategoryTitle.textContent = category;
  const [_, categoryId] = location.hash.split('=');
  getMoviesByCategory(id);
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

  $genericSection.classList.add('inactive');

  $movieDetailSection.classList.remove('inactive');
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

  $genericSection.classList.remove('inactive');

  $movieDetailSection.classList.add('inactive');

  getMoviesBySearch($searchFormInput.value);
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

  $genericSection.classList.remove('inactive');

  $movieDetailSection.classList.add('inactive');
}