document.addEventListener('DOMContentLoaded', (e) => {
  navigator();
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
  getTrendingMoviesPreview();
  getCategoriesList();
}