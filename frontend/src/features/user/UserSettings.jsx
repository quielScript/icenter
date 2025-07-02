import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../../ui/Button";
import { getToken, setToken } from "../auth/authSlice";
import { userUpdatePassword } from "./userSlice";

function UserSettings() {
	const [passwordCurrent, setPasswordCurrent] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const token = useSelector(getToken);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!passwordCurrent || !password || !passwordConfirm)
			return toast.error("Please fill all the input fields!");

		const credentials = {
			passwordCurrent,
			password,
			passwordConfirm,
		};

		setIsLoading(true);

		const resultAction = await dispatch(
			userUpdatePassword({ credentials, token })
		);

		if (userUpdatePassword.fulfilled.match(resultAction)) {
			const newToken = resultAction.payload.token;
			dispatch(setToken(newToken));
			setPasswordCurrent("");
			setPassword("");
			setPasswordConfirm("");
			toast.success("Password updated successfully!");
		}

		// Handle error from rejected thunk
		if (userUpdatePassword.rejected.match(resultAction)) {
			toast.error(resultAction.payload || "Something went wrong.");
		}

		setIsLoading(false);
	};

	return (
		<div>
			<p className="text-base md:text-xl font-bold mb-5">
				Update Account Password
			</p>

			<form className="w-full text-xs md:text-base" onSubmit={handleSubmit}>
				<div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-5">
					<div className="flex flex-col flex-1">
						<label htmlFor="currentPassword">Current Password</label>
						<input
							type="password"
							id="currentPassword"
							placeholder="Current Password"
							required
							value={passwordCurrent}
							onChange={(e) => setPasswordCurrent(e.target.value)}
							className="border border-slate-300 rounded-md py-2 px-4 transition-all duration-150 focus:border-black w-full"
						/>
					</div>
					<div className="flex flex-col flex-1">
						<label htmlFor="newPassword">New Password</label>
						<input
							type="password"
							id="newPassword"
							placeholder="New Password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="border border-slate-300 rounded-md py-2 px-4 transition-all duration-150 focus:border-black w-full"
						/>
					</div>
					<div className="flex flex-col flex-1">
						<label htmlFor="passwordConfirm">Confirm New Password</label>
						<input
							type="password"
							id="passwordConfirm"
							placeholder="passwordConfirm"
							required
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
							className="border border-slate-300 rounded-md py-2 px-4 transition-all duration-150 focus:border-black w-full"
						/>
					</div>
				</div>

				<Button btnType="button">
					{isLoading ? "Updating..." : "Update Password"}
				</Button>
			</form>
		</div>
	);
}

export default UserSettings;
