const PokemonService = require('../services/pokemonService');
const response = require('../utils/responseHandler');

class PokemonController {
    constructor() {
        this.pokemonService = new PokemonService();
    }

    async getAllPokemon(req, res) {
        try {
            const pokemon = await this.pokemonService.getAllPokemon();
            response(res, 200, 'All Pokemon retrieved successfully', pokemon);
        } catch (error) {
            response(res, 500, 'An error occurred while retrieving all Pokemon', null, error.message);
        }
    }

    async getPokemonById(req, res) {
        const { id } = req.params;
        try {
            const pokemon = await this.pokemonService.getPokemonById(id);
            response(res, 200, 'Pokemon retrieved successfully', pokemon);
        } catch (error) {
            response(res, 500, 'An error occurred while retrieving Pokemon', null, error.message);
        }
    }
}

module.exports = PokemonController;