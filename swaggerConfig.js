const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require("./configs/server.config");
const BASE_URL = config.BASE_URL;

// Access documentation at http://localhost:5001/api-docs

// Swagger Definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lodgezify API Documentation",
      version: "1.0.0",
      description: "API documentation for Lodgezify application",
    },
    components: {
      securitySchemes: {
        UserAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        HotelAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: BASE_URL,
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to route files containing API definitions
};

// Generate Swagger Spec
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;