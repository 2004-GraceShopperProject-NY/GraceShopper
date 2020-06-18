/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

// const Product = require('../db/models/product');

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/products/', () => {
    const toiletPaper = {
      name: 'Toilet Paper',
      quantity: 100,
      price: '1500',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/9133wpvx-uL._AC_SL1500_.jpg',
      description: 'Just got real with Scott ComfortPlus Toilet paper'
    };

    beforeEach(() => {
      return Product.create(toiletPaper);
    });

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].name).to.be.equal(toiletPaper.name);
    });
  }); // end describe('/api/products')

  describe('/api/products/:productId', () => {
    const mask = {
      name: 'mask',
      quantity: 40,
      price: '1000'
    };

    beforeEach(() => {
      return Product.create(mask);
    });

    it('GET /api/products/:productID', async () => {
      const res = await request(app);
      console
        .log(res)
        .get('/api/products/:productID')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].price).to.be.equal('1000');
    });
  });
}); // end describe('Products routes')
