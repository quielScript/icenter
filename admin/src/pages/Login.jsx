import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { token, loginAdmin } = useAuth();

	useEffect(() => {
		if (token) navigate("/admin", { replace: true });
	}, [token, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await loginAdmin(email, password);

			if (res.data.status === "success") {
				setEmail("");
				setPassword("");
				toast.success("Logged in successfully!");
				navigate("/admin/dashboard", { replace: true });
			}
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div className="min-h-dvh flex items-center justify-center">
			<div className="border border-slate-300 p-5 rounded-md w-1/4">
				<h1 className="text-center font-bold text-2xl mb-5">Admin Login</h1>
				<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
					<div className="flex flex-col">
						<label htmlFor="email">Email Address</label>
						<input
							type="email"
							id="email"
							placeholder="Email"
							className="border border-slate-300 py-2 px-4 rounded-md"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							placeholder="Password"
							className="border border-slate-300 py-2 px-4 rounded-md"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="text-center border bg-black text-white w-full py-2 rounded-md cursor-pointer hover:bg-white hover:text-black transition-all duration-150"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
