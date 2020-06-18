//ACTION TYPES
const ADD_QUANTITY = 'ADD_QUANTITY';
const SUB_QUANTITY = 'SUB_QUANTITY';
const ADD_TO_CART = 'ADD_TO_CART';

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

export const addedToCart = product => {
  return {
    type: ADD_TO_CART,
    product
  };
};

//THUNK
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
  cart: []
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
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
