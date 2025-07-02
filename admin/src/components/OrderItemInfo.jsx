function OrderItemInfo({ item }) {
	return (
		<div className="flex gap-5">
			<img
				src={item.productImgCover}
				alt={item.productName}
				className="w-15 h-15 border border-slate-300"
			/>
			<div>
				<p>
					<span className="font-bold">Name:</span> {item.productName}
				</p>
				<p>
					<span className="font-bold">Color:</span> {item.color}
				</p>
				<p>
					<span className="font-bold">Price:</span> ₱
					{item.price.toLocaleString()}
				</p>
				<p>
					<span className="font-bold">Quantity:</span> {item.quantity}
				</p>
			</div>
		</div>
	);
}

export default OrderItemInfo;
