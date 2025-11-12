import "./style.css";

fetch("https://www.omdbapi.com/?s=tt3896198&apikey=768dbcda")
  .then((response) => response.json())
  .then((data) => {});
