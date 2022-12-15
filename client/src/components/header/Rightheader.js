import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import "./Rightheader.css";
import { LoginContext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';


const Rightheader = ({ logClose, logoutuser }) => {
	const { account, setAccount } = useContext(LoginContext);
	return (
		<div>
			<div className="leftheader">
				<div className="left-nav">
					{account ? <Avatar className="avatar2">{account.fname[0].toUpperCase()}</Avatar> : <Avatar className="avatar"></Avatar>}
					{account ? <h3>Hello : {account.fname.toUpperCase()}</h3> : ""}
				</div>

				<div className="nav-btn" onClick={() => logClose()}>
					<NavLink to="/">Home</NavLink>
					<NavLink to="/">Shop by category</NavLink>
					<Divider style={{ width: "100%", marginLeft: "-20px" }} />
					<NavLink to="/">Today's Deal</NavLink>
					{account ? <NavLink to="/buynow">Your Orders</NavLink> : <NavLink to="/login">You Orders</NavLink>}
					<Divider style={{ width: "100%", marginLeft: "-20px" }} />
					<div className="flag">
						<NavLink to="">Settings</NavLink>
						<img src="" alt="" />
					</div>
					{
						account ? <div className="flag">
							<LogoutIcon style={{fontSize: 16, marginRight: 4}}/>
							<h3 onClick={() => logoutuser()} style={{cursor: "pointer", fontWeight: 500}}>Log Out</h3>
						</div> : <NavLink to="/login">Sign In</NavLink>
					}
				</div>
			</div>
		</div>
	);
};

export default Rightheader;
