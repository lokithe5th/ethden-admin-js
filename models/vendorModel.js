// models/vendorModel.js

const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb+srv://lourens:eHWJqpSLr3ViOHQh@cluster0.iwy9lj6.mongodb.net/denver?retryWrites=true&w=majority';

class VendorModel {
  constructor() {
    this.collection = null;
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(client => {
        const db = client.db();
        this.collection = db.collection('payments');
      })
      .catch(err => console.error(err));
  }

  async getAllVendors() {
    const vendors = await this.collection.find({}).toArray();
    return vendors;
  }

  async updateVendor(id, update) {
    //  `update` should be in the format `{payoutsReceived: $value}`
    const recordId = new ObjectId(id);
    const result = await this.collection.updateOne({ _id: recordId }, { $set: update });
    return result;
  }
}

module.exports = new VendorModel();
