import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/Navbar";
import MainComp from "./components/home/MainComp";
import NewNavbar from "./components/newNavbar/NewNavbar";
import SignIn from "./components/signup_signin/SignIn";
import SignUp from "./components/signup_signin/SignUp";
import Cart from "./components/cart/Cart";
import { Routes, Route } from "react-router-dom";
import BuyNow from "./components/buynow/BuyNow";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";

function App() {
    const [data, setData] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setData(true)
        }, 2000);
    }, []);
    return (
        <div>
        {
            data ? (
                <div>
                <Navbar />
                <NewNavbar />
                <Routes>
                    <Route path="/" element={<MainComp />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/getProductsone/:id" element={<Cart />} />
                    <Route path="/buynow" element={<BuyNow />} />
                </Routes>
                <Footer />
                </div>
            ) : (
                <div className="circle">
                    <CircularProgress />
                    <h2>Loading ...</h2>
                </div>
            )
        }

        </div>
    );
}

export default App;
