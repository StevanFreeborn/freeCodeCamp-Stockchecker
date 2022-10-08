const chai = require('chai');
const assert = chai.assert;

class StockAsserter {
    assertIsValidSingleStockResponse = (res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');

        assert.isObject(res.body);
        assert.property(res.body, 'stockData');
    }

    assertIsValidStock = (stockData) => {
        assert.property(stockData, 'stock');
        assert.isString(stockData?.stock);
        
        assert.property(stockData, 'price');
        assert.isNumber(stockData?.price);
        
        assert.property(stockData, 'likes');
        assert.isNumber(stockData?.likes);
    }
}

module.exports = StockAsserter;