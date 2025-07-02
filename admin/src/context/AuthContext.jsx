import { createContext, useContext, useReducer } from "react";
import { login } from "../services/apiAuth";

const AuthContext = createContext();

const initialState = {
	token: localStorage.getItem("adminToken") || "",
};

function reducer(state, action) {
	switch (action.type) {
		case "login":
			return {
				...state,
				token: action.payload,
			};
		case "logout":
			return {
				...state,
				token: "",
			};
		default:
			throw new Error("Unknown action");
	}
}

function AuthProvider({ children }) {
	const [{ token }, dispatch] = useReducer(reducer, initialState);

	const loginAdmin = async (email, password) => {
		const credentials = { email, password };

		try {
			const res = await login(credentials);
			dispatch({ type: "login", payload: res.data.token });
			localStorage.setItem("adminToken", res.data.token);
			return res;
		} catch (err) {
			throw new Error(err.message);
		}
	};

	const logoutAdmin = () => {
		dispatch({ type: "logout" });
		localStorage.removeItem("adminToken");
	};

	return (
		<AuthContext.Provider value={{ token, loginAdmin, logoutAdmin }}>
			{children}
		</AuthContext.Provider>
	);
}

const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error("AuthContext was used outside the AuthProvider");
	return context;
};

export { AuthProvider, useAuth };
