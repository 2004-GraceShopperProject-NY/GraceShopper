import Axios from 'axios';

//ACTION TYPES
const ADD_QUANTITY = 'ADD_QUANTITY';
const SUB_QUANTITY = 'SUB_QUANTITY';
const GET_CART_ITEMS = 'GET_CART_ITEMS';

//ACTION CREATORS
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

export const getCartItems = cart => {
  return {
    type: GET_CART_ITEMS,
    cart
  };
};

//THUNK
export const addToCartThunk = (product, quantity) => {
  return async (dispatch, getState) => {
    try {
      let userId = getState().user.id;
      if (!userId) {
        let cart = localStorage.getItem('cart')
          ? JSON.parse(localStorage.getItem('cart'))
          : {};
        let productId = product.id;
        cart[productId] = cart[productId] ? cart[productId] : 0;
        let qty = parseInt(cart[productId]) + parseInt(1);
        if (product.available_quantity < qty) {
          cart[productId] = product.available_quantity;
        } else {
          cart[productId] = qty;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch(getCartItems(cart));
      } else {
        const addProductToCart = await Axios.post('/api/cart', {
          product,
          quantity
        });
        dispatch(getCartItems(addProductToCart));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCartThunk = product => {
  return dispatch => {
    try {
      let cart = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : {};
      dispatch(getCartItems(cart));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function cartReducer(cart = [], action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.cart;
    case SUB_QUANTITY:
      return cart.map(product => {
        if (product.product.name === action.product.name) {
          return {...product, quantity: product.quantity - 1};
        }
        return product;
      });
    case ADD_QUANTITY:
      return cart.cart.map(product => {
        if (product.product.name === action.product.name) {
          return {...product, quantity: product.quantity + 1};
        }
        return product;
      });
    default:
      return cart;
  }
}
