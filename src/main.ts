import "./style.css";

async function loadMovie() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = "<h2>Laddar filmdata...</h2>";

  try {
    const res = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=768dbcda");
    if (!res.ok) throw new Error("Kunde inte hämta data");
    const data = await res.json();

    app.innerHTML = `
      <h1>${data.Title}</h1>
      <p>År: ${data.Year}</p>
      <img src="${data.Poster}" alt="${data.Title}" class="logo vanilla" />
    `;
  } catch (err) {
    app.innerHTML = `<p style="color:red;">Fel: ${(err as Error).message}</p>`;
  }
}

loadMovie();
