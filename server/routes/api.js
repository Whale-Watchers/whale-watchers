const express = require('express');
const router = express.Router();
const etherscanController = require('../controllers/etherscanController');


router.get('/getTimes', etherscanController.getTimes, (req, res) => {
    res.status(200).json(res.locals.times);
})
router.get('/getValues', etherscanController.convertTransactions, (req, res) => {
    res.status(200).json(res.locals.values);
})

module.exports = router;