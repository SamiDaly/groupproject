import "./style.css";

<<<<<<< HEAD
/* === Typer === */
type OmdbSearchItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type OmdbSearchResponse =
  | { Response: "True"; Search: OmdbSearchItem[]; totalResults: string }
  | { Response: "False"; Error: string };

type OmdbMovieDetail = {
  Title: string;
  Year: string;
  Plot?: string;
  Genre?: string;
  Runtime?: string;
  Poster: string;
  imdbRating?: string;
  imdbVotes?: string;
  Response: "True" | "False";
  Error?: string;
};

/* === Hjälpare === */
const app = document.querySelector<HTMLDivElement>("#app")!;
function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  opts: { className?: string; text?: string } = {}
) {
  const node = document.createElement(tag);
  if (opts.className) node.className = opts.className;
  if (opts.text) node.textContent = opts.text;
  return node;
}

const API_KEY = "768dbcda";
const placeholderPoster = "/vite.svg";

const safePoster = (src: string) =>
  src && src !== "N/A" ? src : placeholderPoster;

/* === Render-detalj för EN film (i) === */
async function loadMovieDetail() {
  app.innerHTML = "<h2>Laddar filmdata...</h2>";

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&plot=full`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: OmdbMovieDetail = await res.json();

    if (data.Response === "False") {
      app.innerHTML = `<p style="color:red;">Fel: ${data.Error ?? "Okänt fel"}</p>`;
      return;
    }

    // Bygg detaljvyn
    const wrapper = el("div");
    const h1 = el("h1", { text: data.Title });
    const pYear = el("p", { text: `År: ${data.Year}` });
    const img = el("img") as HTMLImageElement;
    img.src = safePoster(data.Poster);
    img.alt = data.Title;
    img.className = "logo vanilla";

    const meta = el("p", {
      text: [data.Runtime, data.Genre].filter(Boolean).join(" · "),
    });
    const rating = el("p", {
      text: data.imdbRating ? `IMDb: ${data.imdbRating} (${data.imdbVotes ?? "0"} röster)` : "",
    });
    const plot = el("p", { text: data.Plot ?? "" });

    wrapper.append(h1, pYear, img, meta, rating, plot);
    app.innerHTML = "";
    app.appendChild(wrapper);
  } catch (err) {
    app.innerHTML = `<p style="color:red;">Fel: ${(err as Error).message}</p>`;
=======
fetch("https://www.omdbapi.com/?s=tt3896198&apikey=768dbcda");
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
>>>>>>> bd5dbd5798e959bd2db9bc471f031e6f28160717
  }
};

<<<<<<< HEAD
/* === Lista FLERA filmer (sök s=) === */
async function loadMoviesList(query: string) {
  // Skapa/återanvänd en sektion under detaljvyn
  let listSection = document.querySelector<HTMLElement>("#movies");
  if (!listSection) {
    listSection = el("section") as HTMLElement;
    listSection.id = "movies";
    listSection.className = "movies-grid";
    app.appendChild(listSection);
  }
  listSection.innerHTML = "<p>Laddar sökresultat...</p>";

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: OmdbSearchResponse = await res.json();

    if (data.Response === "False") {
      listSection.innerHTML = `<p>Inga resultat för "${query}".</p>`;
      return;
    }

    // Bygg kort
    listSection.innerHTML = "";
    data.Search.forEach((m) => {
      const card = el("article", "movie-card");
      const poster = el("img") as HTMLImageElement;
      poster.src = safePoster(m.Poster);
      poster.alt = m.Title;

      const title = el("h3", { text: m.Title });
      const meta = el("p", { text: `${m.Year} · ${m.Type}` });

      card.append(poster, title, meta);
      listSection!.appendChild(card);
    });
  } catch (err) {
    listSection.innerHTML = `<p style="color:red;">Fel: ${(err as Error).message}</p>`;
  }
}

/* === Starta === */
(async () => {
  await loadMovieDetail();   // visar en film med i=...
  await loadMoviesList("lord"); // listar sökresultat för "lord"
})();
=======
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
>>>>>>> bd5dbd5798e959bd2db9bc471f031e6f28160717
