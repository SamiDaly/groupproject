import "./style.css";

// API KEY: https://www.omdbapi.com/?i=tt3896198&apikey=768dbcda

const f = fetch("https://www.omdbapi.com/?i=tt3896198&apikey=768dbcda");
f.then((response) => response.json());
f.then(() => {});

console.log(f);
