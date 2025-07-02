import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
	const { token } = useAuth();

	if (!token) return <Navigate to="/admin/login" replace />;

	return children;
}

export default PrivateRoute;
