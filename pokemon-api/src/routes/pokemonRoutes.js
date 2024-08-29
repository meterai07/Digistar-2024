const express = require('express');
const PokemonController = require('../controllers/pokemonController');

const router = express.Router();
const pokemonController = new PokemonController();

router.get('/pokemon', (req, res) => pokemonController.getAllPokemon(req, res));
router.get('/pokemon/:id', (req, res) => pokemonController.getPokemonById(req, res));
router.post('/pokemon', (req, res) => pokemonController.postPokemon(req, res));
router.put('/pokemon/:id', (req, res) => pokemonController.updatePokemon(req, res));
router.patch('/pokemon/:id', (req, res) => pokemonController.patchPokemon(req, res));
router.delete('/pokemon/:id', (req, res) => pokemonController.deletePokemon(req, res));
router.head('/pokemon/:id', (req, res) => pokemonController.headPokemonById(req, res));
router.options('/pokemon', (req, res) => pokemonController.optionsPokemon(req, res));

module.exports = router;