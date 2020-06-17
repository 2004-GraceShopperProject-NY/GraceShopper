import Axios from 'axios';

//ACTION TYPES
const ALL_PRODUCTS = 'ALL_PRODUCTS';
const SINGLE_PRODUCT = 'SINGLE_PRODUCT';

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

const initialState = {
  allProducts: [],
  selectedProduct: {}
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
    default:
      return state;
  }
}
