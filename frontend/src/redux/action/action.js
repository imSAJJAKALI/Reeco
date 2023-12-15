import axios from "axios";
import {  EDIT_PRODUCT_FAILURE, EDIT_PRODUCT_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_SUCCESS, UPDATE_PRODUCT, UPDATE_PRODUCT_STATUS } from "../actionTypes/actionTypes";

export const updateProductStatus = (productId, status) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(`${process.env.url}/products/${productId}`, { status });
      dispatch({
        type: UPDATE_PRODUCT_STATUS,
        payload: { productId, status: response.data.status },
      });
    } catch (error) {
      console.error('Error updating product status:', error.message);
    }
  };
}

export const updateProduct = (productId, updatedData) => ({
  type: UPDATE_PRODUCT,
  payload: { productId, updatedData },
});

export const editProductSuccess = () => ({
  type: EDIT_PRODUCT_SUCCESS,
});

export const editProductFailure = (error) => ({
  type: EDIT_PRODUCT_FAILURE,
  payload: error,
});


export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.url}/products`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    // console.log(data,"datain Action")
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};