import { useLoaderData } from "react-router-dom";
import { fetchAllUserOrders } from "../../services/apiOrder";
import Order from "../orders/Order";

function MyOrders() {
	const orders = useLoaderData();

	return (
		<div>
			{!orders || orders.length < 1 ? (
				<p>There&apos;s nothing here...</p>
			) : (
				<div className="space-y-4">
					{orders.map((order, i) => (
						<Order order={order} key={i} />
					))}
				</div>
			)}
		</div>
	);
}

export const loader = (queryClient) => {
	return async () => {
		const token = localStorage.getItem("token");
		const queryKey = ["userOrders"];

		const cachedData = queryClient.getQueryData(queryKey);

		if (cachedData) return cachedData;

		const orders = await fetchAllUserOrders(token);

		queryClient.setQueryData(queryKey, orders);

		return orders || [];
	};
};

export default MyOrders;
