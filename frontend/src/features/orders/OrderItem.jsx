function OrderItem({ order, item }) {
	return (
		<li>
			<div className="px-0 md:px-10 flex sm:flex-row items-center justify-between py-2 md:py-4">
				<div className="flex flex-col sm:flex-row sm:items-center mb-2 md:mb-0">
					<img
						src={item.productImgCover}
						alt={item.productName}
						className="w-16 h-16 sm:w-20 sm:h-20 object-cover"
					/>
					<div className="text-xs md:text-base flex flex-col">
						<p className="font-bold">{item.productName}</p>
						<p>Color: {item.color}</p>
						<p>Quantity: {item.quantity}</p>
					</div>
				</div>

				<div className="flex flex-col gap-2 items-center text-xs md:text-base">
					<p className="font-bold text-xs md:text-lg">
						₱{item.price.toLocaleString()}
					</p>
					<div className="bg-green-100 text-green-500 p-2 rounded-md">
						<p className="capitalize">{order.status}</p>
					</div>
				</div>
			</div>
		</li>
	);
}

export default OrderItem;
