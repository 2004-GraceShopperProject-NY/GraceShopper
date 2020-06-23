import Axios from 'axios';

//ACTION TYPES
const UPDATE_QUANTITY = 'CHANGE_QUANTITY';
const GET_CART_ITEMS = 'GET_CART_ITEMS';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

//ACTION CREATORS

export const updatedQuantity = (productId, quantity) => {
  return {
    type: UPDATE_QUANTITY,
    productId,
    quantity
  };
};

export const getCartItems = cart => {
  return {
    type: GET_CART_ITEMS,
    cart
  };
};

export const removedItem = productId => {
  return {
    type: REMOVE_FROM_CART,
    productId
  };
};

//THUNK
export const addToCartThunk = (product, quantity) => {
  return dispatch => {
    try {
      let cart = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : {};
      let productId = product.id;
      cart[productId] = cart[productId] ? cart[productId] : 0;
      let qty = parseInt(cart[productId], 10) + parseInt(quantity, 10);
      if (product.quantity === 0) {
        alert('Sorry, we are out of stock!');
      } else if (product.quantity < qty) {
        cart[productId] = product.quantity;
      } else {
        cart[productId] = qty;
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(getCartItems(cart));
    } catch (error) {
      console.log('Error adding to cart: ', error);
    }
  };
};

export const addToDb = (product, quantity) => {
  return async () => {
    try {
      if (product.quantity === 0) {
        alert('Sorry, we are out of stock!');
        return;
      } else if (quantity > product.quantity) {
        quantity = product.quantity;
      }
      await Axios.post('/api/cart', {product, quantity});
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeFromDb = id => {
  return async () => {
    try {
      await Axios.delete(`/api/cart/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateDbQuantity = (product, quantity) => {
  return async () => {
    try {
      await Axios.put('/api/cart', {product, quantity});
    } catch (error) {
      console.error(error);
    }
  };
};

export const getCartThunk = () => {
  return async (dispatch, getState) => {
    try {
      const user = getState().user.id;
      if (!user) {
        let cart = localStorage.getItem('cart')
          ? JSON.parse(localStorage.getItem('cart'))
          : {};
        dispatch(getCartItems(cart));
      } else {
        const {data} = await Axios.get('/api/cart');
        dispatch(getCartItems(data));
      }
    } catch (error) {
      console.log('Error getting cart: ', error);
    }
  };
};

export const updateQuantityThunk = (productId, quantity) => {
  return dispatch => {
    try {
      let cart = JSON.parse(localStorage.getItem('cart'));
      cart = {...cart, [productId]: quantity};
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(updatedQuantity(productId, quantity));
    } catch (error) {
      console.log('Error updating quantity: ', error);
    }
  };
};

export const removeFromCart = productId => {
  return dispatch => {
    try {
      let cart = JSON.parse(localStorage.getItem('cart'));
      delete cart[productId];
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(removedItem(productId));
    } catch (error) {
      console.log('Error removing item from cart: ', error);
    }
  };
};

export default function cartReducer(cart = {}, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.cart;
    case UPDATE_QUANTITY:
      return {...cart, [action.productId]: action.quantity};
    case REMOVE_FROM_CART: {
      let updatedCart = {...cart};
      delete updatedCart[action.productId];
      return updatedCart;
    }
    default:
      return cart;
  }
}
