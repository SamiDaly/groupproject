import "./style.css";

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
const safePoster = (src: string) => (src && src !== "N/A" ? src : placeholderPoster);

/* === Baslayout === */
app.innerHTML = `
  <h1>🎬 Movie Search</h1>
  <div class="searchbar">
    <input id="search" type="text" placeholder="Search for a movie (e.g. batman, dune, avatar)..." />
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

/* === Detaljvy för EN film === */
async function loadDetails(imdbID: string) {
  showSection.innerHTML = `<p>Loading details...</p>`;
  try {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: OmdbMovieDetail = await res.json();

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

/* === Sök flera filmer === */
async function searchMovies(query: string) {
  moviesSection.innerHTML = `<p>Loading...</p>`;
  showSection.innerHTML = "";
  setHelper("");

  try {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: OmdbSearchResponse = await res.json();

    if (data.Response === "False") {
      moviesSection.innerHTML = `<p>No results for "${query}".</p>`;
      return;
    }

    moviesSection.innerHTML = data.Search
      .map(
        (m) => `
        <article class="movie-card" data-imdb="${m.imdbID}">
          <img src="${safePoster(m.Poster)}" alt="${m.Title}" />
          <h3>${m.Title}</h3>
          <p>${m.Year} · ${m.Type}</p>
        </article>
      `
      )
      .join("");

    setHelper(`Showing ${data.Search.length} result(s). Click a card to see details.`);

  } catch (err) {
    console.error(err);
    moviesSection.innerHTML = `<p style="color:red;">Something went wrong. ${(err as Error).message}</p>`;
  }
}

/* === Events === */
searchButton.addEventListener("click", () => {
  const q = searchInput.value.trim();
  if (!q) {
    setHelper("Type something to search (e.g. batman).");
    return;
  }
  searchMovies(q);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchButton.click();
});

moviesSection.addEventListener("click", (e) => {
  const card = (e.target as HTMLElement).closest<HTMLElement>(".movie-card");
  if (!card) return;
  const id = card.getAttribute("data-imdb");
  if (id) loadDetails(id);
});

/* === Förifyll med exempel === */
searchMovies("lord");
