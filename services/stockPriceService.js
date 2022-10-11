const axios = require('axios');

class StockPriceChekcer {
    stock_price_endpoint = 'https://stock-price-checker-proxy.freecodecamp.rocks'
    
    getStockPriceUrl = (stock) => {
        const endpoint = this.stock_price_endpoint;
        return `${endpoint}/v1/stock/${stock}/quote`
    }

    getStockPrice = async (stock) => {
        const url = this.getStockPriceUrl(stock);
        try {
            const res = await axios(url);
            const data = res.data;
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }

    getStockPrices = async (stocks) => {
        if (!Array.isArray(stocks)) {
            stocks = [stocks];
        }

        return await Promise.all(stocks.map(async (stock) => {
            try {
                return await this.getStockPrice(stock);
            } catch (error) {
                return console.log(error);
            }
        }));
    }
}

module.exports = StockPriceChekcer;