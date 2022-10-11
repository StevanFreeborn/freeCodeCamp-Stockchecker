const Stock = require('../models/stock'); 

class StockService {
    getStocksBySymbol = async (stocksPriceData) => {
        return await Promise.all(stocksPriceData.map(async (stockPriceData) => {
            const stock = await this.getStockBySymbol(stockPriceData?.symbol)

            try {
                if (!stock) {
                    return await this.createStock(stockPriceData);
                }
                else {
                    return await this.updateStock(stock, stockPriceData);
                }
            } catch (error) {
                console.log(error);
            }
        }));
    }

    getStockBySymbol = async (stockSymbol) => {
        try {
            return await Stock.findOne({ stock: stockSymbol, }).exec()
        } 
        catch (error) {
            console.log(error);    
        }
    };

    createStock = async (stockPriceData) => {
        // TODO: Implement creating stock in database.
        try {
            const newStock = new Stock(stockPriceData);
            newStock.stock = stockPriceData?.symbol;
            return await newStock.save();
        } 
        catch (error) {
            console.log(error);
        }
    };

    updateStock = async (existingStock, newStockData) => {
        // TODO: Implement updating stock in database.
        try {
            const updateOptions = { new: true, };

            const updates = { ...newStockData };
            
            return await Stock.findByIdAndUpdate(existingStock.id, updates, updateOptions).exec();
        }
        catch (error) {
            console.log(error);
        }
    };
}

module.exports = StockService;