import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./signUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../context/ContextProvider";

const SignIn = () => {
	const [logdata, setData] = useState({
		email: "",
		password: "",
	});
	const { account, setAccount } = useContext(LoginContext);

	const addData = (e) => {
		const { name, value } = e.target;
		// console.log(name, value);

		setData(() => {
			return {
				...logdata,
				[name]: value,
			};
		});
	};

	const senddata = async (e) => {
		e.preventDefault();

		const { email, password } = logdata;

		const res = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		const data = await res.json();
		console.log(data);

		if (res.status === 400 || !data) {
			console.log("invalid details");
			toast.warn("invalid details", {
				position: "top-center",
			});
		} else {
			console.log("user valid");
			setAccount(data);
			toast.success("user valid", {
				position: "top-center",
			});
			setData({ ...logdata, email: "", password: "" });
		}
	};

	return (
		<section>
			<div className="signin-container">
				<div className="signin-header">
					<img src="./blacklogoamazon.png" alt="amazonlogo" />
				</div>
				<div className="signin-form">
					<form method="POST">
						<h1>Sign-In</h1>
						<div className="form-data">
							<label htmlFor="email">Email</label>
							<input type="email" name="email" onChange={addData} value={logdata.email} id="email" />
						</div>
						<div className="form-data">
							<label htmlFor="password">Password</label>
							<input type="password" name="password" onChange={addData} value={logdata.password} id="password" placeholder="At least 6 characters" />
						</div>
						<button className="signin-btn" onClick={senddata}>
							Continue
						</button>
					</form>
				</div>

				<div className="create-accountinfo">
					<p>New to Amazon</p>
					<NavLink to="/register">
						<button style={{cursor: "pointer"}}>Don't have an account? <span style={{color: "blue"}}>sign up</span></button>
					</NavLink>
				</div>
			</div>
			<ToastContainer />
		</section>
	);
};

export default SignIn;
