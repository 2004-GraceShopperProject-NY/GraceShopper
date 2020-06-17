const {expect} = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('Validations', () => {
    it('requires `name`', async () => {
      const testProduct = Product.build({
        name: ''
      });

      try {
        await testProduct.validate();
        throw Error(
          'validation was successful but should have failed without `firstName`'
        );
      } catch (err) {
        expect(err.message).to.contain('failed');
      }
    });
    it('requires `name` to not be an empty string', async () => {
      const testProduct = await Product.build({
        name: ''
      });

      try {
        await testProduct.validate();
        throw Error(
          'validation was successful, but should have failed if first name is an empty string'
        );
      } catch (error) {
        expect(error.message).to.contain('failed');
      }
    });
  });
});
