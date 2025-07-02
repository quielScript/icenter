import Button from "../../ui/Button";
import OrderItem from "./OrderItem";

function Order({ order, onTrackOrder }) {
	return (
		<ul className="bg-slate-50">
			{order.items.map((item) => (
				<OrderItem order={order} item={item} key={item._id} />
			))}

			<div className="border-t border-slate-300 py-2 md:py-4 flex items-center justify-between px-0 md:px-10">
				<p className="text-xs sm:text-base md:text-lg">
					Order Total:{" "}
					<span className="font-bold">
						₱{order.totalAmount.toLocaleString()}
					</span>
				</p>
				<Button btnType="button" full={false} onClick={onTrackOrder}>
					Track Order
				</Button>
			</div>
		</ul>
	);
}

export default Order;
