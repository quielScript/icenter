import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (credentials) => {
	try {
		const res = await axios.post(
			`${BACKEND_URL}/api/v1/users/admin/login`,
			credentials,
			{ withCredentials: true }
		);

		return res;
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};
