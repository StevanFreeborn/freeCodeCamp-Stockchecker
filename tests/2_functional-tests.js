const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    const testStockOneName = 'vti';

    test('Can get one stock.', (done) => {
        chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: testStockOneName})
        .end((err, res) => {
            if (err) console.log(err)
            
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            
            assert.isObject(res.body);
            assert.property(res.body, 'stockData');

            const stockData = res.body?.stockData;

            assert.property(stockData, 'stock');
            assert.isString(stockData?.stock);

            assert.property(stockData, 'price');
            assert.isNumber(stockData?.price);

            assert.property(stockData, 'likes');
            assert.isNumber(stockData?.likes);

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

                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                
                assert.isObject(res.body);
                assert.property(res.body, 'stockData');
                
                const stockData = res.body?.stockData;
    
                assert.property(stockData, 'stock');
                assert.isString(stockData?.stock);
    
                assert.property(stockData, 'price');
                assert.isNumber(stockData?.price);
    
                assert.property(stockData, 'likes');
                assert.isNumber(stockData?.likes);
                
                assert.equal(stockData?.likes, originalLikeCount + 1);
                
                done();
            })
        });
    });

    test('Cant like same stock twice', done => {
        chai.request(server)
        .get('/api/stock-prices')
        .query({ 
            stock: testStockOneName,
            like: true
        })
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

                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                
                assert.isObject(res.body);
                assert.property(res.body, 'stockData');
                
                const stockData = res.body?.stockData;
    
                assert.property(stockData, 'stock');
                assert.isString(stockData?.stock);
    
                assert.property(stockData, 'price');
                assert.isNumber(stockData?.price);
    
                assert.property(stockData, 'likes');
                assert.isNumber(stockData?.likes);
                
                assert.equal(stockData?.likes, originalLikeCount);
                
                done();
            })
        });
    });

    test('Can get two stocks.', done => {
        assert.fail();
        done();
    });

    test('Can get two stocks and like both stocks.', done => {
        assert.fail();
        done();
    });
});