const express = require("express");
const path = require("path");
const validate = require("../middlewares/validate");
const checkOwnership = require("../middlewares/checkTaskOwnership.middleware");
const {
  taskSchema,
  updatetaskSchema
} = require("../validations/task.validation");
const taskController = require("../controllers/task.controller");
const {
  authenticateUserToken,
} = require("../middlewares/authToken.middleware");

const router = express.Router();

router.get("/", authenticateUserToken, taskController.getTaskById); 

router.post(
  "/",
  authenticateUserToken,
  validate(taskSchema), 
  taskController.createTask 
);

router.put(
  "/:id",
  authenticateUserToken,
  checkOwnership,
  validate(updatetaskSchema), 
  taskController.updateTask 
);

router.delete(
  "/:id",
  authenticateUserToken,
  checkOwnership,
  taskController.deleteTask 
);

module.exports = router;
