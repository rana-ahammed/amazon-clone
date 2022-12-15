
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
	const [udata, setUdata] = useState({
		fname: "",
		email: "",
		mobile: "",
		password: "",
		cpassword: "",
	});

	const addData = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		setUdata(() => {
			return {
				...udata,
				[name]: value,
			};
		});
	};

	const senddata = async (e) => {
		e.preventDefault();
		const { fname, email, mobile, password, cpassword } = udata;

		const res = await fetch("/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				fname,
				email,
				mobile,
				password,
				cpassword,
			}),
		});
		const data = await res.json();
		// console.log(data);

		if (res.status === 422 || !data) {
			toast.warn("Invalid details", {
				position: "top-center",
			});
		} else {
			toast.success("Data added successfully", {
				position: "top-center",
			});
			setUdata({ ...udata, fname: "", email: "", mobile: "", password: "", cpassword: "" });
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
						<h1>Sign-Up</h1>
						<div className="form-data">
							<label htmlFor="fname">Your Name</label>
							<input type="text" onChange={addData} value={udata.fname} name="fname" id="fname" />
						</div>
						<div className="form-data">
							<label htmlFor="email">Email</label>
							<input type="email" onChange={addData} value={udata.email} name="email" id="email" />
						</div>
						<div className="form-data">
							<label htmlFor="number">Mobile</label>
							<input type="text" onChange={addData} value={udata.mobile} name="mobile" id="mobile" />
						</div>
						<div className="form-data">
							<label htmlFor="password">Password</label>
							<input type="password" onChange={addData} value={udata.password} name="password" id="password" placeholder="At least 6 characters" />
						</div>
						<div className="form-data">
							<label htmlFor="cpassword">Password Again</label>
							<input type="password" onChange={addData} value={udata.cpassword} name="cpassword" id="cpassword" />
						</div>
						<button className="signin-btn" onClick={senddata}>
							Continue
						</button>

						<div className="signin-info">
							<p>Already have an account?</p>
							<NavLink to="/login">Signin</NavLink>
						</div>
					</form>
				</div>
				<ToastContainer />
			</div>
		</section>
	);
};

export default SignUp;
