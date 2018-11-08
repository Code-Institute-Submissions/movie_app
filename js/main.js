//Navbar functionality

// document.addEventListener('DOMContentLoaded', () => {
//    var elems = document.querySelectorAll('.sidenav');
//    var instances = M.Sidenav.init(elems, options);
//  });

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('first_name2');
const searchList = document.getElementById('searchResults');

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

  function checkForImg(){
    // console.log('hello');
    // console.log(res.data.results[0].id);
  }



  function getMovies(input){
    url = 'https://api.themoviedb.org/3/search/movie?';
    // url2 = `https://api.themoviedb.org/3/movie/${id}?${key}`;
    key = 'api_key=52156dec2ed75591f9df3d756e8dad42';
    axios.get(`${url}${key}&query=${input}`)
      .then((response) => {
        if (response.data.results.length > 0) {
          console.log(response);
          document.getElementById('blankMovies').style.display = 'none';
          searchList.classList.remove('hide');
          let moviesArr = response.data.results;
          let limit = 5;
          let movies = moviesArr.slice(0, limit);
          let output = '';
          movies.forEach((movie) => {
            output += `
            <li class="collection-item avatar">
              <a onclick="getMovie('${movie.id}')"><img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" class="circle toggle"></a>
              <span class="title">Title</span>
              <p>${movie.title} <br>
                 ${movie.release_date}
              </p>
              <a href="#!" onclick="getMovie('${movie.id}')" class="secondary-content toggle"><i class="material-icons">open_in_new</i></a>
            </li>`
          });
          results = document.getElementById('collectionResults');
          results.innerHTML = output;
        }else {
          results.innerHTML = ' ';
          document.getElementById('blankMovies').style.display = 'block';
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // axios.get(`https://api.themoviedb.org/3/movie/550?api_key=52156dec2ed75591f9df3d756e8dad42`)
  }
  e.preventDefault();
});


function getMovie(id){
  console.log(id);
  //clear the search list
  searchList.classList.add('hide');

  url = `https://api.themoviedb.org/3/movie/${id}?api_key=52156dec2ed75591f9df3d756e8dad42`;
  axios.get(url).then((response) => {
    console.log(response);
    let movieDetails = response.data;
    let output =
    `
    <div class="container">
      <div class="row">
        <div class="col s4">
          <img class="responsive-img" src="https://image.tmdb.org/t/p/w400${movieDetails.poster_path}">
        </div>
        <div class="col s8">
          <div class="card-panel grey lighten-5 z-depth-1">
            <h5>${movieDetails.title}<span class="badge">${movieDetails.vote_average}</span></h5>
            <blockquote class="">${movieDetails.tagline}</blockquote>
            <div class="divider"></div>
            <p>${movieDetails.overview}</p>
            <ul>
              <li>
                <i class="material-icons">filter_drama</i>
                <span class="">Year</span>
                <span class="badge">${movieDetails.release_date}</span>
              </li>
              <li>
                <i class="material-icons">filter_drama</i>
                <span class="">Genre</span>
                <span class="badge">Drama</span>
              </li>
              <li>
                <i class="material-icons">filter_drama</i>
                <span class="">Runtime</span>
                <span class="badge">${movieDetails.runtime}</span>
              </li>
              <li>
                <i class="material-icons">filter_drama</i>
                <span class="">Boxoffice</span>
                <span class="badge">${movieDetails.revenue}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `;
    info = document.getElementById('movieInfo');
    info.innerHTML = output;
  })
  .catch((err) => {
    console.log(err);
  });
}






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
