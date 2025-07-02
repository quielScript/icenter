import { useEffect, useState } from "react";
import { fetchAllUserOrders } from "../services/apiOrder";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import OrderItem from "../components/OrderItem";

function Orders() {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { token } = useAuth();

	useEffect(() => {
		const getProducts = async () => {
			try {
				setIsLoading(true);
				const res = await fetchAllUserOrders(token);
				setOrders(res.reverse());
			} catch (err) {
				toast.error(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		getProducts();
	}, [token]);

	const handleOrderUpdate = (updatedOrder) => {
		setOrders((prevOrder) =>
			prevOrder.map((order) =>
				order.id === updatedOrder._id ? updatedOrder : order
			)
		);
	};

	const handleOrderDelete = (orderId) => {
		setOrders((prevOrder) =>
			prevOrder.filter((order) => order._id !== orderId)
		);
	};

	return (
		<div>
			<h1 className="font-bold text-2xl mb-10">All Orders</h1>

			<div className="border border-slate-300 grid gap-5 grid-cols-4 px-2 font-bold bg-black text-white mb-5">
				<p>Item</p>
				<p>Order Info</p>
				<p>Customer Info</p>
				<p>Actions</p>
			</div>

			{isLoading && <p>Loading orders...</p>}

			{!isLoading && orders.length < 1 && <p>No orders...</p>}

			{orders.length > 0 && !isLoading && (
				<ul className="space-y-2">
					{orders.map((order, i) => (
						<OrderItem
							order={order}
							key={i}
							onOrderUpdate={handleOrderUpdate}
							onOrderDelete={handleOrderDelete}
						/>
					))}
				</ul>
			)}
		</div>
	);
}

export default Orders;
