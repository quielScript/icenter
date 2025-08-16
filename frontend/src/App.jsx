import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Contact from "./ui/Contact";
import Products, {
	loader as productsLoader,
} from "./features/products/Products";
import PlaceOrder from "./features/orders/PlaceOrder";
import Cart from "./features/cart/Cart";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import Product, { loader as productLoader } from "./features/products/Product";
import Orders from "./features/orders/Orders";
import User from "./features/user/User";
import PrivateRoute from "./features/auth/PrivateRoute";
import PersonalInfo from "./features/user/PersonalInfo";
import MyOrders, { loader as myOrdersLoader } from "./features/user/MyOrders";
import UserSettings from "./features/user/UserSettings";
import ForgotPassword from "./features/user/ForgotPassword";

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
			{
				path: "/forgot-password",
				element: <ForgotPassword />,
			},
			{
				path: "/user",
				element: <User />,
				children: [
					{
						index: true,
						element: <Navigate to="/user/info" />,
					},
					{
						path: "info",
						element: <PersonalInfo />,
					},
					{
						path: "orders",
						element: <MyOrders />,
						loader: myOrdersLoader(queryClient),
					},
					{
						path: "settings",
						element: <UserSettings />,
					},
				],
			},
			{
				path: "/products",
				element: <Products />,
				loader: productsLoader(queryClient),
			},
			{
				path: "/products/:productId",
				element: <Product />,
				loader: productLoader,
			},

			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "/order/new",
				element: (
					<PrivateRoute>
						<PlaceOrder queryClient={queryClient} />
					</PrivateRoute>
				),
			},
			{
				path: "/orders",
				element: (
					<PrivateRoute>
						<Orders />
					</PrivateRoute>
				),
			},
			{
				path: "/contact",
				element: <Contact />,
			},
		],
	},
]);

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />

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
				<RouterProvider router={router} />
			</QueryClientProvider>
		</>
	);
}

export default App;
