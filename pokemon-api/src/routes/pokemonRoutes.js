const express = require('express');
const PokemonController = require('../controllers/pokemonController');

const router = express.Router();
const pokemonController = new PokemonController();

router.get('/pokemon', (req, res) => pokemonController.getAllPokemon(req, res));
router.get('/pokemon/:id', (req, res) => pokemonController.getPokemonById(req, res));

module.exports = router;