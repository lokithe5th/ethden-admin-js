// controllers/vendorController.js

const express = require('express');
const router = express.Router();
const ethers = require('ethers');

const erc20 = require('../abi/ERC20.json');

// Let's listen for more events - is this better taken care of on the front end?
const provider = new ethers.JsonRpcProvider("https://zksync2-mainnet.zksync.io");
const buidlTokenAddress = '0x1bbA25233556a7C3b41913F35A035916DbeD1664'
const transferEvent = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const contract = new ethers.Contract(buidlTokenAddress, erc20, provider);

vendors = [
  "0x2406fb7143f22f221e74524aa25bd0f7ffa6ba66",
  "0x8ce80adea55f41d874398b2ef80c31216b929521",
  "0xda55d516b2438645e0fc31ac448d0900ad78045f", 
  "0xdce10742ab93587df464935c0063b1ba5db02968", 
  "0xe664c6454300f48942239605810178221b34959f", 
  "0xc4779195760540e2cbf73d855695d8537b1f545e", 
  "0xa65150551b77719e31ebfe395c3f0a009ad0c19e",
  "0xbb101cbee74549768e8495877109b0a788245b09", 
  "0xf5d2d68377725ac40719fa1aed5f9cf1457d0be7",
  "0x642cfd51f29e383fcb9f726ec0ccd0b03cf723cb",
  "0x9bfcd4db79a3d513f28aecaff1b962f163ba57bd",
  "0x837717d8fcaf2ec72c132fee49f4be3ddf27b501",
  "0xfe7835f82181db55236bc998234a2c6c7030ba82",
  "0x41436b6f50dcfca53b357c81a9d6c88349cc8e19",
  "0x71cfb7ff2cb34c9d86d02bbc0967264108c19fdb",
  "0x9598cd29af4368d49270db724e7511cccd2e4be8",
  "0x8360f4f9ba02a131757eafece17bc814313a61de",
  "0x31edd5a882583cbf3a712e98e100ef34ad6934b4"
]

const getAllTransactions = async() => {
  const transactions = await contract.queryFilter(transferEvent, 0);
  let transfers = [];

  for (let i=0; i < transactions.length; i++) {
      if (vendors.includes("0x"+transactions[i]['topics'][2].slice(26, 66))) {
        let event = {
          from: "0x"+transactions[i]['topics'][1].slice(26, 66),
          to: "0x"+transactions[i]['topics'][2].slice(26, 66),
          amount: parseInt(transactions[i]['data'], 16)
        }
        transfers.push(event);
      }
  }

  console.log(transfers);

  return transfers;
}

router.get('/', async (req, res) => {
  try {
    const transactions = await getAllTransactions();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving transactions from database');
  }
});

module.exports = router;
