import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "https://todo-app-backend-nine-alpha.vercel.app";
const Signup = () => {
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.stopPropagation();
		e.preventDefault();
		const name = nameRef?.current?.value;
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;
		try {
			const response = await axios.post(`${baseURL}/api/users/register`, {
				name,
				email,
				password,
			});
			const accessToken = response?.data?.accessToken;

			if (accessToken) {
				localStorage.setItem("accessToken", accessToken);
				navigate("/", { replace: true });
			}
		} catch (err) {
			console.error("Error logging in:", err.message);
		}
	};
	return (
		<section className="container forms">
			<div className="form signup">
				<div className="form-content">
					<header>Signup</header>

					<div className="field input-field">
						<input
							ref={nameRef}
							type="text"
							placeholder="Name"
							className="input"
							required={true}
						/>
					</div>
					<div className="field input-field">
						<input
							ref={emailRef}
							type="email"
							placeholder="Email..."
							className="input"
							required={true}
						/>
					</div>
					<div className="field input-field">
						<input
							ref={passwordRef}
							type="password"
							placeholder="password"
							className="password"
							required={true}
						/>
						<i className="bx bx-hide eye-icon"></i>
					</div>
					<div className="field button-field">
						<button onClick={handleSignup}>Signup</button>
					</div>

					<div className="form-link">
						<span>
							Already have an account?
							<Link to="/auth/login" className="link login-link">
								Login
							</Link>
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Signup;
