const express = require("express");
const bodyParser = require("body-parser");
let pokemons = require("./mock-pokemon");
let { success, getUniqueId } = require("./helper");
const { squelize, Sequelize } = require("sequelize");
const morgan = require("morgan");
const favicon = require("serve-favicon");

/*const { error } = require("./error");*/
//const {pokemonError} = require("./mock-pokemon-error")

const app = express();
const port = 3000;
const sequelize = new Sequelize("root", "root", "", {
  host: "localhost",
  dialect: "pg",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});
//Miidleware router 1
/* const logger = (req, res, next) => {
  console.log(`URL : ${req.url}`);
  next();
};*/
//Racourcis sans logger (Middleware router 2)
/* app.use((req, res, next) => {
  console.log(`URL ${req.url}`);
  next();
});*/

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

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
app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Le pokemon ${pokemonCreated.name} a été bien créé.`;
  res.json(success(message, pokemonCreated));
});
app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedPokemons = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? updatedPokemons : pokemon;
    const message = `Votre pokemon ${updatedPokemons.name} a été bien modifié.`;
    res.json(success(message, updatedPokemons));
  });
});
app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonsDelete = pokemons.find((pokemon) => (pokemon.id = id));
  pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `Le pokemon ${pokemonsDelete.name} a été supprimé avec succès`;
  res.json(success(message, pokemonsDelete));
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur le port : http://localhost:${port}`
  )
);
