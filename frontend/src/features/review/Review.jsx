import { FaStar } from "react-icons/fa6";
import { formatDate } from "../../utils/helpers";

function Review({ review }) {
	return (
		<div className="py-5">
			<div className="flex items-center gap-4 mb-2">
				<img
					src={review.user.photo || "https://avatar.iran.liara.run/public/41"}
					alt=""
					className="w-12 h-12"
				/>

				<div>
					<p className="font-semibold">
						{review.user.firstName} {review.user.lastName}
					</p>
					<p className="flex items-center gap-2">
						<span>
							<FaStar className="text-yellow-300" />
						</span>
						<span>({String(review.rating.toFixed(1))})</span>
					</p>
				</div>
			</div>

			<p className="mb-3">{review.review}</p>

			<p>
				<span className="text-heliotrope-gray">Posted on</span>{" "}
				<span className="font-semibold">{formatDate(review.createdAt)}</span>
			</p>
		</div>
	);
}

export default Review;
