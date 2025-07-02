import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const addToCart = async (productId, quantity, color, token) => {
	try {
		const res = await axios.post(
			`${BACKEND_URL}/api/v1/carts`,
			{
				productId,
				quantity,
				color,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return res.data.data.cartItem;
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};

export const fetchUserCart = async (token) => {
	try {
		const res = await axios.get(`${BACKEND_URL}/api/v1/carts`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return res.data.data.cart;
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};

export const deleteItem = async (itemId, token) => {
	try {
		await axios.delete(`${BACKEND_URL}/api/v1/carts/${itemId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};

export const updateItem = async (itemId, quantity, token) => {
	try {
		const res = await axios.patch(
			`${BACKEND_URL}/api/v1/carts/${itemId}`,
			{ quantity },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return res.data.data.updatedCartItem;
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};
