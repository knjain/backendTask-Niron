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
        role: "User",
      });

      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw new ApiError(error.message);
    }
  },

  findUserByEmail: async (email) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw new ApiError(error.message);
    }
  },
};
