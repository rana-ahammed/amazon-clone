import { CircularProgress, Divider } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";

import "./Cart.css";

const Cart = () => {
	const { id } = useParams("");

	const navigate = useNavigate("");

	const { account, setAccount } = useContext(LoginContext);

	// console.log(id);
	const [inddata, setInddata] = useState("");

	const getinddata = async () => {
		const res = await fetch(`/getProductsone/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();
		// console.log(data);
		if (res.status !== 201) {
			console.log("No data is available");
		} else {
			setInddata(data);
		}
	};

	useEffect(() => {
		setTimeout(getinddata, 1000)
	}, [id]);

	// add cart function
	const addtocart = async (id) => {
		const checkres = await fetch(`/addcart/${id}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				inddata,
			}),
			credentials: "include",
		});

		const data1 = await checkres.json();
		console.log(data1);

		if (checkres.status === 401 || !data1) {
			console.log("user invalid");
			alert("user invalid");
		} else {
			setAccount(data1);
			alert("data added to cart");
			navigate("/buynow");
		}
	};

	return (
		<div className="cart-section">
			{inddata && Object.keys(inddata).length && (
				<div className="cart-container">
					<div className="left-cart">
						<img src={inddata.detailUrl} alt="" />
						<div className="cart-btn">
							<button className="cart-btn1" onClick={() => addtocart(inddata.id)}>
								Add to Cart
							</button>
							<button className="cart-btn2">Buy Now</button>
						</div>
					</div>
					<div className="right-cart">
						<h3>{inddata.title.shortTitle}</h3>
						<h4>{inddata.title.longTitle}</h4>
						<Divider />
						<p className="mrp">M.R.P: ₹{inddata.price.mrp}</p>
						<p>
							Deal of the day :<span style={{ color: "#b12704" }}>₹{inddata.price.cost}</span>
						</p>
						<p>
							You save :
							<span style={{ color: "#b12704" }}>
								₹{inddata.price.mrp - inddata.price.cost} ({inddata.price.discount})
							</span>
						</p>
						<div className="discount-box">
							<h5>
								Discount:
								<span style={{ color: "#111" }}>{inddata.discount}</span>
							</h5>
							<h4>
								Free Delivery:
								<span style={{ color: "#111", fontWeight: 600 }}>Oct 18-21</span>
								Details
							</h4>
							<p>
								Fastest Delivery:
								<span style={{ color: "#111", fontWeight: 600 }}>Tomorrow 11AM</span>
							</p>
						</div>
						<p className="description">
							About the item :<span style={{ color: "#565959", fontSize: "14px", fontWeight: 500, letterSpacing: "0.4px" }}>{inddata.description}</span>
						</p>
					</div>
				</div>
			)}

			{!inddata ? (
				<div className="circle">
					<CircularProgress />
					<h2>Loading</h2>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default Cart;
