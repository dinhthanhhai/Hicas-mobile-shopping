import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getListProducts,
  getProductDetails,
  searchProducts,
} from "../../../services/productServices";
import { setLoading } from "../uiSlice";

export const getProductsThunk = createAsyncThunk(
  "product/getProducts",
  async ({ page, limit }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await getListProducts(page || 1, limit || 10);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Lấy data thất bại!");
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getProductDetailsThunk = createAsyncThunk(
  "product/getDetails",
  async (id, { dispatch, thunkAPI }) => {
    try {
      dispatch(setLoading(true));
      const response = await getProductDetails(id);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Lấy data thất bại!");
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const searchProductsThunk = createAsyncThunk(
  "product/search",
  async (keyword, { dispatch, thunkAPI }) => {
    try {
      dispatch(setLoading(true));
      const response = await searchProducts(keyword);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Lấy data thất bại!");
    } finally {
      dispatch(setLoading(false));
    }
  }
);
