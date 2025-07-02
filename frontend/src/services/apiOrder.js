import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const DELIVERY_FEE = 370;

export const checkout = async (
	name,
	contactNumber,
	address,
	zipCode,
	token
) => {
	try {
		const res = await axios.post(
			`${BACKEND_URL}/api/v1/orders`,
			{
				name,
				contactNumber,
				address,
				zipCode,
				paymentMethod: "cod",
				deliveryFee: DELIVERY_FEE,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return res.data.data.order;
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};

export const fetchOrder = async (orderId, token) => {
	try {
		const res = await axios.get(`${BACKEND_URL}/api/v1/orders/${orderId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return res.data.data.order;
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};

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
