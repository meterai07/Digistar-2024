const User = require('../models/userModel');
const Customer = require('../models/customerModel');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return users;
    } catch (err) {
        return err;
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req);
        if (!user) {
            return null;
        }
        return user;
    } catch (err) {
        return err;
    }
}

exports.createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req;

        const user = await User.findOne ({ email });
        if (user) {
            return null;
        }

        const newUser = new User({
            username,
            email,
            password,
            role
        });

        await newUser.save();


        return newUser;
    }
    catch (err) {
        return err
    }
}

exports.getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req }).populate('role');
        if (!user) {
            return null;
        }
        return user;
    } catch (err) {
        return err;
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { userId, updatedFields } = req;
        const user = await User.findById(userId);
        if (!user) {
            return null;
        }

        Object.assign(user, updatedFields);
        await user.save();
        return user;
    }
    catch (err) {
        return err;
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req);
        if (!user) {
            return null;
        }

        await user.deleteOne();
        return user;
    }
    catch (err) {
        return err;
    }
}
