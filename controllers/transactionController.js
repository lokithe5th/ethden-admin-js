// controllers/vendorController.js

const express = require('express');
const router = express.Router();
const transactionModel = require('../models/transactionModel');

router.get('/', async (req, res) => {
  try {
    const transactions = await transactionModel.getAllTransactions();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving transactions from database');
  }
});

router.put('/addTx', async (req, res) => {
  const update = req.body;

  try {
    const result = await transactionModel.addTransaction(update);

    if (result.matchedCount === 0) {
      res.status(404).send('Trans not found');
      return;
    }

    res.status(200).send('Tx updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating tx in database');
  }
});

module.exports = router;
