const dtoFactory = require('../factories/dtoFactory');
const StockPriceService = require('../services/stockPriceService');
const StockService = require('../services/stockService');

const stockPriceService = new StockPriceService();
const stockService = new StockService();

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

        try {
            const stocksPriceData = await stockPriceService.getStockPrices(stockSymbols);
            
            for (let i = 0; i < stocksPriceData.length; i++) {
                if (stocksPriceData[i].hasOwnProperty('error')) {
                    if (stocksPriceData[i].error.includes('Unknown symbol')) {
                        return res
                        .status(404)
                        .json({
                            error: stocksPriceData[i].error,
                        });
                    }
                }
            }

            let stocks = await stockService.getStocksBySymbol(stocksPriceData, isLiked, requestIp);

            if (stocks.length == 1) {
                stocks = dtoFactory.createSingleStockDto(stocks[0]);
            }

            if (stocks.length == 2) {
                stocks = dtoFactory.createDoubleStockDto(stocks);
            }

            return res
                .status(200)
                .json({
                    stockData: stocks,
                });
        } 
        catch (error) {
            console.log(error);
            
            return res
            .status(500)
            .json({
                error: "We're sorry there was an error.",
            });
        }
    }
}

module.exports = StocksController;