// const {expect} = require('chai');
// const db = require('../index');
// const Product = db.model('product');

// describe('Product model', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('Validations', () => {
//     it('requires `name` to not be an empty string', async() => {
//       const product = await Product.build({
//         name: 'toilet paper'
//       })

//      try {
//       product.validate()
//       throw Error('validation was successful, but should have failed if first name is an empty string')
//      } catch (error) {
//        expect(error.message).to.contain('validation error')
//      }

//     })
//   })

// })
