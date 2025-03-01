const User = require("../models/user.model");
const ApiError = require("../utils/apiError.util");

module.exports = {
  createNewUser: async (firstName, lastName, email, phoneNumber, password) => {
    try {
      const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });

      const savedUser = await newUser.save();
      const sanitizedUser = await User.findById(savedUser._id).select("-password -createdAt -updatedAt -__v");

      return sanitizedUser;
    } catch (error) {
      throw new ApiError(error.message);
    }
  },

  findUserByEmail: async (email) => {
    try {
      const user = await User.findOne({ email }).select(" -createdAt -updatedAt -__v");
      return user;
    } catch (error) {
      throw new ApiError(error.message);
    }
  },
};
