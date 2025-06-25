import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart";
import wishlistReducer from "./features/wishlist";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
