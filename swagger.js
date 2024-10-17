const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "E-commerce API documentation",
      contact: {
        name: "Shopping api",
        email: "kareemibrahim5002@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3100",
        description: "Local Development Server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
