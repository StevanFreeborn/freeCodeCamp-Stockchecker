const StockPriceService = require('../services/stockPriceService');
const stockPriceService = new StockPriceService();

class StocksController {
    getStocks = async (req, res) => {
        
        const stocks = req.query?.stock;

        if (!stocks) {
            return res.status(400).json({error: 'Please provide a stock symbol.'});
        }

        const stockData = await stockPriceService.getStockPrice(stocks)

        return res.status(200).json({ stockData: stockData });
    }
}

module.exports = StocksController;