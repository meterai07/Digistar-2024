const Order = require("../../domain/models/orderModel");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items");
    return orders;
  } catch (err) {
    return err;
  }
};

exports.getOrdersByCustomer = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req });
    return orders;
  } catch (err) {
    return err;
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req).populate("items");
    if (!order) {
      return null;
    }
    return order;
  } catch (err) {
    return err;
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { customer, items } = req;
    console.log(items);
    const order = new Order({
      customer,
      items: items.items,
      totalAmount: items.totalAmount,
      address: items.address,
      deliveryDate: items.deliveryDate,
    });
    await order.save();
    return order;
  } catch (err) {
    return err;
  }
};

exports.updateOrder = async (id, req) => {
  try {
    const order = await Order.findByIdAndUpdate (id, {
      status: req.status,
    }, { new: true });
    if (!order) {
      return null;
    }
    return order;
  }
  catch (err) {
    return err;
  }
}

exports.startSession = async () => {
  try {
    const session = await Order.startSession();
    return session;
  } catch (err) {
    return err;
  }
}
