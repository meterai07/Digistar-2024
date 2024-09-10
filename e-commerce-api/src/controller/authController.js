const userRepository = require("../domain/repositories/userRepository");
const roleRepository = require("../domain/repositories/roleRepository");
const Customer = require("../domain/models/customerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Response = require("../utils/response");
const ROLES = require('../utils/constants/roles');

exports.register = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
      return Response(res, 400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customerRole = await roleRepository.getRoleByName(ROLES.CUSTOMER);
    if (!customerRole) {
      return Response(res, 500, "Role not found");
    }
    const newUser = await userRepository.createUser({
      username,
      email,
      password: hashedPassword,
      role: customerRole.id,
    });
    
    const newCustomer = new Customer({
      user: newUser._id,
      address: address || {}, 
    });

    await newCustomer.save();

    Response(res, 201, "User and customer created successfully", {
      user: newUser,
      customer: newCustomer,
    });
  } catch (err) {
    Response(res, 500, "An error occurred while creating user", null, err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      return Response(res, 400, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response(res, 400, "Invalid password");
    }

    const payload = {
      userId: user._id,
      role: user.role.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    Response(res, 200, "User logged in successfully", {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role.name,
      },
    });
  } catch (err) {
    Response(res, 500, "Server error", null, err.message);
  }
};
