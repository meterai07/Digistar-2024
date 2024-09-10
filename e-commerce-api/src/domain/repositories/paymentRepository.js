const Payment = require('../models/paymentModel');

exports.createPayment = async (req) => {
    try {
        const { order, amount } = req;
        const status = 'Success';
        const payment = new Payment({ order, amount, status });
        await payment.save();
        return payment;
    } catch (err) {
        return err;
    }
}