const axios = require('axios');

class StockPriceChekcer {
    stock_price_endpoint = 'https://stock-price-checker-proxy.freecodecamp.rocks'
    
    getStockPriceUrl = (stock) => {
        const endpoint = this.stock_price_endpoint;
        return `${endpoint}/v1/stock/${stock}/quote`
    }

    getStockPrice = async (stock) => {
        const url = this.getStockPriceUrl(stock);
        const res = await axios(url);
        const data = res.data;

        if (typeof data === 'string') {
            return {
                error: data + ' ' + stock,
            };
        }

        return data;
    }

    getStockPrices = async (stocks) => {
        if (!Array.isArray(stocks)) {
            stocks = [stocks];
        }
        
        return await Promise.all(stocks.map((stock) => {
                return this.getStockPrice(stock);
        }));
    }
}

module.exports = StockPriceChekcer;