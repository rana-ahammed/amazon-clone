import React, { useContext } from "react";
import { LoginContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Option = ({ deletedata, get }) => {
	const { account, setAccount } = useContext(LoginContext);

	const removedata = async (req, res) => {
		try {
			const res = await fetch(`/remove/${deletedata}`, {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				credentials: "include",
			});

			const data = await res.json();
			console.log(data);

			if (res.status === 400 || !data) {
				console.log("error");
				toast.success("error", {
					position: "top-center",
				});
			} else {
				console.log("item deleted successfully");
				get();
				setAccount(data);
				toast.success("item deleted successfully", {
					position: "top-center",
				});
			}
		} catch (error) {
			console.log("error");
		}
	};
	return (
		<div className="add-remove-select">
			<select>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
			</select>
			<p style={{ cursor: "pointer" }} onClick={() => removedata(deletedata)}>
				Delete
			</p>
			<span>|</span>
			<p className="forremovemedia">Save or Later</p>
			<span>|</span>
			<p className="forremovemedia">See more like this</p>
			<ToastContainer/>
		</div>
	);
};

export default Option;
