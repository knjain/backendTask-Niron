const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validate = require("../middlewares/validate");
const { createNewUserSchema, loginUserSchema } = require("../validations/user.validation");

// GET Routes

// POST Routes
router.post(
  "/register",
  validate(createNewUserSchema),
  userController.createNewUser
);

router.post(
  "/login",
  validate(loginUserSchema),
  userController.userLogin
);

// PUT Routes

// DELETE Routes

module.exports = router;
