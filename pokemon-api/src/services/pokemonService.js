const axios = require('axios');
const PokemonInterface = require('../interfaces/pokemonInterface');

class PokemonService extends PokemonInterface {
    constructor() {
        super();
        this.apiUrl = 'https://pokeapi.co/api/v2/pokemon';
    }

    async getAllPokemon() {
        const response = await axios.get(this.apiUrl);
        return response.data.results;
    }

    async getPokemonById(id) {
        const response = await axios.get(`${this.apiUrl}/${id}`);
        return response.data;
    }
}

module.exports = PokemonService;