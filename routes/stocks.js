'use strict';
const StocksController = require('../controllers/stocksController');
const stocksController = new StocksController();

module.exports = function (app) {
  app.get('/api/stock-prices', stocksController.getStocks);
  app.get('/api/stock/{}/price', () => {});
};