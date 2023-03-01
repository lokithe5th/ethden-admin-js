// app.js
const express = require('express');
const app = express();
const cors = require('cors');
//const port = ;

const vendorController = require('./controllers/vendorController');
const transactionController = require('./controllers/transactionController');

app.use(express.json());
app.use(cors());

app.use('/vendors', vendorController);
app.use('/transactions', transactionController);

app.listen(process.env.PORT, () => {
  console.log(`App listening at :${process.env.PORT}`);
});