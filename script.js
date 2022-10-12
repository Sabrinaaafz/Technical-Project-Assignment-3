const Apikey = "api_key=2dc2ade6005b3ee1cb66b77dd48008eb";
const base = "https://api.themoviedb.org/3";
const Apiurl = base + "/discover/movie?sort_by=popularity.desc&" + Apikey;
const imageurl = "https://image.tmdb.org/t/p/w500";
const searchurl = base + "/search/movie?" + Apikey;
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const toggle = document.getElementById("toggleDark");
const body = document.querySelector("body");

toggle.addEventListener("click", function () {
  this.classList.toggle("bi-moon");
  if (this.classList.toggle("bi-brightness-high")) {
    body.style.background = "white";
    body.style.color = "black";
    body.style.transition = "2s";
  } else {
    body.style.background = "black";
    body.style.color = "white";
    body.style.transition = "2s";
  }
});

GetMovies(Apiurl);

function GetMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      ShowMovies(data.results);
    });
}

function ShowMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average } = movie;
    const Elmovie = document.createElement(`div`);
    Elmovie.classList.add(`movie`);
    Elmovie.innerHTML = `
    <img src="${imageurl + poster_path}" alt="${title}"/>
    
    <div class="movie-info">
      <h4>${title}</h4>
      <span class="${Getwarna(vote_average)}">${vote_average}</span>
    </div>`;

    main.appendChild(Elmovie);
  });
}

function Getwarna(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (s) => {
  s.preventDefault();

  const search2 = search.value;

  if (search2) {
    GetMovies(searchurl + "&query=" + search2);
  } else {
    GetMovies(Apiurl);
  }
});
