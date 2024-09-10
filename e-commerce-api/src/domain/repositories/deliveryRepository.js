const Delivery = require('../models/deliveryModel');

exports.createDelivery = async (req) => {
    try {
        const { order, address, status } = req;
        const delivery = new Delivery({ order, address, status });
        await delivery.save();
        return delivery;
    } catch (err) {
        return err;
    }
}