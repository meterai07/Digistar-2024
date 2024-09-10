const customerRepository = require('../domain/repositories/customerRepository');
const Response = require('../utils/response');
const ROLES = require('../utils/constants/roles');

exports.getCustomers = async (req, res) => {
    try {
        let user = req.user;
        if (user.role == ROLES.ADMIN) {
            const customers = await customerRepository.getCustomers();
            Response(res, 200, 'Get all customers retrieved successfully', customers);
        } else {
            const customers = await customerRepository.getCustomerByUser(user.userId);
            Response(res, 200, 'Get all customers retrieved successfully', customers);
        }
    } catch (err) {
        Response(res, 500, 'An error occurred while retrieving all customers', null, err.message);
    }
}