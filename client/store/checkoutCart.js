import Axios from 'axios';
import {getCartItems} from './cart';
import history from '../history';

const CHECKOUT_CART = 'CHECKOUT_CART';

export const checkedOutCart = checkedOutInfo => {
  return {
    type: CHECKOUT_CART,
    checkedOutInfo
  };
};

export const checkOutCart = cart => {
  return async (dispatch, getState) => {
    try {
      let user = getState().user.id;
      let guestCart = JSON.parse(localStorage.getItem('cart'));
      if (!user) {
        const {data} = await Axios.post('/api/cart/checkout/guest', {
          cart: guestCart
        });
        dispatch(getCartItems({}));
        dispatch(checkedOutCart(data));
      }
      if (user) {
        const {data} = await Axios.put('/api/cart/checkout/user', {cart});
        dispatch(getCartItems({}));
        dispatch(checkedOutCart(data));
      }
      history.push('/checkout/orderConfirmation');
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
};

export default function checkedOutReducer(checkedOutInfo = {}, action) {
  switch (action.type) {
    case CHECKOUT_CART:
      return action.checkedOutInfo;
    default:
      return checkedOutInfo;
  }
}
