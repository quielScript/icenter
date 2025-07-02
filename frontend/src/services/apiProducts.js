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

export const fetchProduct = async (productId, token) => {
	try {
		const [productRes, reviewsRes] = await Promise.all([
			axios.get(`${BACKEND_URL}/api/v1/products/${productId}`),
			axios.get(`${BACKEND_URL}/api/v1/products/${productId}/reviews`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		]);

		return {
			productRes,
			reviewsRes,
		};
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};
