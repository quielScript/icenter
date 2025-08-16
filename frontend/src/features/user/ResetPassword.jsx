import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getStatus, userResetPassword } from "./userSlice";

function ResetPassword() {
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const { token } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const status = useSelector(getStatus);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const newCredentials = { password, passwordConfirm };

			const data = await dispatch(
				userResetPassword({ token, newCredentials })
			).unwrap();

			if (data.status === "success") {
				toast.success("Password reset successful!");
				setPassword("");
				setPasswordConfirm("");
				navigate("/login");
			}
		} catch (err) {
			// TODO: FIX ERROR NOW SHOWING
			toast.error(err.message);
		}
	};

	return (
		<div className="flex items-center justify-center my-20">
			<form
				className="border border-slate-400 p-5 rounded-md min-w-[400px]"
				onSubmit={handleSubmit}
			>
				<h1 className="text-2xl font-bold text-center mb-5">Reset Password</h1>
				<p className="mb-2">Enter your new password</p>

				<div className="flex flex-col gap-1 mb-2">
					<input
						required
						type="password"
						id="password"
						placeholder="Password"
						className="border border-slate-300 p-2 rounded-md"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="flex flex-col gap-1 mb-5">
					<input
						required
						type="password"
						id="passwordConfirm"
						placeholder="Confirm Password"
						className="border border-slate-300 p-2 rounded-md"
						value={passwordConfirm}
						onChange={(e) => setPasswordConfirm(e.target.value)}
					/>
				</div>

				<Button btnType="button" full={true}>
					{status === "loading" ? "Resetting..." : "Reset"}
				</Button>
			</form>
		</div>
	);
}

export default ResetPassword;
