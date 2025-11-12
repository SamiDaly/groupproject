import "./style.css";

// API KEY: https://www.omdbapi.com/?i=tt3896198&apikey=768dbcda

fetch("https://www.omdbapi.com/?i=tt3896198&apikey=768dbcda")
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
};
