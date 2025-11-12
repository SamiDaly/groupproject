import "./style.css";

async function loadMovie() {
  try {
    const res = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=768dbcda");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log("OMDb data:", data);
  } catch (err) {
    console.error("Fel vid hämtning:", err);
  }
}

loadMovie();
