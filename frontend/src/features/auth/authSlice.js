import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: localStorage.getItem("token") || "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken(state, action) {
			state.token = action.payload;
			localStorage.setItem("token", action.payload);
		},
		removeToken(state, action) {
			state.token = "";
			localStorage.removeItem("token");
		},
	},
});

// Actions
export const { setToken, removeToken } = authSlice.actions;

// Selectors
export const getToken = (state) => state.auth.token;

export default authSlice.reducer;
