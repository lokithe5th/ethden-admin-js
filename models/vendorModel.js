// models/vendorModel.js

const { MongoClient, ObjectID } = require('mongodb');

const url = 'mongodb+srv://lourens:eHWJqpSLr3ViOHQh@cluster0.iwy9lj6.mongodb.net/denver?retryWrites=true&w=majority';

class VendorModel {
  constructor() {
    this.collection = null;
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(client => {
        const db = client.db();
        this.collection = db.collection('payments');
        console.log(this.collection)
      })
      .catch(err => console.error(err));
  }

  async getAllVendors() {
    const vendors = await this.collection.find({}).toArray();
    return vendors;
  }

  async updateVendor(id, update) {
    const result = await this.collection.updateOne({ _id: ObjectID(id) }, { $set: update });
    return result;
  }
}

module.exports = new VendorModel();
