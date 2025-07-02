import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../ui/Button";
import { addReview } from "../../services/apiReview";
import { useSelector } from "react-redux";
import { getToken } from "../auth/authSlice";
import { fetchProduct } from "../../services/apiProducts";

function AddReview({ productId, setProductReviews, setCanReview, setProduct }) {
	const [rating, setRating] = useState("");
	const [review, setReview] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const token = useSelector(getToken);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!rating || !review)
			return toast.error("Please enter a rating and a review!");

		try {
			setIsLoading(true);
			const data = await addReview(review, Number(rating), productId, token);

			if (data.status === "success") {
				setProductReviews((prev) => [data.data.newReview, ...prev]);
				toast.success("Review added!");
				setCanReview(false);

				const updatedProductRes = await fetchProduct(productId);
				setProduct(updatedProductRes.productRes.data.data.product);

				setRating("");
				setReview("");
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<p className="text-xl font-semibold mb-2">Add your review</p>

			<form className="space-y-5" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-2">
					<label htmlFor="rating">Rating</label>
					<input
						type="number"
						name="rating"
						id="rating"
						className="border border-licorice-black rounded-md py-2 px-4 w-20"
						placeholder="5"
						required
						min="1"
						max="5"
						value={rating}
						onChange={(e) => setRating(e.target.value)}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="review">Your Review</label>
					<textarea
						name="review"
						id="review"
						className="border border-licorice-black rounded-md py-2 px-4 min-h-24"
						placeholder="Enter your review"
						required
						value={review}
						onChange={(e) => setReview(e.target.value)}
					></textarea>
				</div>

				<Button btnType="button" full={false}>
					{isLoading ? "Adding..." : "Submit"}
				</Button>
			</form>
		</div>
	);
}

export default AddReview;
