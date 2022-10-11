const StockPriceService = require('../services/stockPriceService');
const stockPriceService = new StockPriceService();

class StocksController {
    getStocks = async (req, res) => {
        
        let stocks = req.query?.stock;

        if (!stocks) {
            return res.status(400).json({error: 'Please provide a stock symbol.'});
        }

        if (!Array.isArray(stocks)) {
            stocks = [stocks];
        }

        const promises = stocks.map(async (stock) => {
            try {
                return await stockPriceService.getStockPrice(stock);
            } catch (error) {
                return console.log(error);
            }
        });

        let stocksData = await Promise.all(promises);

        // TODO: get stock from database
           // TODO: if stock doesn't exist in database add it
           // TODO: if stock does exist in database update it

        // TODO: check if like query is true
            // TODO: add req ip to likes
        
        if (stocksData.length == 1) {
            stocksData = stocksData[0];
        }

        return res.status(200).json({ stockData: stocksData });
    }
}

module.exports = StocksController;