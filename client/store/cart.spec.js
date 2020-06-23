import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
// import waitForExpect from 'wait-for-expect';
import {Provider} from 'react-redux';
import * as rrd from 'react-router-dom';

const {MemoryRouter} = rrd;

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

const initialState = {
  cart: {}
};

// import mockAxios from '../mock-axios';
import {
  updatedQuantity,
  getCartItems,
  removedItem,
  addToCartThunk,
  getCartThunk,
  updateQuantityThunk,
  removeFromCart
} from '../store/cart';

import store, {reducer} from '.';
import {createStore} from 'redux';

const adapter = new Adapter();
enzyme.configure({adapter});

function mockLocalStorage() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = JSON.stringify(value);
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
}

global.localStorage = mockLocalStorage();
const cart = {
  '1': 5,
  '4': 3
};

describe('Guest Cart Redux', () => {
  let fakeStore;
  beforeEach(() => {
    fakeStore = mockStore(initialState);
  });
  describe('get cart items', () => {
    it('getCartItems action creator', () => {
      expect(getCartItems(cart)).to.deep.equal({
        type: 'GET_CART_ITEMS',
        cart
      });
    });

    it('getCartThunk thunk creator returns a thunk that gets cart items from local storage', () => {
      localStorage.setItem('cart', cart);
      fakeStore.dispatch(getCartThunk());
      const actions = fakeStore.getActions();
      expect(actions[0].type).to.equal('GET_CART_ITEMS');
      expect(actions[0].cart).to.deep.equal(cart);
    });
  });
});
