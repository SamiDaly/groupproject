import "./style.css";

fetch("https://www.omdbapi.com/?s=tt3896198&apikey=768dbcda")
  .then((response) => response.json())
  .then((data: OmdbResponse) => {
    createHtml(data.Search);
  });

const Movie = () => {
  const section = document.getElementById("show");
  const movie = document.getElementById("movies");

  for (let i = 0; i < Movie.length; i++) {
    const movie = [i];

    const div = document.createElement("div");

    const img = document.createElement("img");

    const p = document.createElement("p");

    // lägg till elementen i div
    div.appendChild(p);
    div.appendChild(img);
    div.appendChild(p);

    // lägg till div i containern
    div.appendChild(div);
  }
};

// API KEY: https://www.omdbapi.com/?i=tt3896198&apikey=768dbcda

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
};
