const mongoose = require('mongoose');

const stockSchemaOptions = {
    timestamps: true,
}

const StockSchema = mongoose.Schema({
    stock: { type: String, required: true, trim: true, },
    ips: [String],
    likes: { type: Number, required: true, default: 0},
    price: mongoose.Schema.Types.Decimal128,
    close: {},
    closeSource: { type: String, trim: true, },
    closeTime: {},
    companyName: {},
    currency: {},
    high: {},
    highSource: {},
    highTime: {},
    lastTradeTime: {},
    latestPrice: {},
    latestSource: {},
    latestTime: {},
    latestUpdate: {},
    low: {},
    lowSource: {},
    lowTime: {},
    marketCap: {},
    open: {},
    openTime: {},
    openSource: {},
    peRatio: {},
    previousClose: {},
    primaryExchange: {},
    symbol: {},
    week52High: {},
    week52Low: {},
    ytdChange: {},
    isUSMarketOpen: {},
}, stockSchemaOptions);

const Stock = mongoose.model('stocks', StockSchema);

module.exports = Stock;