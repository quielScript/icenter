import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const addReview = async (review, rating, productId, token) => {
	try {
		const res = await axios.post(
			`${BACKEND_URL}/api/v1/products/${productId}/reviews`,
			{
				review,
				rating,
			},
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

export const checkEligibility = async (productId, token) => {
	try {
		const res = await axios.get(
			`${BACKEND_URL}/api/v1/reviews/check-eligibility/${productId}`,
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
