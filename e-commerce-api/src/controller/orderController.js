const Response = require('../utils/response');
const OrderRepository = require('../domain/repositories/orderRepository');
const DeliveryRepository = require('../domain/repositories/deliveryRepository');
const CustomerRepository = require('../domain/repositories/customerRepository');
const PaymentRepository = require('../domain/repositories/paymentRepository');
const ROLES = require('../utils/constants/roles');
const PAYMENT_STATUS = require('../utils/constants/paymentStatus');

exports.getOrders = async (req, res) => {
    try {
        const user = req.user;
        if (user.role === ROLES.ADMIN) {
            const orders = await OrderRepository.getOrders();
            Response(res, 200, 'Get all orders retrieved successfully', orders);
        } else {
            const customer = await CustomerRepository.getCustomerByUser(user.userId);
            if (!customer) {
                Response(res, 404, 'Customer not found');
            }
            
            const orders = await OrderRepository.getOrdersByCustomer(customer.id);
            Response(res, 200, 'Get all orders retrieved successfully', orders);
        }
    } catch (err) {
      Response(res, 500, 'An error occurred while retrieving all orders', null, err.message);
    }
  }

exports.getOrder = async (req, res) => {
    try {
        const user = req.user;
        if (user.role === ROLES.ADMIN) {
            const order = await OrderRepository.getOrder(req.params.id);
            if (!order) {
                Response(res, 404, 'Order not found');
            }
            Response(res, 200, 'Order retrieved successfully', order);
        }
    }
    catch (err) {
        Response(res, 500, 'An error occurred while retrieving order', null, err.message);
    }

}

exports.createOrder = async (req, res) => {
    const session = await OrderRepository.startSession();
    try {
        const user = req.user;
        const items = req.body;
        const customer = await CustomerRepository.getCustomerByUser(user.userId);

        await session.withTransaction(async () => {
            let newOrder = await OrderRepository.createOrder({ customer, items });
            const delivery = await DeliveryRepository.createDelivery({ order: newOrder });

            const deliveryId = delivery._id;
            newOrder.delivery = deliveryId;
            const updatedOrder = await OrderRepository.updateOrder(newOrder.id, newOrder);

            Response(res, 201, 'Order created successfully', { order: updatedOrder, delivery });
        });
    } catch (err) {
        Response(res, 500, 'An error occurred while creating order', null, err.message);
    } finally {
        session.endSession();
    }
}

exports.createPayment = async (req, res) => {
    const session = await OrderRepository.startSession();
    try {
        const user = req.user;
        const { orderId, amount } = req.body;
        const customer = await CustomerRepository.getCustomerByUser(user.userId);

        await session.withTransaction(async () => {
            let order = await OrderRepository.getOrder(orderId);
            if (!order) {
                Response(res, 404, 'Order not found');
            }

            if (order.status === PAYMENT_STATUS.PAID) {
                Response(res, 400, 'Order has already been paid');
            }
            if (amount !== order.totalAmount) {
                Response(res, 400, 'Invalid payment amount');
            }

            const payment = await PaymentRepository.createPayment({ order, amount });
            if (!payment) {
                Response(res, 500, 'An error occurred while creating payment');
            }

            order.status = PAYMENT_STATUS.PAID;
            const updateOrder = await OrderRepository.updateOrder(order.id, order);
            if (!updateOrder) {
                Response(res, 500, 'An error occurred while updating order');
            }
            Response(res, 201, 'Payment created successfully', payment);
        });
    } catch (err) {
        Response(res, 500, 'An error occurred while creating payment', null, err.message);
    } finally {
        session.endSession();
    }
}