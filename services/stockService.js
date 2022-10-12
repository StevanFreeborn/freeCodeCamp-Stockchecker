const Stock = require('../models/stock'); 

class StockService {
    getStocksBySymbol = async (stocksPriceData, isLiked, requestIp) => {
        return await Promise.all(stocksPriceData.map(async (stockPriceData) => {
            const stock = await this.getStockBySymbol(stockPriceData?.symbol);

            if (stock == null) {
                if (isLiked == true) {
                    stockPriceData.likes = [requestIp];
                }

                return this.createStock(stockPriceData);
            }
            else {
                const hasAlreadyLiked = stock.likes.includes(requestIp);

                if (isLiked == true && hasAlreadyLiked == false) {
                    stockPriceData.$push = {
                        likes: requestIp,
                    };
                }

                return this.updateStock(stock, stockPriceData);
            }
        }));
    }

    getStockBySymbol = async (stockSymbol) => {
        return await Stock.findOne({ symbol: stockSymbol, }).exec()
    };

    createStock = async (stockPriceData) => {
        const newStock = new Stock(stockPriceData);
        return await newStock.save();
    };

    updateStock = async (existingStock, newStockData) => {
        const updateOptions = { new: true, };
        return await Stock.findByIdAndUpdate(existingStock.id, newStockData, updateOptions).exec();
    };
}

module.exports = StockService;