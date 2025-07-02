import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser, updateUser } from "../../services/apiUser";
import { updateUserPassword } from "../../services/apiAuth";

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

const initialState = {
	user: {},
	token: "",
	status: "idle",
	error: "",
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
			});
	},
});

// Selectors
export const getUser = (state) => state.user.user;

export default userSlice.reducer;
