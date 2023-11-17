const express = require('express');
const walletRoutes = require('./routes/walletRoutes');
const WalletBalance =  require('./routes/walletBalanceRoute')
const swaggerMiddleware = require('./middlewares/swaggerMiddleware');

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json());

// Use Swagger middleware
swaggerMiddleware(app);

// Routes
app.use('/wallet', walletRoutes);
app.use('/balance', WalletBalance )

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});