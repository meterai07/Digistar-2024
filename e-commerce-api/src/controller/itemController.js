const ItemRepository = require('../domain/repositories/itemRepository');
const Response = require('../utils/response');

exports.getItems = async (req, res) => {
    try {
        const items = await ItemRepository.getItems();
        Response(res, 200, 'Get all items retrieved successfully', items);
    } catch (err) {
        Response(res, 500, 'An error occurred while retrieving all items', null, err.message);
    }
}