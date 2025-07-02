import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import AppLayout from "./components/AppLayout";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import Orders from "./pages/Orders";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<ToastContainer
					position="top-center"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>

				<Routes>
					<Route path="/" element={<Navigate to="/admin/login" replace />} />
					<Route path="/admin/login" element={<Login />} />
					<Route
						path="/admin"
						element={
							<PrivateRoute>
								<AppLayout />
							</PrivateRoute>
						}
					>
						<Route index element={<Navigate to="add-product" />} />
						<Route path="add-product" element={<AddProduct />}></Route>
						<Route path="products" element={<Products />}></Route>
						<Route path="orders" element={<Orders />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
