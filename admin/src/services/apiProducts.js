import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchProducts = async () => {
	try {
		const res = await axios.get(`${BACKEND_URL}/api/v1/products`);
		return res.data.data.products;
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};

export const addProduct = async (data, token) => {
	try {
		const res = await axios.post(`${BACKEND_URL}/api/v1/products`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res.data;
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};

export const deleteProduct = async (productId, token) => {
	try {
		await axios.delete(`${BACKEND_URL}/api/v1/products/${productId}`, {
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

export const updateProduct = async (productId, newData, token) => {
	try {
		const res = await axios.patch(
			`${BACKEND_URL}/api/v1/products/${productId}`,
			newData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return res.data;
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};
