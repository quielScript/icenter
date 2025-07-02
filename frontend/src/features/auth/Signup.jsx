import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../ui/Button";
import { signupUser } from "../../services/apiAuth";
import { useDispatch } from "react-redux";
import { setToken } from "./authSlice";
import { getUserInfo } from "../user/userSlice";

function Signup() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleSubmit = async (e) => {
		e.preventDefault();

		const credentials = {
			firstName,
			lastName,
			email,
			password,
			passwordConfirm,
		};

		try {
			const res = await signupUser(credentials);

			if (res.data.status === "success") {
				toast.success("Sign up successful!");
				dispatch(setToken(res.data.token));

				dispatch(getUserInfo(res.data.token));
				navigate("/");
				setFirstName("");
				setLastName("");
				setEmail("");
				setPassword("");
				setPasswordConfirm("");
			}
		} catch (err) {
			// TODO: PROPERLY DISPLAY ERR MSGS FOR < LENGTH, NOT MATCHING, AND BOTH/duplicate email
			toast.error(err.message);
		}
	};

	return (
		<div className="flex justify-center items-center mx-5 xl:mx-0 py-16 pb-24">
			<form className="w-[90%] sm:max-w-1/3" onSubmit={handleSubmit}>
				<h1 className="text-3xl font-bold flex items-center gap-2">
					Create New Account
				</h1>
				<p className="text-heliotrope-gray mb-7 text-lg">
					Please enter details
				</p>

				{/* 5 */}
				<div className="grid grid-cols-2 gap-3 mb-2">
					<div className="flex flex-col">
						<label htmlFor="firstName">First Name</label>
						<input
							type="text"
							name="firstName"
							id="firstName"
							placeholder="First Name"
							className="border border-licorice-black rounded-md py-2 px-4"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="lastName">Last Name</label>
						<input
							type="text"
							name="lastName"
							id="lastName"
							placeholder="Last Name"
							className="border border-licorice-black rounded-md py-2 px-4"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>

					<div className="flex flex-col col-span-2 ">
						<label htmlFor="email">Email Address</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							className="border border-licorice-black rounded-md py-2 px-4"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							className="border border-licorice-black rounded-md py-2 px-4"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="passwordConfirm">Confirm Password</label>
						<input
							type="password"
							name="passwordConfirm"
							id="passwordConfirm"
							placeholder="Password"
							className="border border-licorice-black rounded-md py-2 px-4"
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
						/>
					</div>
				</div>

				<div className="mb-5 text-right">
					<Link to="/login">Login here</Link>
				</div>

				<Button btnType="button" full={true}>
					Sign Up
				</Button>
			</form>
		</div>
	);
}

export default Signup;
