import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const updateUser = async (userInfo, token) => {
	try {
		const res = await axios.patch(
			`${BACKEND_URL}/api/v1/users/updateMe`,
			userInfo,
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		return res.data.data.user;
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};

export const fetchUser = async (token) => {
	try {
		const res = await axios.get(`${BACKEND_URL}/api/v1/users/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return res.data.data.user;
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};
