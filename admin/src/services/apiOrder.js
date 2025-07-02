import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchAllUserOrders = async (token) => {
	try {
		const res = await axios.get(`${BACKEND_URL}/api/v1/orders`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return res.data.data.orders;
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};

export const updateOrder = async (orderId, newData, token) => {
	try {
		const res = await axios.patch(
			`${BACKEND_URL}/api/v1/orders/${orderId}`,
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

export const deleteOrder = async (orderId, token) => {
	try {
		await axios.delete(`${BACKEND_URL}/api/v1/orders/${orderId}`, {
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
