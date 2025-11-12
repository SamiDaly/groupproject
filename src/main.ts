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
