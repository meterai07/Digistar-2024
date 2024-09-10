const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../domain/models/userModel");
const Role = require("../domain/models/roleModel");
const Item = require("../domain/models/itemModel");
const Order = require("../domain/models/orderModel");
const Customer = require("../domain/models/customerModel");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedRoles = async () => {
  try {
    const roles = [{ name: "Admin" }, { name: "User" }, { name: "Customer" }];

    const existingRoles = await Role.find({});
    if (!existingRoles.length > 0) {
      await Role.insertMany(roles);
      console.log("Roles seeded successfully");
    }
  } catch (err) {
    console.error("Error seeding roles:", err.message);
    process.exit(1);
  }
};

const seedItems = async () => {
  try {
    const items = [
      { name: "Shoes", price: 100 },
      { name: "Handphone", price: 200 },
      { name: "Laptop", price: 300 },
    ];

    const existingItems = await Item.find({});
    if (!existingItems.length > 0) {
      await Item.insertMany(items);
      console.log("Items seeded successfully");
    }
  } catch (err) {
    console.error("Error seeding items:", err.message);
    process.exit(1);
  }
};

const seedOrders = async () => {
  try {
    const customers = await Customer.find({});
    const items = await Item.find({});

    if (!customers.length || !items.length) {
      console.log("Please seed customers and items before running this.");
      process.exit(1);
    }

    const orders = [
      {
        customer: customers[0]._id,
        items: [items[0]._id, items[1]._id],
        totalAmount: items[0].price + items[1].price,
        status: "pending",
      },
      {
        customer: customers[1]._id,
        items: [items[1]._id, items[2]._id],
        totalAmount: items[1].price + items[2].price,
        status: "shipped",
      },
      {
        customer: customers[2]._id,
        items: [items[0]._id],
        totalAmount: items[0].price,
        status: "delivered",
      },
      {
        customer: customers[0]._id,
        items: [items[2]._id],
        totalAmount: items[2].price,
        status: "cancelled",
      },
      {
        customer: customers[1]._id,
        items: [items[0]._id, items[2]._id],
        totalAmount: items[0].price + items[2].price,
        status: "pending",
      },
      {
        customer: customers[0]._id,
        items: [items[1]._id],
        totalAmount: items[1].price,
        status: "pending",
      },
      {
        customer: customers[1]._id,
        items: [items[0]._id, items[1]._id, items[2]._id],
        totalAmount: items[0].price + items[1].price + items[2].price,
        status: "shipped",
      },
      {
        customer: customers[2]._id,
        items: [items[1]._id, items[2]._id],
        totalAmount: items[1].price + items[2].price,
        status: "delivered",
      },
      {
        customer: customers[0]._id,
        items: [items[0]._id],
        totalAmount: items[0].price,
        status: "pending",
      },
      {
        customer: customers[2]._id,
        items: [items[2]._id],
        totalAmount: items[2].price,
        status: "shipped",
      },
    ];

    const existingOrders = await Order.find({});
    if (!existingOrders.length > 0) {
      await Order.insertMany(orders);
      console.log("Orders seeded successfully");
    }
  } catch (err) {
    console.error("Error seeding orders:", err.message);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    const role = await Role.findOne({ name: "Admin" });

    const admin = {
      name: "Admin",
      email: "tengkumrafir@gmail.com",
      password: "password",
      role: role._id,
    };

    const existingAdmin = await User.findOne({ email: admin.email });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(admin.password, salt);

      await User.create(admin);
      console.log("Admin seeded successfully");
    }
  } catch (err) {
    console.error("Error seeding admin:", err.message);
    process.exit(1);
  }
};

module.exports = { connectDB, seedRoles, seedItems, seedOrders, seedAdmin };
