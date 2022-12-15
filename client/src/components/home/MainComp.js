import React, { useEffect } from "react";
import Banner from "./Banner";
import "./Home.css";
import Slide from "./Slide";
import { getProducts } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";

const MainComp = () => {
	const { products } = useSelector((state) => state.getproductsdata);
	console.log(products);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	return (
		<div className="home-section">
			<div className="banner-part">
				<Banner />
			</div>

			<div className="slide-part">
				<div className="left-slide">
					<Slide title="Deal of the day" products={products} />
				</div>

				<div className="right-slide">
					<h4>Festive latest launches</h4>
					<img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg" alt="rightimg" />
					<a href="#">See More</a>
				</div>
			</div>

			<Slide title="Today's Deal" products={products} />
			<div className="center-img">
				<img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="" />
			</div>
			<Slide title="Best Seller" products={products} />
			<Slide title="Upto 80% off" products={products} />
		</div>
	);
};

export default MainComp;
