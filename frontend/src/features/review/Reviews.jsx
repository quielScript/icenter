import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getToken } from "../auth/authSlice";
import Review from "./Review";
import AddReview from "./AddReview";
import { checkEligibility } from "../../services/apiReview";

function Reviews({ productReviews, productId, setProductReviews, setProduct }) {
	const [canReview, setCanReview] = useState(false);
	const reviews = productReviews;
	const token = useSelector(getToken);

	useEffect(() => {
		const checkUserEligibility = async () => {
			try {
				const data = await checkEligibility(productId, token);

				if (data.eligible) {
					setCanReview(true);
				}
			} catch (err) {
				setCanReview(false);
			}
		};

		checkUserEligibility();
	}, [productId, token]);

	return (
		<div>
			<p className="text-base sm:text-xl font-semibold mb-2">
				Customer Reviews
			</p>

			<div className="divide-y divide-heliotrope-gray  mb-5 pb-5">
				{/* Reviews */}
				{reviews.length > 0 ? (
					<div className="divide-y divide-heliotrope-gray border-b border-heliotrope-gray mb-10">
						{/* Review */}
						{reviews.map((review) => (
							<Review review={review} key={review.id} />
						))}
					</div>
				) : (
					<p>No reviews yet...</p>
				)}
			</div>

			{/* Add review */}
			{canReview && (
				<AddReview
					productId={productId}
					setProductReviews={setProductReviews}
					setCanReview={setCanReview}
					setProduct={setProduct}
				/>
			)}
		</div>
	);
}

export default Reviews;
