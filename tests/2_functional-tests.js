const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    test('Can get one stock.', done => {

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
