
const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const statisticsController = require('../controllers/statisticsController');
const barChartController = require('../controllers/barChartController');
const pieChartController = require('../controllers/pieChartController');
const combinedController = require('../controllers/combinedController');

router.get('/initialize', transactionsController.initializeDatabase);
router.get('/transactions', transactionsController.listTransactions);
router.get('/statistics', statisticsController.getStatistics);
router.get('/barchart', barChartController.getBarChartData);
router.get('/piechart', pieChartController.getPieChartData);
router.get('/combined', combinedController.getCombinedData);

module.exports = router;
