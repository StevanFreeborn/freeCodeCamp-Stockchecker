const axios = require('axios');

class StockPriceChekcer {
    stock_price_endpoint = 'https://stock-price-checker-proxy.freecodecamp.rocks'
    
    getStockPriceUrl = (stock) => {
        const endpoint = this.stock_price_endpoint;
        return `${endpoint}/v1/stock/${stock}/quote`
    };

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
    };
}

module.exports = StockPriceChekcer;