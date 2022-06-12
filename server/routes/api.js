const express = require('express');
const router = express.Router();
const etherscanController = require('../controllers/etherscanController');
const pricingController = require('../controllers/pricingController');

// get all transactions upto present for address

router.get(
    '/getTransactions/:address',
    etherscanController.get721Transactions,
    etherscanController.get20Transactions,
    (req, res) => {
        res.status(200).json(res.locals.allTransactions)
    }
)   

// get holdings at timestamp for address

/*
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


// router.get('/getTimes', etherscanController.getTimes, (req, res) => {
//     res.status(200).json(res.locals.times);
// })
// router.get('/getValues', etherscanController.convertTransactions, (req, res) => {
//     res.status(200).json(res.locals.values);
// })
// router.get('/grabData/:id', etherscanController.grabData, (req, res) => {
//     res.status(200).json(res.locals.data);
// })

module.exports = router;