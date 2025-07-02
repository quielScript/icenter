import { FaStar } from "react-icons/fa6";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductSpecs from "./ProductSpecs";
import Reviews from "../review/Reviews";
import RelatedProducts from "./RelatedProducts";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import { fetchProduct } from "../../services/apiProducts";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getToken } from "../auth/authSlice";
import { addItemToCart, getUserCart } from "../cart/cartSlice";

function Product() {
	const res = useLoaderData();
	const [product, setProduct] = useState(res.productRes.data.data.product);
	const [reviews, setReviews] = useState(res.reviewsRes.data.data.reviews);
	const [image, setImage] = useState(product.images[0]);
	const [color, setColor] = useState(product.colors[0]);
	const [productNav, setProductNav] = useState("specs");
	const [quantity, setQuantity] = useState(1);
	const navigate = useNavigate();
	const token = useSelector(getToken);
	const dispatch = useDispatch();

	useEffect(() => {
		setImage(product.images[0]);
		setColor(product.colors[0]);
	}, [product]);

	const handleAddToCart = () => {
		if (!token) return navigate("/login");

		const { id } = product;

		dispatch(
			addItemToCart({
				productId: id,
				quantity,
				color,
				token,
			})
		).then(() => dispatch(getUserCart(token)));
	};

	return (
		<div className="max-w-7xl xl:mx-auto mx-4 sm:mx-6 md:mx-10 pt-6 md:pt-16 pb-14 md:pb-24">
			<div className="grid sm:grid-cols-[1.2fr_2fr] gap-10 mb-10 ">
				{/* Right hand */}
				<div>
					{/* Main image */}
					<div className="border-2 border-heliotrope-gray mb-2">
						<img
							src={image}
							alt={product.name}
							className="w-full h-auto object-contain"
						/>
					</div>
					{/* Images */}
					<div className="flex items-center gap-2">
						{product.images.map((img, index) => (
							<img
								key={index}
								src={img}
								alt={product.name}
								className={`w-20 h-20 object-cover cursor-pointer border shrink-0 ${
									img === image &&
									"shadow-lg -translate-y-0.5 shadow-heliotrope-gray"
								}`}
								onClick={() => setImage(img)}
							/>
						))}
					</div>
				</div>

				{/* Left hand */}
				<div>
					<p className="text-2xl md:text-3xl font-bold mb-2">{product.name}</p>

					<div className="flex items-center mb-2 md:mb-4 divide-x divide-heliotrope-gray">
						<div className="flex items-center gap-2 px-2">
							<FaStar className="text-yellow-300" />
							<span>{product.ratingsAverage}</span>
						</div>

						<div className="px-2">
							<span>{product.ratingsQuantity} Reviews</span>
						</div>

						<div className="px-2">
							<span>{product.sold} Sold</span>
						</div>
					</div>

					<p className="text-2xl md:text-3xl font-semibold mb-2 md:mb-5">
						₱{product.price.toLocaleString()}
					</p>

					<p className="mb-2 md:mb-5">{product.description}</p>

					<div className="mb-5 md:mb-10">
						<p className="font-bold mb-2 text-lg">Color</p>
						<div className="flex items-center gap-2">
							{product.colors.map((currColor, i) => (
								<button
									className={`rounded-md border-2 p-2 ${
										currColor === color ? "border-black" : "border-slate-300"
									}`}
									key={i}
									onClick={() => setColor(currColor)}
								>
									{currColor}
								</button>
							))}
						</div>
					</div>

					<div className="flex items-center gap-5">
						<UpdateItemQuantity
							quantity={quantity}
							setQuantity={setQuantity}
							type="product"
						/>
						<Button btnType="button" full={false} onClick={handleAddToCart}>
							Add to Cart
						</Button>
					</div>
				</div>
			</div>

			{/* Additional info */}
			<div className="mb-5 border-b border-heliotrope-gray pb-2">
				<ul className="flex items-center gap-7 text-base sm:text-xl">
					<li>
						<button
							to="specs"
							className={`${productNav === "specs" && "font-bold"}`}
							onClick={() => setProductNav("specs")}
						>
							Product Specification
						</button>
					</li>
					<li>
						<button
							to="specs"
							className={`${productNav === "reviews" && "font-bold"}`}
							onClick={() => setProductNav("reviews")}
						>
							Reviews
						</button>
					</li>
				</ul>
			</div>

			{productNav === "specs" && <ProductSpecs productSpecs={product.specs} />}
			{productNav === "reviews" && (
				<Reviews
					productReviews={reviews}
					productId={product.id}
					setProductReviews={setReviews}
					setProduct={setProduct}
				/>
			)}

			<RelatedProducts category={product.category} currProductId={product.id} />
		</div>
	);
}

// Product loader
export const loader = async ({ params }) => {
	const token = localStorage.getItem("token");

	const { productId } = params;
	const product = await fetchProduct(productId, token);
	return product;
};

export default Product;
