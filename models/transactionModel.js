// models/vendorModel.js

const { MongoClient, ObjectID } = require('mongodb');

const url = 'mongodb+srv://lourens:eHWJqpSLr3ViOHQh@cluster0.iwy9lj6.mongodb.net/denver?retryWrites=true&w=majority';

class TransactionModel {
  constructor() {
    this.collection = null;
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(client => {
        const db = client.db();
        this.collection = db.collection('transactions');
      })
      .catch(err => console.error(err));
  }

  async getAllTransactions() {
    const vendors = await this.collection.find({}).toArray();
    return vendors;
  }

  async addTransaction(update) {
    console.log("in update")
    const result = await this.collection.insertOne(update);
    return result;
  }
}

module.exports = new TransactionModel();
