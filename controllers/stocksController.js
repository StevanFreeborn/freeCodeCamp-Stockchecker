const StockPriceService = require('../services/stockPriceService');
const StockService = require('../services/stockService');

const stockPriceService = new StockPriceService();
const stockService = new StockService();

class StocksController {
    getStocks = async (req, res) => {
    
        let stocks = req.query?.stock;
        let isLiked = req.query?.like;
        let requestIp = req.ip;

        if (!stocks) {
            return res.status(400).json({error: 'Please provide a stock symbol.'});
        }

        const stocksPriceData = await stockPriceService.getStockPrices(stocks);

        let stocksData = await stockService.getStocksBySymbol(stocksPriceData);
        
        if (stocksData.length == 1) {
            stocksData = stocksData[0];
        }

        return res.status(200).json({ stockData: stocksData });
    }
}

module.exports = StocksController;