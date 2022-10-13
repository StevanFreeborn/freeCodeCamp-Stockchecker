const bcrypt = require('bcrypt');
const Stock = require('../models/stock');

class StockService {
    getStocksBySymbol = async (stocksPriceData, isLiked, requestIp) => {
        return await Promise.all(stocksPriceData.map(async (stockPriceData) => {
            const stock = await this.getStockBySymbol(stockPriceData?.symbol);
            const saltRounds = 10;
            const hashedIp = await bcrypt.hash(requestIp, saltRounds);

            if (stock == null) {
                if (isLiked == true) {
                    stockPriceData.likes = [hashedIp];
                }

                return this.createStock(stockPriceData);
            }
            else {
                const hasAlreadyLiked = stock.likes.some(like => {
                    return bcrypt.compareSync(requestIp, like);
                });

                if (isLiked == true && hasAlreadyLiked == false) {
                    stockPriceData.$push = {
                        likes: hashedIp,
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