const StockPriceService = require('../services/stockPriceService');
const StockService = require('../services/stockService');

const stockPriceService = new StockPriceService();
const stockService = new StockService();

const createSingleStockDto = stock => {
    return {
        stock: stock?.symbol,
        price: stock?.latestPrice,
        likes: stock?.likes.length,
    }
}

const createDoubleStockDto = stocks => {
    return stocks.map((stock, index) => {
        let rel_likes;

        if (index == 0) {
            rel_likes = stocks[0]?.likes.length -  stocks[1]?.likes.length;
        }
        else {
            rel_likes = stocks[1]?.likes.length -  stocks[0]?.likes.length;
        }

        return {
            stock: stock?.symbol,
            price: stock?.latestPrice,
            rel_likes: rel_likes,
        }
    });
}

class StocksController {
    getStocks = async (req, res) => {
        let stockSymbols = req.query?.stock;
        let isLiked = req.query?.like === 'true';
        let requestIp = req.ip;
        
        if (!stockSymbols) {
            return res
            .status(400)
            .json({
                error: 'Please provide a stock symbol.'
            });
        }

        const stocksPriceData = await stockPriceService.getStockPrices(stockSymbols);

        let stocks = await stockService.getStocksBySymbol(stocksPriceData, isLiked, requestIp);
        
        if (stocks.length == 1) {
            stocks = createSingleStockDto(stocks[0]);
        }
        
        if (stocks.length == 2) {
            stocks = createDoubleStockDto(stocks);
        }

        return res
        .status(200)
        .json({
            stockData: stocks,
        });
    }
}

module.exports = StocksController;