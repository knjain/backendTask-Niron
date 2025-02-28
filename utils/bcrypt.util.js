const bcrypt = require("bcryptjs");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = securePassword;
