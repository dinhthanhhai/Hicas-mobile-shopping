import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  total: 0,
  viewProduct: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setViewProduct: (state, action) => {
      state.viewProduct = action.payload;
    },
    removeViewProduct: (state) => {
      state.viewProduct = null;
    },
    addProduct: (state, action) => {
      const product = action.payload;
      const existingItem = state.products.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.products.push({ product, count: 1 });
      }
      state.total += 1;
    },
    minusProduct: (state, action) => {
      const id = action.payload;
      const existingItem = state.products.find(
        (item) => item.product.id === id
      );

      if (existingItem && existingItem.count >= 2) {
        existingItem.count -= 1;
      } else {
        state.products = state.products.filter(
          (item) => item.product.id !== existingItem.product.id
        );
      }
      state.total -= 1;
    },
    deleteProduct: (state, action) => {
      const id = action.payload;
      const existingItem = state.products.find(
        (item) => item.product.id === id
      );
      state.total -= existingItem.count;
      state.products = state.products.filter(
        (item) => item.product.id !== existingItem.product.id
      );
    },
  },
});

export const {
  addProduct,
  minusProduct,
  deleteProduct,
  setViewProduct,
  removeViewProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
