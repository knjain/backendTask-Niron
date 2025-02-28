const Joi = require("joi");
const {TASK_STATUS_ENUM} = require("../configs/constants.config"); 

const taskSchema = Joi.object({
  name: Joi.string().min(3).max(200).required().messages({
    "any.required": "The 'name' field is required.",
    "string.empty": "The 'name' field cannot be empty.",
    "string.min": "The 'name' must be at least 3 characters long.",
    "string.max": "The 'name' must be at most 200 characters long.",
  }),

  taskDescription: Joi.string().min(10).max(1000).required().messages({
    "any.required": "The 'task description' field is required.",
    "string.empty": "The 'task description' field cannot be empty.",
    "string.min": "The 'task description' must be at least 10 characters long.",
    "string.max":
      "The 'task description' must be at most 1000 characters long.",
  }),

  status: Joi.string()
  .valid(...TASK_STATUS_ENUM)
  .messages({
    "any.only": `The 'status' must be one of: ${TASK_STATUS_ENUM.join(", ")}.`,
    "string.base": "The 'status' must be a string.",
  }),

priority: Joi.number()
  .valid(1, 2, 3)
  .messages({
    "any.only": "The 'priority' must be either 1, 2, or 3.",
    "number.base": "The 'priority' must be a number.",
  }),
});



const updatetaskSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .optional()
    .messages({
      "string.min": "The 'name' must be at least 3 characters long.",
      "string.max": "The 'name' must be at most 100 characters long.",
      "string.base": "The 'name' must be a string.",
    }),

  taskDescription: Joi.string()
    .min(10)
    .max(1000)
    .optional()
    .messages({
      "string.min": "The 'task description' must be at least 10 characters long.",
      "string.max": "The 'task description' must be at most 1000 characters long.",
      "string.base": "The 'task description' must be a string.",
    }),

  status: Joi.string()
    .valid(...TASK_STATUS_ENUM)
    .optional()
    .messages({
      "any.only": `The 'status' must be one of: ${TASK_STATUS_ENUM.join(", ")}.`,
      "string.base": "The 'status' must be a string.",
    }),

  priority: Joi.number()
    .valid(1, 2, 3)
    .optional()
    .messages({
      "any.only": "The 'priority' must be either 1, 2, or 3.",
      "number.base": "The 'priority' must be a number.",
    }),

}).min(1); 

module.exports = { taskSchema, updatetaskSchema };
