import React from "react";
import "./Footer.css";

const Footer = () => {

    const year = new Date().getFullYear();
    // console.log(year);

    return (
        <footer>
            <div className="footer-container">
                <div className="footer-details-one">
                    <h3>Get to Know Us</h3>
                    <p>About us</p>
                    <p>Careers</p>
                    <p>Press Releases</p>
                    <p>Amazon Cares</p>
                </div>
                <div className="footer-details-one">
                    <h3>Connect with Us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                </div>
                <div className="footer-details-one forres">
                    <h3>Make Money with Us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                </div>
                <div className="footer-details-one forres">
                    <h3>Make Money with Us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>    
                </div>
            </div>
            <div className="last-details">
                <img src="./amazon_PNG25.png" alt="" />
                <p>Conditions of Use & Sale &nbsp; &nbsp; &nbsp; Privacy Notice &nbsp; &nbsp; &nbsp; Interest-Based Ads &nbsp; &nbsp; &nbsp; © 1996-{year}, Amazon.com, Inc. or its affiliates</p>
            </div>
        </footer>
    );
};

export default Footer;
