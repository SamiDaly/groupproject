import "./style.css";

fetch("https://www.omdbapi.com/?s=tt3896198&apikey=768dbcda")
  .then((response) => response.json())

  .then((data) => {
    console.log(data);
  });

/**
  const section = document.getElementById("show");

  const Movie = () => {

  const Movies = innerHtml 


  for(let i = 0; i < length.data; i++ {
    const div = document.createElement("div");
    const diva = document.createElement("div");
    const image = document.createElement("img");
    const p = document.createElement("p");




    div.appendChild(diva);
    div.appendChild(diva);
    div.appendChild(image);
    p.appendChild(image);
    console.log(Movie);

  })


};
 */
// API KEY: https://www.omdbapi.com/?i=tt3896198&apikey=768dbcda

fetch("http://www.omdbapi.com/?apikey=768dbcda&s=lord")
  .then((response) => response.json())
  .then((data: OmdbResponse) => {
    createHtml(data.Search);
  });

type Movie = {
  Poster: string;
  Title: string;
  isSelected: boolean;
};

type OmdbResponse = {
  Search: Movie[];
  totalResults: string;
};

const createHtml = (movies: Movie[]) => {
  const moviesSection = document.getElementById("movies");

  if (moviesSection) {
    moviesSection.innerHTML = "";
  }

  movies.forEach((movie, i) => {
    const movieContainer = document.createElement("div");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h2");

    img.src = movie.Poster;
    img.alt = movie.Title;
    title.innerHTML = movie.Title;
    movieContainer.className = "movie";
    imgContainer.className = "img-container";

    imgContainer.appendChild(img);
    movieContainer.appendChild(title);
    movieContainer.appendChild(imgContainer);
    moviesSection?.appendChild(movieContainer);
  });
};
