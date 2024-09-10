const Role = require("../models/roleModel");

exports.getRoles = async () => {
  try {
    const roles = await Role.find();
    return roles;
  } catch (err) {
    return err;
  }
};

exports.getRoleByName = async (req) => {
  try {
    const role = await Role.findOne ({ name: req });
    if (!role) {
      return null;
    }
    
    return role;
  } catch (err) {
    return err;
  }
};
