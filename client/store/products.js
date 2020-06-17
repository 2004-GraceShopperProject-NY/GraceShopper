import Axios from 'axios';

//ACTION TYPES
const ALL_PRODUCTS = 'ALL_PRODUCTS';
const SINGLE_PRODUCT = 'SINGLE_PRODUCT';
const ADD_QUANTITY = 'ADD_QUANTITY';
const SUB_QUANTITY = 'SUB_QUANTITY';
const ADD_TO_CART = 'ADD_TO_CART';

//ACTION CREATORS
export const allProducts = products => {
  return {
    type: ALL_PRODUCTS,
    products
  };
};

export const singleProduct = product => {
  return {
    type: SINGLE_PRODUCT,
    product
  };
};

export const addQuantity = product => {
  return {
    type: ADD_QUANTITY,
    product
  };
};

export const subQuantity = product => {
  return {
    type: SUB_QUANTITY,
    product
  };
};

export const addedToCart = product => {
  return {
    type: ADD_TO_CART,
    product
  };
};

//THUNK
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/products');
      dispatch(allProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSingleProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/products/${productId}`);
      dispatch(singleProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCartThunk = product => {
  return dispatch => {
    try {
      dispatch(addedToCart(product));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  allProducts: [],
  selectedProduct: {},
  cart: []
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.products
      };
    case SINGLE_PRODUCT:
      return {
        ...state,
        selectedProduct: action.product
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, {quantity: 1, product: action.product}]
      };
    case SUB_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(product => {
          if (product.product.name === action.product.name) {
            return {...product, quantity: product.quantity - 1};
          }
          return product;
        })
      };
    case ADD_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(product => {
          if (product.product.name === action.product.name) {
            return {...product, quantity: product.quantity + 1};
          }
          return product;
        })
      };
    default:
      return state;
  }
}
