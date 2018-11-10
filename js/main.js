function scrollTo(x, selector){
  // Scroll to specific values
  // scrollTo is the same
  window.scroll({
    top: 2500,
    left: 0,
    behavior: 'smooth'
  });

  // Scroll certain amounts from current position
  window.scrollBy({
    top: x, // could be negative value
    left: 0,
    behavior: 'smooth'
  });

  // Scroll to a certain element
  document.querySelector('selector').scrollIntoView({
    behavior: 'smooth'
  });
}





const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('first_name2');
const searchList = document.getElementById('searchResults');
const movieInfo = document.getElementById('movieInfo');

// Form event listener
searchForm.addEventListener('submit', e => {
  // get search term
  const searchTerm = searchInput.value;
  // check for user input
  if (searchTerm === '') {
    showMessage('Please enter search words');
    searchInput.value = '';
  }else {
    searchInput.value = '';
    getMovies(searchTerm);
    e.preventDefault();
  }
});


function getMovies(input){
  url = 'https://api.themoviedb.org/3/search/movie?';
  key = 'api_key=52156dec2ed75591f9df3d756e8dad42';
  let results = document.getElementById('collectionResults');
  axios.get(`${url}${key}&query=${input}`)
    .then((response) => {
      if (response.data.results.length > 0) {
        console.log(response);
        // document.getElementById('blankMovies').style.display = 'none';
        searchList.classList.remove('hide');
        let moviesArr = response.data.results;
        let limit = 5;
        let movies = moviesArr.slice(0, limit);
        let output = '<ul class="collection" id="collectionResults">';
        movies.forEach((movie) => {
          output += `
          <li class="collection-item avatar">
            <a onclick="getMovie('${movie.id}')"><img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" class="circle toggle"></a>
            <span class="title">Title</span>
            <p>${movie.title} <br>
               ${movie.release_date}
            </p>
            <a href="#!" onclick="getMovie('${movie.id}')" class="secondary-content toggle"><i class="material-icons green-text">open_in_new red</i></a>
          </li>`
        });
        output += '</ul>'
        results.innerHTML = output;
        // hide movie details on new search
        movieInfo.classList.add('hide');
        // Scroll to a certain element
        scrollTo(500, '#searchResults');
      }else {
        showMessage('No movie found, please try another search');
        console.log('cant find anything');
        document.getElementById('blankMovies').style.display = 'block';
      }
    })
    .catch((err) => {
      console.log(err);
    });
  // axios.get(`https://api.themoviedb.org/3/movie/550?api_key=52156dec2ed75591f9df3d756e8dad42`)
}

function getMovie(id){
  console.log(id);
  //clear the search list
  // searchList.classList.add('hide');
  // hide movie details on new search
  movieInfo.classList.remove('hide');
  url = `https://api.themoviedb.org/3/movie/${id}?api_key=52156dec2ed75591f9df3d756e8dad42&append_to_response=credits,images`;
  axios.get(url).then((response) => {
    console.log(response);
    let movieDetails = response.data;
    let output =
    `
    <div class="container">
      <div class="row">
        <div class="col s12 offset-s3 l4">
          <img class="responsive-img" src="https://image.tmdb.org/t/p/w300${movieDetails.poster_path}">
        </div>
        <div class="col s12 l8">
          <div class="card-panel grey lighten-5 z-depth-1">
            <h5>${movieDetails.title}<span class="badge blue-text">${movieDetails.vote_average * 10}%</span></h5>
            <blockquote class="">${movieDetails.tagline}</blockquote>
            <div class="divider"></div>
            <p>${movieDetails.overview}</p>
            <ul>
              <li>
                <i class="material-icons grey-text">schedule</i>
                <span class="">Released:</span>
                <span class="badge">${movieDetails.release_date}</span>
              </li>
              <li>
                <i class="material-icons grey-text">help_outline</i>
                <span class="">Genre:</span>
                <span class="badge">${movieDetails.genres[0].name}</span>
              </li>
              <li>
                <i class="material-icons grey-text">timer</i>
                <span class="">Runtime:</span>
                <span class="badge">${movieDetails.runtime} mins</span>
              </li>
              <li>
                <i class="material-icons grey-text">attach_money</i>
                <span class="">Boxoffice:</span>
                <span class="badge">$${movieDetails.revenue}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `;
    info = document.getElementById('movieInfo');
    info.innerHTML = output;
    scrollTo(600, '#movieInfo');
  })
  .catch((err) => {
    console.log(err);
  });
}






// show message
function showMessage(message){
  // create blockquote
  const blockquote = document.createElement('blockquote');
  // add classes
  blockquote.className = `center-align`;
  // create message text
  blockquote.appendChild(document.createTextNode(message));
  // Get the reference node
  const form = document.querySelector('#searchForm');
  // Element to insert after is searchForm
  // Insert the new node before the reference node
  form.after(blockquote);
  // Fade out alert
  setTimeout(() => document.querySelector('blockquote').remove(), 2000);
};
