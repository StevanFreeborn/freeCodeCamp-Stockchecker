const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const { before } = require('mocha');
const Stock = require('../models/stock');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    after(async () => {
        await Stock.deleteMany({}).exec();
    });

    const testStockOneName = 'msft';
    const testStockTwoName = 'goog';
    const invalidStock = 'test';

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
        chai.request(server)
        .get(`/api/stock-prices?stock=${testStockOneName}&stock=${testStockTwoName}`)
        .end((err, res) => {
            if (err) console.log(err)
            
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            
            assert.isObject(res.body);
            assert.property(res.body, 'stockData');
            
            const stockData = res.body?.stockData;

            assert.isArray(stockData);
            assert.equal(stockData?.length, 2);

            stockData?.forEach(stock => {
                assert.property(stock, 'stock');
                assert.isString(stock?.stock);
    
                assert.property(stock, 'price');
                assert.isNumber(stock?.price);
    
                assert.property(stock, 'rel_likes');
                assert.isNumber(stock?.rel_likes);
            })

            done();
        });
    });

    test('Can get two stocks and like both stocks.', done => {
        chai.request(server)
        .get(`/api/stock-prices?stock=${testStockOneName}&stock=${testStockTwoName}`)
        .end((err, res) => {
            if (err) console.log(err)
            const firstStockOriginalLikes = res.body?.stockData[0]?.rel_likes;
            const secondStockOriginalLikes = res.body?.stockData[1]?.rel_likes;

            chai.request(server)
            .get(`/api/stock-prices?stock=${testStockOneName}&stock=${testStockTwoName}&like=true`)
            .end((err, res) => {
                if (err) console.log(err)

                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                
                assert.isObject(res.body);
                assert.property(res.body, 'stockData');
                
                const stockData = res.body?.stockData;

                assert.isArray(stockData);
                assert.equal(stockData?.length, 2);
    
                stockData?.forEach(stock => {
                    assert.property(stock, 'stock');
                    assert.isString(stock?.stock);
        
                    assert.property(stock, 'price');
                    assert.isNumber(stock?.price);
        
                    assert.property(stock, 'rel_likes');
                    assert.isNumber(stock?.rel_likes);
                })

                assert.equal(stockData[0]?.rel_likes, 0);
                assert.equal(stockData[1]?.rel_likes, 0);
                
                done();
            })
        });
    });

    test('return 404 error if invalid stock symbol requested', done => {
        chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: invalidStock})
        .end((err, res) => {
            if (err) console.log(err)
            
            assert.equal(res.status, 404);
            assert.equal(res.type, 'application/json');
            
            assert.isObject(res.body);
            assert.property(res.body, 'error');
            assert.isString(res.body.error);

            done();
        });
    });
});