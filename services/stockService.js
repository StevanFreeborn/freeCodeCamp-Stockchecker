const Stock = require('../models/stock'); 

class StockService {
    getStocksBySymbol = async (stocksPriceData, isLiked, requestIp) => {
        return await Promise.all(stocksPriceData.map(async (stockPriceData) => {
            try {
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
            }
            catch (error) {
                console.log(error);
            }
        }));
    }

    getStockBySymbol = async (stockSymbol) => {
        try {
            return await Stock.findOne({ symbol: stockSymbol, }).exec()
        } 
        catch (error) {
            console.log(error);
        }
    };

    createStock = async (stockPriceData) => {
        try {
            const newStock = new Stock(stockPriceData);
            return await newStock.save();
        } 
        catch (error) {
            console.log(error);
        }
    };

    updateStock = async (existingStock, newStockData) => {
        try {
            const updateOptions = { new: true, };
            return await Stock.findByIdAndUpdate(existingStock.id, newStockData, updateOptions).exec();
        }
        catch (error) {
            console.log(error);
        }
    };
}

module.exports = StockService;