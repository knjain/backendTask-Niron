const Joi = require("joi");

const createNewUserSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(100).optional().messages({
    "string.min": "First name must be at least 2 characters long.",
    "string.max": "First name must not exceed 100 characters.",
  }),

  lastName: Joi.string().trim().min(2).max(100).optional().messages({
    "string.min": "Last name must be at least 2 characters long.",
    "string.max": "Last name must not exceed 100 characters.",
  }),

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } }) // Ensures proper email format
    .required()
    .messages({
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
    }),

  phoneNumber: Joi.string()
    .trim()
    .pattern(/^\+?[1-9]\d{1,14}$/) // Follows E.164 international phone number format
    .optional()
    .messages({
      "string.pattern.base":
        "Please enter a valid phone number with country code (e.g., +1234567890).",
    }),

  password: Joi.string().trim().min(3).required().messages({
    "string.min": "Password must be at least 3 characters long.",
    "any.required": "Password is required.",
  }),
});

const loginUserSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
    }),

  password: Joi.string().trim().min(3).required().messages({
    "string.min": "Password must be at least 3 characters long.",
    "any.required": "Password is required.",
  }),
});
module.exports = { createNewUserSchema, loginUserSchema };
