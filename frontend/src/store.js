import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
		user: userReducer,
	},
});

export default store;
