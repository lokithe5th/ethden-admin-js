// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT | 3000;

const vendorController = require('./controllers/vendorController');
const transactionController = require('./controllers/transactionController');

app.use(express.json());
app.use(cors());

app.use('/vendors', vendorController);
app.use('/transactions', transactionController);

app.listen(port, "0.0.0.0", () => {
  console.log(`App listening at :${port}`);
});