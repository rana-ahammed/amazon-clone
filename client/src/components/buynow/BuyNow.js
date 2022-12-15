import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./BuyNow.css";
import Option from "./Option";
import Right from "./Right";
import Subtotal from "./Subtotal";

const BuyNow = () => {
	const [cartdata, setCartdata] = useState("");
	// console.log(cartdata);

	const getdatabuy = async () => {
		const res = await fetch("/cartdetails", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const data = await res.json();
		console.log(data.carts);

		if (res.status !== 201) {
			alert("no data available");
		} else {
			setCartdata(data.carts);
		}
	};

	useEffect(() => {
		getdatabuy();
	}, []);

	return (
		<div>
			{cartdata.length ? (
				<div className="buynow-section">
					<div className="buynow-container">
						<div className="left-buy">
							<h1>Shopping Cart</h1>
							<p>Select all items</p>
							<span className="leftbuyprice">Price</span>
							<Divider />

							{cartdata.map((e, k) => {
								return (
									<div>
										<div className="item-container">
											<img src={e.detailUrl} alt="" />
											<div className="item-details">
												<h3>{e.title.longTitle}</h3>
												<h3>{e.title.shortTitle}</h3>
												<p className="unusual">Usually dispatched in 8 days.</p>
												<p>Eligible for free shipping.</p>
												<img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="logo" />
												<Option deletedata={e._id} get={getdatabuy} />
											</div>
											<h3 className="item-price">₹{e.price.cost}.00</h3>
										</div>
										<Divider />
									</div>
								);
							})}

							<Subtotal items={cartdata} />
						</div>

						<Right items={cartdata} />
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default BuyNow;
