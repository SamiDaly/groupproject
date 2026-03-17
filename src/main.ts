import "./style.css";
import { el, safePoster } from "./htmlUtils/utils";
import { fetchMovies, fetchMovieDetails } from "./apiKey/api";
import type { OmdbMovieDetail, OmdbSearchResponse } from "./Types/type";

// Baslayout
const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
  <h1>🎬 Movie Search</h1>
  <div class="searchbar">
    <input id="search" type="text" placeholder="Search for a movie..." />
    <button id="btn">Search</button>
  </div>
  <p class="helper" id="helper"></p>
  <section id="movies" class="movies-grid"></section>
  <section id="show"></section>
`;

const searchInput = document.querySelector<HTMLInputElement>("#search")!;
const searchButton = document.querySelector<HTMLButtonElement>("#btn")!;
const helperText = document.querySelector<HTMLElement>("#helper")!;
const moviesSection = document.querySelector<HTMLElement>("#movies")!;
const showSection = document.querySelector<HTMLElement>("#show")!;

function setHelper(msg: string) {
  helperText.textContent = msg;
}

// Render-funktion för flera filmer
function renderMovies(data: OmdbSearchResponse) {
  if (data.Response === "False") {
    moviesSection.innerHTML = `<p>No results.</p>`;
    return;
  }

  moviesSection.innerHTML = data.Search.map(
    (m) => `
      <article class="movie-card" data-imdb="${m.imdbID}">
        <img src="${safePoster(m.Poster)}" alt="${m.Title}" />
        <h3>${m.Title}</h3>
        <p>${m.Year} · ${m.Type}</p>
      </article>
    `,
  ).join("");
}

// Render-funktion för detaljvy
async function loadDetails(imdbID: string) {
  showSection.innerHTML = `<p>Loading details...</p>`;
  try {
    const data: OmdbMovieDetail = await fetchMovieDetails(imdbID);

    if (data.Response === "False") {
      showSection.innerHTML = `<p style="color:red;">Could not load details${data.Error ? `: ${data.Error}` : ""}.</p>`;
      return;
    }

    const wrapper = el("div", { className: "details" });
    const img = el("img") as HTMLImageElement;
    img.src = safePoster(data.Poster);
    img.alt = data.Title;

    const right = el("div");
    const h2 = el("h2", { text: data.Title });
    const meta = el("p", {
      className: "meta",
      text: [data.Year, data.Runtime, data.Genre].filter(Boolean).join(" · "),
    });
    const imdb = el("p", {
      text: data.imdbRating ? `IMDb: ${data.imdbRating} (${data.imdbVotes ?? "0"} votes)` : "",
    });
    const plot = el("p", { text: data.Plot ?? "" });

    right.append(h2, meta, imdb, plot);
    wrapper.append(img, right);
    showSection.innerHTML = "";
    showSection.appendChild(wrapper);
    showSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (err) {
    showSection.innerHTML = `<p style="color:red;">Failed to load details. ${(err as Error).message}</p>`;
  }
}

// Initiala filmer vid sidladdning
fetchMovies("lord")
  .then(renderMovies)
  .catch((err) => {
    console.error(err);
    setHelper("Failed to load initial movies.");
  });

// Sökfunktion
searchButton.addEventListener("click", () => {
  const q = searchInput.value.trim();
  if (!q) {
    setHelper("Type something to search.");
    return;
  }
  fetchMovies(q)
    .then(renderMovies)
    .catch(() => setHelper("Something went wrong."));
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchButton.click();
});

// Klick på filmkort för detaljvy
moviesSection.addEventListener("click", (e) => {
  const card = (e.target as HTMLElement).closest<HTMLElement>(".movie-card");
  if (!card) return;
  const id = card.getAttribute("data-imdb");
  if (id) loadDetails(id);
});
