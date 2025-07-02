import Loader from "../../ui/Loader";
import SectionHeader from "../../ui/SectionHeader";
import ProductItem from "./ProductItem";

function LatestProducts({ products, isLoading }) {
	return (
		<div className="py-24 sm:pt-0 pb-24 mx-5 xl:mx-0">
			<SectionHeader text1="latest" text2="products" />

			{isLoading ? (
				<div className="flex items-center justify-center col-span-full">
					<Loader />
				</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
					{products.slice(0, 5).map((product) => (
						<ProductItem product={product} key={product.id} />
					))}
				</div>
			)}
		</div>
	);
}

export default LatestProducts;
