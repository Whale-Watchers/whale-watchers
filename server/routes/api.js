const fs = require("fs");
const express = require("express");
const router = express.Router();
const etherscanController = require("../controllers/etherscanController");
const pricingController = require("../controllers/pricingController");

// get all transactions upto present for address

router.get(
  "/getTransactions/:address",
  etherscanController.get721Transactions,
  etherscanController.get20Transactions,
  (req, res) => {
    res.status(200).json(res.locals.allTransactions);
  }
);

// get all transactions (ETH, ERC20, ERC721) and dump them into /server/data folder

router.get(
  '/dataDump/:address',
  etherscanController.dataDump,
  (req, res) => {
    res.status(200).json({ message: "data dump into /server/data folder" });
});

/*
// get holdings at timestamp for address

router.get(
    'getHoldings/:timeStamp/:address',
    etherscanController.getHoldings,
    (req, res) => {
        res.status(200).json(res.locals.allHoldings)
    }
)

// Get data for Net Worth display and graph

router.get(
    'getNetWorth/:timestamp/:address',
    etherscanController.getTransactions,
    etherscanController.getHoldings,
    pricingController.getPrices,
    pricingController.getNetWorth,
    (req, res) => {
        res.status(200).json(res.locals.netWorth)
    }
)
*/


module.exports = router;
