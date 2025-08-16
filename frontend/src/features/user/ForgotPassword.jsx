import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import Button from "../../ui/Button";
import { getStatus, userForgotPassword } from "./userSlice";

function ForgotPassword() {
	const [email, setEmail] = useState("");
	const status = useSelector(getStatus);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const data = await dispatch(userForgotPassword(email)).unwrap();

			if (data.status === "success") {
				toast.success(data.message);
				setEmail("");
			}
		} catch (err) {
			toast.error(err);
		}
	};

	return (
		<div className="flex items-center justify-center my-20">
			<div className="border border-black rounded-md p-5 max-w-[500px]">
				<button
					className="flex items-center gap-2 mb-5 hover:underline"
					onClick={() => navigate(-1)}
				>
					<FaArrowLeft /> Go back
				</button>

				<p className="mb-5">
					Enter your email address and we'll send you a link to reset your
					password.
				</p>

				<form onSubmit={handleSubmit}>
					<div className="flex flex-col mb-5">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							placeholder="Your email address"
							className="border border-black rounded-md py-2 px-4"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<Button btnType="button" full={true}>
						{status === "loading" ? "Sending..." : "Submit"}
					</Button>
				</form>
			</div>
		</div>
	);
}

export default ForgotPassword;
