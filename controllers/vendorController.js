// controllers/vendorController.js

const express = require('express');
const router = express.Router();
const vendorModel = require('../models/vendorModel');

router.get('/', async (req, res) => {
  console.log("GET vendors")
  try {
    const vendors = await vendorModel.getAllVendors();
    res.json(vendors);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving vendors from database');
  }
});

router.put('/resetPayouts/:id', async (req, res) => {
  console.log("incoming reset");
  const id = req.params.id;
  const update = req.body;

  try {
    const result = await vendorModel.resetPayouts();
    res.status(200).send('Vendors reset successfully');

  } catch (err) {
    console.error(err);
    res.status(500).send('Error reset vendor in database');
  }
});

router.put('/:id', async (req, res) => {
  console.log("payout request");
  const id = req.params.id;
  const update = req.body;

  try {
    const result = await vendorModel.updateVendor(id, update);

    if (result.matchedCount === 0) {
      res.status(404).send('Vendor not found');
      return;
    }

    res.status(200).send('Vendor updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating vendor in database');
  }
});

module.exports = router;
