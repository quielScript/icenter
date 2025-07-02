import { fetchAllUserOrders } from "../../services/apiOrder";
import SectionHeader from "../../ui/SectionHeader";
import Order from "./Order";
import { useSelector } from "react-redux";
import { getToken } from "../auth/authSlice";
import { useQuery } from "@tanstack/react-query";

function Orders() {
	const token = useSelector(getToken);

	const {
		data: orders = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["userOrders"],
		queryFn: () => fetchAllUserOrders(token),
		staleTime: 1000 * 60 * 5,
	});

	return (
		<div className="max-w-7xl xl:mx-auto mx-10 pt-6 md:pt-16 pb-14 md:pb-24">
			<SectionHeader text1="orders" />

			{isLoading && orders.length < 1 && <p>Loading orders...</p>}

			{!isLoading && orders.length < 1 ? (
				<p>There&apos;s nothing here...</p>
			) : (
				<div className="space-y-4">
					{orders.map((order, i) => (
						<Order order={order} key={i} onTrackOrder={refetch} />
					))}
				</div>
			)}
		</div>
	);
}

export default Orders;
