import Axios from 'axios';
import {getCartItems} from './guestCart';
import history from '../history';

const CHECKOUT_CART = 'CHECKOUT_CART';

export const checkedOutCart = checkedOutInfo => {
  return {
    type: CHECKOUT_CART,
    checkedOutInfo
  };
};

export const checkOutCart = () => {
  return async dispatch => {
    try {
      let cart = JSON.parse(localStorage.getItem('cart'));
      const {data} = await Axios.post('/api/cart/checkout/guest', {cart});
      localStorage.clear();
      dispatch(getCartItems({}));
      dispatch(checkedOutCart(data));
      history.push('/checkout/orderConfirmation');
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
