import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser, updateUser } from "../../services/apiUser";
import {
	forgotUserPassword,
	resetUserPassword,
	updateUserPassword,
} from "../../services/apiAuth";

export const updateUserInfo = createAsyncThunk(
	"user/updateUserInfo",
	async ({ userInfo, token }, { rejectWithValue }) => {
		try {
			const updatedUser = await updateUser(userInfo, token);
			return updatedUser;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const getUserInfo = createAsyncThunk(
	"user/getUserInfo",
	async (token, { rejectWithValue }) => {
		try {
			const userInfo = await fetchUser(token);

			return userInfo;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const userUpdatePassword = createAsyncThunk(
	"user/userUpdatePassword",
	async ({ credentials, token }, { rejectWithValue }) => {
		try {
			const res = await updateUserPassword(credentials, token);

			return { user: res.data.data.user, token: res.data.token };
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const userForgotPassword = createAsyncThunk(
	"user/userForgotPassword",
	async (email, { rejectWithValue }) => {
		try {
			const res = await forgotUserPassword(email);

			return res.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const userResetPassword = createAsyncThunk(
	"user/userResetPassword",
	async ({ token, newCredentials }, { rejectWithValue }) => {
		try {
			const res = await resetUserPassword(token, newCredentials);

			return res.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

const initialState = {
	user: {},
	token: "",
	status: "idle",
	error: "",
	message: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	extraReducers: (builder) => {
		builder
			// Update user info
			.addCase(updateUserInfo.pending, (state) => {
				state.status = "loading";
				state.error = "";
			})
			.addCase(updateUserInfo.fulfilled, (state, action) => {
				state.status = "idle";
				state.user = action.payload;
			})
			.addCase(updateUserInfo.rejected, (state, action) => {
				state.status = "error";
				state.error = action.payload;
			})

			// Get user info
			.addCase(getUserInfo.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getUserInfo.fulfilled, (state, action) => {
				state.status = "idle";
				state.user = action.payload;
			})
			.addCase(getUserInfo.rejected, (state, action) => {
				state.status = "error";
				state.error = action.payload;
			})

			// Update user password
			.addCase(userUpdatePassword.pending, (state) => {
				state.status = "loading";
			})
			.addCase(userUpdatePassword.fulfilled, (state, action) => {
				state.status = "idle";
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(userUpdatePassword.rejected, (state, action) => {
				state.status = "error";
				state.error = action.payload;
			})

			// Forgot user password
			.addCase(userForgotPassword.pending, (state) => {
				state.status = "loading";
				state.error = "";
			})
			.addCase(userForgotPassword.fulfilled, (state, action) => {
				state.status = "idle";
				state.message = action.payload.message;
			})
			.addCase(userForgotPassword.rejected, (state, action) => {
				state.status = "error";
				state.error = action.payload || "There was a problem sending the email";
			})

			// Reset user password
			.addCase(userResetPassword.pending, (state) => {
				state.status = "loading";
			})
			.addCase(userResetPassword.fulfilled, (state, action) => {
				state.status = "idle";
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(userResetPassword.rejected, (state, action) => {
				state.status = "error";
				state.error = action.payload || "There was a problem sending the email";
			});
	},
});

// Selectors
export const getUser = (state) => state.user.user;
export const getStatus = (state) => state.user.status;

export default userSlice.reducer;
