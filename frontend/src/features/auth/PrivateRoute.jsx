import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "./authSlice";

function PrivateRoute({ children }) {
	const token = useSelector(getToken);

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return children;
}

export default PrivateRoute;
