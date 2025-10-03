import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/user/userSlice";
import productReducer from "./features/product/productSlice";
import cartReducer from "./features/cart/cartSlice";
import uiReducer from "./features/uiSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
