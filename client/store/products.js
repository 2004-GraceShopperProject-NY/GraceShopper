import Axios from 'axios';

//ACTION TYPES
const ALL_PRODUCTS = 'ALL_PRODUCTS';
const SINGLE_PRODUCT = 'SINGLE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

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

export const deleteProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    productId
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

export const deleteProductThunk = productId => {
  return async dispatch => {
    try {
      await Axios.delete(`/api/admin/${productId}`);
      dispatch(deleteProduct(productId));
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
    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter(
          product => product.id !== action.productId
        )
      };
    default:
      return state;
  }
}
