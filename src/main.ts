import "./style.css";

fetch("https://www.omdbapi.com/?s=tt3896198&apikey=768dbcda")
  .then((response) => response.json())

  .then((data) => {
    console.log(data);
  });

type Movie = {};

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
