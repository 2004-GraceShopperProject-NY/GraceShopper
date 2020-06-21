import {expect} from 'chai';
import productsReducer, {
  allProducts,
  singleProduct,
  fetchProducts,
  getSingleProduct
} from './products';
import {createStore, applyMiddleware} from 'redux';
import enforceImmutableState from 'redux-immutable-state-invariant';
import MockAxiosAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';

let mockAxios;
let store;

const ALL_PRODUCTS = [
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

const SINGLE_PRODUCT = {
  id: 2,
  name: 'Mask',
  price: 2000,
  quantity: 100
};

function getRandomProduct(products) {
  return products[Math.floor(Math.random() * products.length)];
}

describe('Action creators', () => {
  describe('allProducts action creator', () => {
    it('it takes in products', () => {
      const products = getRandomProduct(ALL_PRODUCTS);

      expect(allProducts(products)).to.be.deep.equal({
        type: 'ALL_PRODUCTS',
        products
      });
    });
  });

  describe('singleProduct action creator', () => {
    it('it takes in a product', () => {
      const product = getRandomProduct(SINGLE_PRODUCT);

      expect(singleProduct(product)).to.be.deep.equal({
        type: 'SINGLE_PRODUCT',
        product
      });
    });
  });
});

describe('Reducer', () => {
  it('returns the initial state by default', () => {
    store = createStore(
      productsReducer,
      applyMiddleware(enforceImmutableState())
    );

    expect(store.getState().allProducts).to.be.an('array');
    expect(store.getState().selectedProduct).to.be.an('object');
  });
});

describe('reduces on ALL_PRODUCTS action', () => {
  it("sets the action's products as the allProducts on state (without mutating the previous state)", () => {
    store = createStore(
      productsReducer,
      applyMiddleware(enforceImmutableState())
    );
    const prevState = store.getState();

    const products = getRandomProduct(ALL_PRODUCTS);
    const action = {
      type: 'ALL_PRODUCTS',
      products
    };
    store.dispatch(action);

    const newState = store.getState();

    expect(store.getState().allProducts).to.be.deep.equal(products);
    expect(newState.allProducts).to.not.be.equal(prevState.allProducts);
    expect(newState.products).to.deep.equal(prevState.products);
  });
});

describe('reduces on SINGLE_PRODUCT action', () => {
  it("sets the action's of a single product as the singleProduct on state (without mutating the previous state)", () => {
    store = createStore(
      productsReducer,
      applyMiddleware(enforceImmutableState())
    );
    const prevState = store.getState();

    const product = getRandomProduct(SINGLE_PRODUCT);
    const action = {
      type: 'SINGLE_PRODUCT',
      product
    };
    store.dispatch(action);

    const newState = store.getState();

    expect(store.getState().singleProduct).to.be.deep.equal(product);
    expect(newState.product).to.deep.equal(prevState.product);
  });
});

describe('GET /products', () => {
  beforeEach(() => {
    mockAxios = new MockAxiosAdapter(axios);
    mockAxios.onGet('/api/products').reply(200, [
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
    ]);
    store = createStore(
      productsReducer,
      applyMiddleware(thunkMiddleware, enforceImmutableState())
    );
    mockAxios.onGet('/products');
  });

  it('sets the received products to allProducts on state', async () => {
    await store.dispatch(fetchProducts());
    const state = store.getState();
    expect(state.allProducts).to.deep.equal([
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
    ]);
  });
});

describe('GET /products/productId', () => {
  beforeEach(() => {
    mockAxios = new MockAxiosAdapter(axios);
    mockAxios.onGet(`/api/products/1`).reply(200, {
      id: 1,
      name: 'Toilet Paper',
      quantity: 100,
      price: 1500,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/9133wpvx-uL._AC_SL1500_.jpg',
      description: 'Just got real with Scott ComfortPlus Toilet paper',
      createdAt: '2020-06-20T05:33:38.591Z',
      updatedAt: '2020-06-20T05:33:38.591Z'
    });
    store = createStore(
      productsReducer,
      applyMiddleware(thunkMiddleware, enforceImmutableState())
    );
  });

  it('getSingleProduct sets selectedProduct in the state', async () => {
    await store.dispatch(getSingleProduct(1));
    const state = store.getState();
    expect(state.selectedProduct).to.deep.equal({
      id: 1,
      name: 'Toilet Paper',
      quantity: 100,
      price: 1500,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/9133wpvx-uL._AC_SL1500_.jpg',
      description: 'Just got real with Scott ComfortPlus Toilet paper',
      createdAt: '2020-06-20T05:33:38.591Z',
      updatedAt: '2020-06-20T05:33:38.591Z'
    });
  });
});
