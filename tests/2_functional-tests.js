const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const StockAsserter = require('../assertionHelpers/stockAsserter');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    const testStockOneName = 'vti'
    const stockAsserter = new StockAsserter();

    test('Can get one stock.', done => {
        chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: testStockOneName})
        .end((err, res) => {
            if (err) console.log(err)

            stockAsserter.assertIsValidSingleStockResponse(res);
            stockAsserter.assertIsValidStock(res.body?.stockData);

            done();
        });
    });

    test('Can get one stock and like the stock.', done => {
        chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: testStockOneName})
        .end((err, res) => {
            if (err) console.log(err)
            
            const originalLikeCount = res.body?.stockData?.likes;

            chai.request(server)
            .get('/api/stock-prices')
            .query({ 
                stock: testStockOneName,
                like: true,
            })
            .end((err, res) => {
                if (err) console.log(err)

                stockAsserter.assertIsValidSingleStockResponse(res);

                const stockData = res.body?.stockData;

                stockAsserter.assertIsValidStock(stockData);
                
                assert.equal(stockData?.likes, originalLikeCount + 1);

                done();
            })
        });
    });

    test('Can\'t like same stock twice', done => {

    });

    test('Can get two stocks.', done => {

    });

    test('Can get two stocks and like both stocks.', done => {

    });
});
