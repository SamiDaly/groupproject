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
  }
}

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
