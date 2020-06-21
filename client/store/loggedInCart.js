import axios from 'axios';

//action types
const ADD_TO_CART = 'ADD_TO_CART';
const DISPLAY_CART = 'DISPLAY_CART';

//action creators
export const addedToCart = (product, quantity) => ({
  type: ADD_TO_CART,
  product,
  quantity
});

export const displayedCart = cart => ({
  type: DISPLAY_CART,
  cart
});

//thunks
export const addToCartLoggedIn = (product, quantity) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/cart/${product.id}/${quantity}`);
      dispatch(addedToCart(product, data.quantity));
    } catch (error) {
      console.error(error);
    }
  };
};

//reducer
export default function loggedInCartReducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      if (
        state.some(product => {
          // product.id === action.product.id;
        })
      ) {
        return [...state].map(product => {
          if (product.id === action.product.id) {
            product.quantity = action.quantity;
          }
        });
      } else {
        return [...state, {...action.product, quantity: action.quantity}];
      }
    default:
      return state;
  }
}
