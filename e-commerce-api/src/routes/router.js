const express = require('express');

const router = express.Router();

const authController = require('../controller/authController');
const userController = require('../controller/userController');
const orderController = require('../controller/orderController');
const itemController = require('../controller/itemController');
const customerController = require('../controller/customerController');
const authMiddleware = require('../middlewares/authMiddleware');

// user
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.put('/users', authMiddleware, userController.updateUser);
router.delete('/users', authMiddleware, userController.deleteUser);

// order 
router.get('/orders', authMiddleware, orderController.getOrders);
router.get('/orders/:id', authMiddleware, orderController.getOrder);
router.post('/orders', authMiddleware, orderController.createOrder);
router.post('/orders/payments', authMiddleware, orderController.createPayment);

// role (admin only)
router.get('/roles', authMiddleware, userController.getRoles);

// item
router.get('/items', itemController.getItems);

// customer
router.get('/customers', authMiddleware, customerController.getCustomers);

module.exports = router;