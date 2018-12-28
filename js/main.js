$(document).ready(() => {
  $('.sidenav').sidenav();
})

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
  document.querySelector(selector).scrollIntoView({
    behavior: 'smooth'
  });
}

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('first_name2');
const searchList = document.getElementById('searchResults');
const movieInfo = document.getElementById('movieInfo');
const castInfo = document.getElementById('cast');
const nowPlaying = document.getElementById('nowPlaying');
const api_key = 'api_key=52156dec2ed75591f9df3d756e8dad42';


// Form event listener
searchForm.addEventListener('submit', e => {
  // hide cast details on new search
  castInfo.classList.add('hide');
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
        searchList.classList.remove('hide');
        let moviesArr = response.data.results;
        let limit = 5;
        let movies = moviesArr.slice(0, limit);
        let output = `
        <div class="row">
          <div class="col s12">
            <ul class="collection" id="collectionResults">`
        movies.forEach((movie) => {
          output += `
          <li class="collection-item avatar">
            <a onclick="getMovie('${movie.id}')"><img src="https://image.tmdb.org/t/p/w200${movie.poster_path}"
            onerror="this.onerror=null;this.src='noimage.png';"
            alt="${movie.title}" class="circle toggle"></a>
            <span class="title">Title</span>
            <p>${movie.title} <br>
               ${movie.release_date}
            </p>
            <a href="#!" onclick="getMovie('${movie.id}')" class="secondary-content toggle"><i class="material-icons green-text">open_in_new red</i></a>
          </li>`
        });
        output +=
           `</ul>
          </div>
        </div>`
        results.innerHTML = output;
        // hide movie details on new search
        movieInfo.classList.add('hide');
        // Scroll to a certain element
        scrollTo(500, '#searchResults');
      }else {
        showMessage('No movie found, please try another search');
        document.getElementById('blankMovies').style.display = 'block';
      }
    })
    .catch((err) => {
      console.log(err);
    });
}


function hideCast(){
  castInfo.classList.add('hide');
}

function hideMovie(){
  movieInfo.classList.remove('hide');
}


function getMovie(id){
  // hide cast details on new search
  hideCast()
  // castInfo.classList.add('hide');
  // hide movie details on new search
  hideMovie()
  // movieInfo.classList.remove('hide');
  url = `https://api.themoviedb.org/3/movie/${id}?api_key=52156dec2ed75591f9df3d756e8dad42&append_to_response=credits,images,reviews,similar`;

  axios.get(url).then((response) => {
    let movieDetails = response.data;
    let castDetails = response.data.credits;
    let output =
    `
    <div class="container">
      <div class="row">
        <div class="col s12 l4">
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
                <span class=""><p class="movDet">Released:</p></span>
                <span class="badge">${movieDetails.release_date}</span>
              </li>
              <li>
                <i class="material-icons grey-text">videocam</i>
                <span class="">Director:</span>
                <span class="badge">${movieDetails.credits.crew[0].name}</span>
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
            <a onclick="showCast()" class="waves-effect waves-light blue btn">Cast</a>
          </div>
        </div>
      </div>
    </div>
    `;
    info = document.getElementById('movieInfo');
    info.innerHTML = output;
    getCast(castDetails)
    scrollTo(600, '#movieInfo');
  })
  .catch((err) => {
    console.log(err);
  });
}



function showCast(){
  cast = document.getElementById('cast');
  cast.classList.remove('hide');
  scrollTo(300, '#cast');
}



function getCast(data){
  let castArr = data.cast;
  let limit = 8;
  let cast = castArr.slice(0, limit);
  let output = `
  <div class="container">
    <div class="row actors" id="actors">`;
  cast.forEach((actor) => {
    output += `
    <div class="col s12 m4 l3 actor">
      <div class="card medium">
        <div class="card-image moviestar waves-effect waves-block waves-light">
          <img class="activator" src="https://image.tmdb.org/t/p/w300${actor.profile_path}"
          onclick="getDiscog(${actor.id})">
        </div>
        <div class="card-content">
          <span class="card-title activator disc grey-text text-darken-4" onclick="getDiscog(${actor.id})">${actor.name}<i  class="material-icons right">more_vert</i></span>
          <h6 class="blue-text">${actor.character}</h6>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${actor.name}<i class="material-icons right close-history">close</i></span>
          <h6>Other movies</h6>
          <ul class="history">

          </ul>
        </div>
      </div>
    </div>`
  });
  output += `
    </div>
  </div>`;
  castInfo.innerHTML = output;
}



function getDiscog(id){
  url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=52156dec2ed75591f9df3d756e8dad42&language=en-US`
  axios.get(url)
    .then((response) => {
      let output = '';
      let historyArr = response.data.cast;
      let limit = 8;
      let movies = historyArr.slice(0, limit);
      movies.forEach((movie) => {
        let name = movie.title;
        output += `
          <li class="grey-text">${name}</li>`;
      })
      showHistory(output);
    })
    .catch((err) => {
      console.log(err);
    })
}



function showHistory(list){
  console.log(list);
  const uls = document.querySelectorAll('.history');
  uls.forEach((ul) => {
    ul.innerHTML = '';
    ul.innerHTML = list;
  })
}




// show message when nothing entered/nothing found
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


// Now Showing

function nowShowing(){
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=52156dec2ed75591f9df3d756e8dad42&language=en-US&page=1`
  const base = 'https://image.tmdb.org/t/p/w500/'
  axios.get(url)
    .then((response) => {
      let output = '';
      let showing = response.data.results;
      let limit = 12;
      let movies = showing.slice(0, limit);
      console.log(movies);
      movies.forEach((movie) => {
        let name = movie.title;
        let img = movie.backdrop_path;
        let id = movie.id;
        output += `
        <div class="col s12 m6 l4">
          <div class="card">
            <div class="card-image">
              <img src="${base}${img}">
              <span class="card-title mov-showing">${name}</span>
            </div>
            <div class="card-action">
              <a onclick="getMovie('${id}')">Movie Details</a>
            </div>
          </div>
        </div>`;
      })
      nowPlaying.innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    })
}

nowShowing();

// Popular Movies Carousel
$(document).ready(() => {
  $('.carousel').carousel();

  $('.carousel.carousel-slider').carousel({
    dist: 0,
    padding: 0,
    fullWidth: true,
    indicators: true,
    duration: 1100
  });

  setInterval(() => {
    $('.carousel').carousel('next');
  }, 4000);
});
