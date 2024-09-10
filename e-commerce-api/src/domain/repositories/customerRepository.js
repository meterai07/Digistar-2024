const Customer = require('../../domain/models/customerModel');

exports.getCustomerByUser = async (req) => {
    try {
        const customer = await Customer.findOne({ user: req });
        console.log(customer);
        
        if (!customer) {
            return null;
        }
        return customer;
    } catch (err) {
        return err;
    }
}

exports.getCustomers = async () => {
    try {
        const customers = await Customer.find();
        return customers;
    } catch (err) {
        return err;
    }
}