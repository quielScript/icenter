import { FaHands } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { loginUser } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getToken, setToken } from "./authSlice";
import { getUserInfo } from "../user/userSlice";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = useSelector(getToken);

	useEffect(() => {
		if (token) navigate("/", { replace: true });
	}, [token, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const credentials = {
			email,
			password,
		};

		try {
			const res = await loginUser(credentials);

			if (res.data.status === "success") {
				toast.success("Logged in!");
				dispatch(setToken(res.data.token));
				dispatch(getUserInfo(res.data.token));
				navigate("/", { replace: true });
				setEmail("");
				setPassword("");
			}
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div className="flex justify-center items-center mx-5 xl:mx-0 py-16 pb-24">
			<form className="w-[90%] sm:max-w-96" onSubmit={handleSubmit}>
				<h1 className="text-3xl font-bold flex items-center gap-2">
					Welcome! <FaHands className="text-yellow-300" />
				</h1>
				<p className="text-heliotrope-gray mb-7 text-lg">Please login here</p>

				<div className="space-y-5 mb-2">
					<div className="flex flex-col">
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
				</div>

				<div className="flex items-center justify-between mb-5">
					<Link to="/forgot-password">Forgot password?</Link>
					<Link to="/signup">Create Account</Link>
				</div>

				<Button btnType="button" full={true}>
					Sign In
				</Button>
			</form>
		</div>
	);
}

export default Login;
