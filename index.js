// index.js
const express = require('express');
// const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const walletRoutes = require('./routes/walletRoutes');
const swaggerOptions = require('./swaggerOptions');

const app = express();
const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

// Swagger
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/wallet', walletRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
