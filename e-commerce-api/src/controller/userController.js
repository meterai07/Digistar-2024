const RoleRepository = require("../domain/repositories/roleRepository");
const UserRepository = require("../domain/repositories/userRepository");
const Response = require("../utils/response");
const bcrypt = require("bcryptjs");
const ROLES = require('../utils/constants/roles');

exports.getUser = async (req, res) => {
    try {
        const user = await UserRepository.getUser(req.params.id);
        if (!user) {
            return Response(res, 404, 'User not found');
        }
        Response(res, 200, 'User retrieved successfully', user);
    }
    catch (err) {
        Response(res, 500, 'An error occurred while retrieving user', null, err.message);
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await UserRepository.getUsers();
        Response(res, 200, 'Get all users retrieved successfully', users);
    } catch (err) {
        Response(res, 500, 'An error occurred while retrieving all users', null, err.message);
    }
}

exports.updateUser = async (req, res) => {
    try {
        let user = req.user;
        const { username, email, password } = req.body;

        const updatedFields = {};
        if (username) updatedFields.username = username;
        if (email) updatedFields.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedFields.password = await bcrypt.hash(password, salt); 
        }

        user = await UserRepository.updateUser({ userId: user.userId, updatedFields });
        if (!user) {
            return Response(res, 404, 'User not found');
        }
        Response(res, 200, 'User updated successfully', user);
    } catch (err) {
        Response(res, 500, 'An error occurred while updating user', null, err.message);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let user = req.user;
        
        user = await UserRepository.deleteUser(user.userId);
        if (!user) {
            return Response(res, 404, 'User not found');
        }
        Response(res, 200, 'User deleted successfully', user);
    } catch (err) {
        Response(res, 500, 'An error occurred while deleting user', null, err.message);
    }
}

exports.getRoles = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== ROLES.ADMIN) {
            return Response(res, 403, 'Unauthorized');
        }
        const roles = await RoleRepository.getRoles();
        Response(res, 200, 'Get all role retireved succesfuly', roles);
    } catch (err) {
        Response(res, 500, 'An error occurred while retrieving all role', null, err.message);
    }
}


