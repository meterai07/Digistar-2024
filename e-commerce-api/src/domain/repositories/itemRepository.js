const Item = require('../models/itemModel');

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        return items;
    } catch (err) {
        return err;
    }
}

exports.getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return null;
        }

    } catch (err) {
        return err;
    }
}