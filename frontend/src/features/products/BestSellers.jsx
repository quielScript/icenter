import Loader from "../../ui/Loader";
import SectionHeader from "../../ui/SectionHeader";
import ProductItem from "./ProductItem";

function BestSellers({ products, isLoading }) {
	const bestSellers = products.filter((product) => product.bestSeller);

	return (
		<div className="pb-24 mx-5 xl:mx-0">
			<SectionHeader text1="best" text2="sellers" />

			{isLoading ? (
				<div className="flex items-center justify-center col-span-full">
					<Loader />
				</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
					{bestSellers.slice(0, 5).map((product) => (
						<ProductItem product={product} key={product.id} />
					))}
				</div>
			)}
		</div>
	);
}

export default BestSellers;
