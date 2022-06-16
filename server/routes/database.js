const fs = require("fs");
const express = require("express");
const router = express.Router();
const pricingController = require("../controllers/pricingController");
const databaseController = require("../controllers/databaseController");
const looksRareController = require('../controllers/looksRareController');

// get all transactions for specified walletAddress from .json database in /server/data
router.get(
  "/getTransactions/:walletAddress",
  databaseController.getTransactions,
  (req, res) => {
    res.status(200).json(res.locals.walletTransactions);
  }
);

router.get(
  '/getImageTransactions/:walletAddress',
  databaseController.getTransactions,
  looksRareController.getTokenImage,
  (req, res) => {
    res.status(200).json(res.locals.walletTransactions);
  }
)

// get current holdings for specified walletAddress from .json database in /server/data
router.get(
  "/getHoldings/:walletAddress",
  databaseController.getTransactions,
  looksRareController.getTokenImage,
  databaseController.calculateHoldings,
  (req, res) => {
    res.status(200).json(res.locals.holdings);
  }
);

module.exports = router;
