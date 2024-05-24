import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || 'https://todo-app-backend-nine-alpha.vercel.app';
const Login = () => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const navigate = useNavigate();
	const handleLogin = async (e) => {
		e.stopPropagation();
		e.preventDefault();
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;
		try {
			const response = await axios.post(`${baseURL}/api/users/login`, {
				email,
				password,
			});
			const accessToken = response?.data?.accessToken;
			if (accessToken) {
				localStorage.setItem("accessToken", accessToken);
				navigate("/", { replace: true });
			}
			// Handle successful login, e.g., storing tokens, redirecting, etc.
		} catch (error) {
			console.error("Error logging in:", error.message);
		}
	};
	return (
		<section className="container forms">
			<div className="form login">
				<div className="form-content">
					<header>Login</header>

					<div className="field input-field">
						<input
							ref={emailRef}
							type="email"
							placeholder="Email"
							className="input"
							required={true}
						/>
					</div>
					<div className="field input-field">
						<input
							ref={passwordRef}
							type="password"
							placeholder="Password"
							className="password"
							required={true}
						/>
						<i className="bx bx-hide eye-icon"></i>
					</div>
					<div className="form-link">
						<a href="#" className="forgot-pass">
							Forgot password?
						</a>
					</div>
					<div className="field button-field">
						<button onClick={handleLogin}>Login</button>
					</div>

					<div className="form-link">
						<span>
							Don't have an account?{" "}
							<Link to="/auth/register" className="link signup-link">
								Signup
							</Link>
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
