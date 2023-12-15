import { EDIT_PRODUCT_FAILURE, EDIT_PRODUCT_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_SUCCESS, UPDATE_PRODUCT, UPDATE_PRODUCT_STATUS } from "../actionTypes/actionTypes";

// reducers.js
const initialState = {
  products: [],
  error: null,
};

const rootReducer = (state = initialState, action) => {
  // console.log(action.payload,"action reduce")
  // console.log(action.payload,"action reduce")
  switch (action.type) {
    case UPDATE_PRODUCT:
      const { updatedData } = action.payload;
      const updatedProduct = state.products.map(product => {
        if (product.id === action.payload.productId) {
          return { ...product, ...updatedData };
        }
        return product;
      });

      return { ...state, products: updatedProduct };

    case EDIT_PRODUCT_SUCCESS:
      return { ...state, error: null };

    case EDIT_PRODUCT_FAILURE:
      return { ...state, error: action.payload };

    case UPDATE_PRODUCT_STATUS:
      const { productId, status } = action.payload;
      const updatedProducts = state.products.map(product => {
        if (product.id === productId) {
          return { ...product, status };
        }
        return product;
      });

      return { ...state, products: updatedProducts };

    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload, error: null };

    case FETCH_PRODUCTS_FAILURE:
      return { ...state, products: [], error: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
