import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import {
	addToCart,
	deleteItem,
	fetchUserCart,
	updateItem,
} from "../../services/apiCart";

export const addItemToCart = createAsyncThunk(
	"cart/addItemToCart",
	async ({ productId, quantity, color, token }, { rejectWithValue }) => {
		try {
			const item = await addToCart(productId, quantity, color, token);
			return item;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const getUserCart = createAsyncThunk(
	"cart/getUserCart",
	async (token, { rejectWithValue }) => {
		try {
			const cart = await fetchUserCart(token);
			return cart;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const deleteItemFromCart = createAsyncThunk(
	"cart/deleteItemFromCart",
	async ({ itemId, token }, { rejectWithValue }) => {
		try {
			await deleteItem(itemId, token);
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const updateCartItemQuantity = createAsyncThunk(
	"cart/updateCartItemQuantity",
	async ({ itemId, quantity, token }, { rejectWithValue }) => {
		try {
			const item = await updateItem(itemId, quantity, token);
			return item;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

const initialState = {
	cart: [],
	status: "idle",
	error: "",
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	extraReducers: (builder) => {
		builder
			// Add to cart
			.addCase(addItemToCart.pending, (state) => {
				state.status = "loading";
				state.error = "";
			})
			.addCase(addItemToCart.fulfilled, (state) => {
				state.status = "idle";
			})
			.addCase(addItemToCart.rejected, (state, action) => {
				state.status = "error";
				state.error = action.payload;
			})

			// Get user cart
			.addCase(getUserCart.pending, (state) => {
				state.status = "loading";
				state.error = "";
			})
			.addCase(getUserCart.fulfilled, (state, action) => {
				state.status = "idle";
				state.cart = action.payload;
			})
			.addCase(getUserCart.rejected, (state, action) => {
				state.status = "error";
				state.error = action.payload;
			})

			// Delete cart item
			.addCase(deleteItemFromCart.pending, (state) => {
				state.status = "loading";
				state.error = "";
			})
			.addCase(deleteItemFromCart.fulfilled, (state, action) => {
				state.status = "idle";
				const deletedItemId = action.meta.arg.itemId;
				state.cart = state.cart.filter((item) => item.id !== deletedItemId);
			})
			.addCase(deleteItemFromCart.rejected, (state, action) => {
				state.status = "error";
				state.error = action.payload;
			})

			// Update cart item
			.addCase(updateCartItemQuantity.pending, (state) => {
				state.status = "";
				state.error = "";
			})
			.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
				state.status = "idle";
				const itemId = action.meta.arg.itemId;
				const updatedItem = action.payload;

				state.cart = state.cart.map((item) =>
					item.id === itemId ? { ...item, ...updatedItem } : item
				);
			})
			.addCase(updateCartItemQuantity.rejected, (state, action) => {
				state.status = "error";
				state.error = action.payload;
			});
	},
});

// Actions

// Selectors
export const getCartItems = (state) => state.cart.cart;

export const getCartQuantity = createSelector(
	getCartItems,
	(cart) => cart.length
);

export const getTotalCartAmount = createSelector(getCartItems, (cart) =>
	cart.reduce((acc, item) => item.totalPrice + acc, 0)
);

export default cartSlice.reducer;
