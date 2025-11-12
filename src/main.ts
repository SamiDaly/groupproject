import "./style.css";

// async function loadMovie() {
//   const app = document.querySelector<HTMLDivElement>("#app")!;
//   app.innerHTML = "<h2>Laddar filmdata...</h2>";

//   try {
//     const res = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=768dbcda");
//     if (!res.ok) throw new Error("Kunde inte hämta data");
//     const data = await res.json();

//     app.innerHTML = `
//       <h1>${data.Title}</h1>
//       <p>År: ${data.Year}</p>
//       <img src="${data.Poster}" alt="${data.Title}" class="logo vanilla" />
//     `;
//   } catch (err) {
//     app.innerHTML = `<p style="color:red;">Fel: ${(err as Error).message}</p>`;
//   }
// }

//   const Movie = () => {

//   const Movies = innerHtml

//   for(let i = 0; i < length.data; i++ {
//     const div = document.createElement("div");
//     const diva = document.createElement("div");
//     const image = document.createElement("img");
//     const p = document.createElement("p");

//     div.appendChild(diva);
//     div.appendChild(diva);
//     div.appendChild(image);
//     p.appendChild(image);
//     console.log(Movie);

//   })

// };
// loadMovie();

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
