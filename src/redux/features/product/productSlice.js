import { createSlice } from "@reduxjs/toolkit";
import {
  getProductsThunk,
  getProductDetailsThunk,
  searchProductsThunk,
} from "./productThunk";

const initialState = {
  total: null,
  products: [],
  isResult: false,
  keyword: "",
  product: null,
  errMess: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    resetKeyword: (state) => {
      state.keyword = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.pending, (state) => {
        state.errMess = null;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        const { products, total } = action.payload;
        state.errMess = null;
        state.total = total;
        state.isResult = false;
        state.products = products;
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.errMess = action.payload || "Lấy data thất bại!";
      })
      .addCase(getProductDetailsThunk.pending, (state) => {
        state.errMess = null;
      })
      .addCase(getProductDetailsThunk.fulfilled, (state, action) => {
        state.errMess = null;
        state.product = action.payload;
      })
      .addCase(getProductDetailsThunk.rejected, (state, action) => {
        state.errMess = action.payload || "Lấy data thất bại!";
      })
      .addCase(searchProductsThunk.pending, (state) => {
        state.errMess = null;
      })
      .addCase(searchProductsThunk.fulfilled, (state, action) => {
        const { products, total } = action.payload;
        state.errMess = null;
        state.isResult = true;
        state.total = total;
        state.products = products;
      })
      .addCase(searchProductsThunk.rejected, (state, action) => {
        state.errMess = action.payload || "Lấy data thất bại!";
      });
  },
});

export const { updateKeyword, resetKeyword } = productSlice.actions;
export default productSlice.reducer;
