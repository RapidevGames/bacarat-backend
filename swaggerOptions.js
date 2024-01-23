// swaggerOptions.js
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Baccarat Game API",
      version: "1.0.0",
      description: "API documentation for the Baccarat Game application",
    },
  },
  apis: ["./swagger/*.js"], // Specify the path to your route files
};

module.exports = swaggerOptions;
