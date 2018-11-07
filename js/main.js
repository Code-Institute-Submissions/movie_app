//Navbar functionality

// document.addEventListener('DOMContentLoaded', () => {
//    var elems = document.querySelectorAll('.sidenav');
//    var instances = M.Sidenav.init(elems, options);
//  });

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('first_name2');

// Form event listener
searchForm.addEventListener('submit', e => {
  // get search term
  const searchTerm = searchInput.value;
  // check for user input
  if (searchTerm === '') {
    // show message
    console.log('nothing entered');
  }

  // Clear input
  searchInput.value = '';

  // Search API
  getMovies(searchTerm);

  function getMovies(input){
    url = 'https://api.themoviedb.org/3/search/movie?'
    key = 'api_key=52156dec2ed75591f9df3d756e8dad42'
    axios.get(`${url}${key}&query=${input}`)
    // axios.get('https://api.themoviedb.org/3/discover/movie?with_genres=27&?primary_release_year=2000&sort_by=vote_average.desc&'+key)
      .then((response) => {
        console.log(response);
        let movies = response.data.results;
        let output = '';
        movies.forEach((movie) => {
          output += `
          <li class="collection-item avatar">
            <img src="images/yuna.jpg" alt="" class="circle">
            <span class="title">Title</span>
            <p>${movie.title} <br>
               ${movie.release_date}
            </p>
            <a href="#!" class="secondary-content"><i class="material-icons">movie</i></a>
          </li>`
        });
        results = document.getElementById('collection');
        results.innerHTML += output;
      })
      .catch((err) => {
        console.log(err);
      });
    // axios.get(`https://api.themoviedb.org/3/movie/550?api_key=52156dec2ed75591f9df3d756e8dad42`)
  }

  e.preventDefault();
});


// show message
function showMessage(message, className){
  // create div
  const div = document.createElement('div');
  // add classes
  div.className = `alert ${className}`;
  // create message text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const searchContainer = document.getElementById('search-container');
  // Element to insert before is searchForm
  // Insert message
  searchContainer.insertBefore(div, searchForm)
  // Fade out alert
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
};
