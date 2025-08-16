import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 *
 * @param {string} endpoint - API endpoint (login, signup)
 * @param {object} credentials - User credentials
 * @returns {Promise} - axios response
 */
const authRequest = async (endpoint, credentials) => {
	try {
		const res = await axios.post(
			`${BACKEND_URL}/api/v1/users/${endpoint}`,
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
export const loginUser = (credentials) => authRequest("login", credentials);
export const signupUser = (credentials) => authRequest("signup", credentials);

export const updateUserPassword = async (credentials, token) => {
	try {
		const res = await axios.patch(
			`${BACKEND_URL}/api/v1/users/updateMyPassword`,
			credentials,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return res;
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};

export const forgotUserPassword = async (email) => {
	try {
		const res = await axios.post(`${BACKEND_URL}/api/v1/users/forgotPassword`, {
			email,
		});

		return res;
	} catch (err) {
		const message =
			err.response?.data?.message || "Something went wrong. Please try again.";
		throw new Error(message);
	}
};
