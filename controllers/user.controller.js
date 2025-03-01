const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const {
  USER_TOKEN_SECRET,
  USER_TOKEN_SECRET_EXPIRY,
} = require("../configs/constants.config");
const securePassword = require("../utils/bcrypt.util");

module.exports = { 
  
  createNewUser: async (req, res) => {
    try {
      const { firstName, lastName, email, phoneNumber, password } = req.body;
  
      // Hash password
      const hashedPassword = await securePassword(password);
  
      const response = await userService.createNewUser(
        firstName,
        lastName,
        email,
        phoneNumber,
        hashedPassword
      );
  
      if (!response) {
        return res.status(400).json({
          success: false,
          message: "User registration failed",
        });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        {
          email: response.email,
          userId: response._id,
        },
        USER_TOKEN_SECRET,
        { expiresIn: USER_TOKEN_SECRET_EXPIRY }
      );
  
      // Send response with user data and token
      return res.status(201).json({
        data: response,
        success: true,
        message: "User successfully registered",
        token,
      });
  
    } catch (error) {
      console.error("Error in createNewUser:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  

  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userService.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (user) {
        const token = jwt.sign(
          {
            email: email,
            userId: user._id,
          },
          // process.env.JWT_SECRET,
          USER_TOKEN_SECRET,
          { expiresIn: USER_TOKEN_SECRET_EXPIRY }
        );
        return res.status(201).json({
          data: user,
          success: true,
          message: "User Logged In",
          token,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
