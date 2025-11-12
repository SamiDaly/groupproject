import "./style.css";

fetch("https://www.omdbapi.com/?s=tt3896198&apikey=768dbcda")
  .then((response) => response.json())

  .then((data) => {
    console.log(data);
  });

const Movie = () => {
  const section = document.getElementById("show");

  const div = document.createElement("div");
  const diva = document.createElement("div");
  const image = document.createElement("img");
  const p = document.createElement("p");

  diva.appendChild(div);
  div.appendChild(p);
  div.appendChild(image);
  image.appendChild(p);
  console.log(Movie);
};
