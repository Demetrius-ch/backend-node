const express = require("express");
let pokemons = require("./mock-pokemon");
let { success } = require("./helper");
/*const { error } = require("./error");
const {pokemonError} = require("./mock-pokemon-error")*/

const app = express();
const port = 3000;
//Miidleware router 1
/* const logger = (req, res, next) => {
  console.log(`URL : ${req.url}`);
  next();
};*/
//Racourcis sans logger (Middleware router 2)
app.use((req, res, next) => {
  console.log(`URL ${req.url}`);
  next();
});

app.get("/", (req, res) => res.send("Hello express 3  !"));
app.get("/api/pokemons", (req, res) => {
  const message = "La liste des pokémons a été bien récupérée. ";
  res.json(success(message, pokemons));
});

app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  /* if (!pokemon) {
    const message = "L'id de ce pokemons n'existe pas."
    res.json(error(message, pokemonError))
  }*/
  const message = "Un pokemon a bien été trouvé. ";
  res.json(success(message, pokemon));
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur le port : http://localhost:${port}`
  )
);
