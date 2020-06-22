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

//TO BE EDITED!!!
export const checkOutCart = cart => {
  return async (dispatch, getState) => {
    try {
      let user = getState().user.id;
      let guestCart = JSON.parse(localStorage.getItem('cart'));
      if (!user) {
        const {data} = await Axios.post('/api/cart/checkout/guest', {
          guestCart
        });
        dispatch(getCartItems({}));
        dispatch(checkedOutCart(data));
      }
      if (user) {
        console.log('this is the cart', cart);
        await Axios.put('/api/cart/checkout/user', cart);
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
