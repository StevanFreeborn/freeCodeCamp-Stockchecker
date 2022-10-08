const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    const testStockOneName = 'vti'

    test('Can get one stock.', done => {
        chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: testStockOneName})
        .end((err, res) => {
            if (err) console.log(err)

            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            const stockRes = res.body;

            assert.isObject(stockRes);
            assert.property(stockRes, 'stockData');

            const stockData = stockRes?.stockData;
            
            assert.property(stockData, 'stock');
            assert.isString(stockData?.stock);
            
            assert.property(stockData, 'price');
            assert.isNumber(stockData?.price);
            
            assert.property(stockData, 'likes');
            assert.isNumber(stockData?.likes);
        });
    });

    test('Can get one stock and like the stock.', done => {

    });

    test('Can\'t like same stock twice', done => {

    });

    test('Can get two stocks.', done => {

    });

    test('Can get two stocks and like both stocks.', done => {

    });
});
