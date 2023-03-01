const vendorModel = require('./models/vendorModel');


const updates = async () => {
    return await vendorModel.updateBalances();
}

console.log(await updates);