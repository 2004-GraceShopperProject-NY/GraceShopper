import {expect} from 'chai';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createStore, applyMiddleware} from 'redux';
import enforceImmutableState from 'redux-immutable-state-invariant';

import cartReducer, {getCartItems, updatedQuantity} from '../store/cart';

const adapter = new Adapter();
enzyme.configure({adapter});

// function mockLocalStorage() {
//   let store = {};
//   return {
//     getItem: function (key) {
//       return store[key] || null;
//     },
//     setItem: function (key, value) {
//       store[key] = JSON.stringify(value);
//     },
//     removeItem: function (key) {
//       delete store[key];
//     },
//     clear: function () {
//       store = {};
//     },
//   };
// }

// global.localStorage = mockLocalStorage();

const cart = {
  '1': 5,
  '3': 3,
  '2': 20
};

const products = [
  {
    id: 2,
    name: 'Mask',
    price: 2000,
    quantity: 100
  },
  {
    id: 3,
    name: 'Sanitizer',
    price: 1000,
    quantity: 80
  },
  {
    id: 1,
    name: 'Toilet Paper',
    price: 800,
    quantity: 50
  }
];

describe('Cart Redux Store', () => {
  describe('Action creators', () => {
    describe('getCartItems action creator', () => {
      it('it takes in a cart', () => {
        expect(getCartItems(cart)).to.deep.equal({
          type: 'GET_CART_ITEMS',
          cart
        });
      });
    });

    describe('updatedQuantity action creator', () => {
      it('it takes in a product id and quantity', () => {
        const productId = products[1].id;
        const quantity = cart[productId];

        expect(updatedQuantity(productId, quantity)).to.be.deep.equal({
          type: 'UPDATE_QUANTITY',
          productId,
          quantity
        });
      });
    });
  });

  describe('Reducer', () => {
    it('returns the initial state by default', () => {
      const store = createStore(
        cartReducer,
        applyMiddleware(enforceImmutableState())
      );

      expect(store.getState()).to.be.an('object');
    });
  });
});
