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

    async postPokemon(req, res) {
        const { name, type } = req.body;
        try {
            response(res, 201, 'Pokemon created successfully', []);
        } catch (error) {
            response(res, 500, 'An error occurred while creating Pokemon', null, error.message);
        }
    }

    async updatePokemon(req, res) {
        const { id } = req.params;
        const { name, type } = req.body;
        try {
            response(res, 200, 'Pokemon updated successfully', []);
        } catch (error) {
            response(res, 500, 'An error occurred while updating Pokemon', null, error.message);
        }
    }

    async patchPokemon(req, res) {
        const { id } = req.params;
        const { name, type } = req.body;
        try {
            response(res, 200, 'Pokemon updated successfully', []);
        } catch (error) {
            response(res, 500, 'An error occurred while updating Pokemon', null, error.message);
        }
    }

    async deletePokemon(req, res) {
        const { id } = req.params;
        try {
            response(res, 200, 'Pokemon deleted successfully', []);
        } catch (error) {
            response(res, 500, 'An error occurred while deleting Pokemon', null, error.message);
        }
    }

    async headPokemonById(req, res) {
        const { id } = req.params;
        try {
            response(res, 200, 'Pokemon header retrieved successfully', []);
        } catch (error) {
            response(res, 500, 'An error occurred while retrieving Pokemon header', null, error.message);
        }
    }

    async optionsPokemon(req, res) {
        const { id } = req.params;
        try {
            var options = ['GET', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
            response(res, 200, 'Pokemon options retrieved successfully', options);
        } catch (error) {
            response(res, 500, 'An error occurred while retrieving Pokemon options', null, error.message);
        }
    }
}

module.exports = PokemonController;