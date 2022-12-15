import React, { useEffect, useState } from "react";

const Right = ({ items }) => {
	const [price, setPrice] = useState(0);

	useEffect(() => {
		totalAmount();
	}, [items]);

	const totalAmount = () => {
		let price = 0;
		items.map((item) => {
			price += item.price.cost;
		});
		setPrice(price);
	};

	return (
		<div className="right-buy">
			<img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" alt="" />
			<div className="cost-right">
				<p>Your order is eligible for free delivery</p>
				<br />
				<span style={{ color: "#565959" }}>Select this option at checkout Details</span>
				<h3>
					Subtotal ({items.length} items): <span style={{ fontWeight: 700 }}>₹{price}.00</span>
				</h3>
				<button className="rightbuy-btn">Proceed to buy</button>
				<div className="emi">Emi Available</div>
			</div>
		</div>
	);
};

export default Right;
