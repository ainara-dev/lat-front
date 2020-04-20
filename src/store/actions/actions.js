import {
  CREATE_PRODUCT_SUCCESS,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_PRODUCTS_SUCCESS,
} from "./actionTypes";
import { push } from "connected-react-router";
import axios from "../../axios-api";

export const fetchProductsSuccess = (products) => {
  return { type: FETCH_PRODUCTS_SUCCESS, products };
};

export const createProductSuccess = () => {
  return { type: CREATE_PRODUCT_SUCCESS };
};

export const createProduct = (product) => {
  return (dispatch) => {
    return axios.post("/products", product).then(() => {
      dispatch(createProductSuccess());
      dispatch(push("/"));
    });
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    axios.get("/products").then((response) => {
      dispatch(fetchProductsSuccess(response.data));
    });
  };
};

const fetchCategoriesSuccess = (categories) => {
  return { type: FETCH_CATEGORIES_SUCCESS, categories };
};

export const fetchCategories = () => {
  return (dispatch) => {
    axios.get("/categories").then((response) => {
      dispatch(fetchCategoriesSuccess(response.data));
    });
  };
};
