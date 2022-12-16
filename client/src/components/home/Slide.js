import React from "react";
import "./Slide.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Divider from "@mui/material/Divider";
// import { products } from "./ProductData";
import { NavLink } from "react-router-dom";

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 5,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

const Slide = ({ title, products }) => {
	console.log(products);
	return (
		<div className="products-section">
			<div className="products-deal">
				<h3>{title}</h3>
				<button className="view-btn">View All</button>
			</div>

			<Divider />

			<Carousel responsive={responsive} infinite={true} draggable={false} swipeable={true} showDots={false} centerMode={true} autoPlay={true} autoPlaySpeed={4000} keyBoardControl={true} removeArrowOnDevice={["mobile", "tablet"]} dotListClass="custom-dot-list-style" itemClass="carousel-item-padding-40-px" containerClass="carousel-container">
				{products.map((e) => {
					return (
						<NavLink to={`/getProductsone/${e.id}`}>
							<div className="products-items">
								<div className="product-img">
									<img src={e.url} alt="productitem" />
								</div>
								<p className="product-name">{e.title.shortTitle}</p>
								<p className="product-offer">{e.discount}</p>
								<p className="product-explore">{e.tagline}</p>
							</div>
						</NavLink>
					);
				})}
			</Carousel>
		</div>
	);
};

export default Slide;
