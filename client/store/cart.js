//ACTION TYPES
const UPDATE_QUANTITY = 'CHANGE_QUANTITY';
const GET_CART_ITEMS = 'GET_CART_ITEMS';

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

//THUNK
export const addToCartThunk = product => {
  return dispatch => {
    try {
      let cart = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : {};
      let productId = product.id;
      cart[productId] = cart[productId] ? cart[productId] : 0;
      let qty = parseInt(cart[productId], 10) + 1;
      if (product.quantity < qty) {
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

export const getCartThunk = () => {
  return dispatch => {
    try {
      let cart = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : {};
      dispatch(getCartItems(cart));
    } catch (error) {
      console.log('Error getting cart: ', error);
    }
  };
};

export const updateQuantityThunk = (productId, quantity) => {
  return dispatch => {
    try {
      let cart = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : {};
      cart = {...cart, [productId]: quantity};
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(updatedQuantity(productId, quantity));
    } catch (error) {
      console.log('Error updating quantity: ', error);
    }
  };
};

export default function cartReducer(cart = {}, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.cart;
    case UPDATE_QUANTITY: {
      const productId = action.productId;
      const quantity = action.quantity;
      console.log('quantity', quantity);
      return {...cart, [productId]: quantity};
    }
    default:
      return cart;
  }
}
