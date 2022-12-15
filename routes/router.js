const express = require("express");
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

//get productsdata api
router.get("/getproducts", async (req, res) => {
	try {
		const productsdata = await Products.find({});
		// console.log("console the log" + productsdata);
		res.status(201).json(productsdata);
	} catch (error) {
		console.log("error" + error.message);
	}
});

// get individual data
router.get("/getproductsone/:id", async (req, res) => {
	try {
		const { id } = req.params;
		// console.log(id);
		const individualdata = await Products.findOne({ id: id });

		// console.log(individualdata);
		res.status(201).json(individualdata);
	} catch (error) {
		res.status(400).json(individualdata);
		console.log("error" + error.message);
	}
});

// register data
router.post("/register", async (req, res) => {
	// console.log(req.body);
	const { fname, email, mobile, password, cpassword } = req.body;
	if (!fname || !email || !mobile || !password || !cpassword) {
		res.status(422).json({ error: "fill the all data" });
		console.log("No data available");
	}

	try {
		const preuser = await USER.findOne({ email: email });

		if (preuser) {
			res.status(422).json({ error: "this user is already present" });
		} else if (password !== cpassword) {
			res.status(422).json({ error: "password is not matched with cpassword" });
		} else {
			const finalUser = new USER({
				fname,
				email,
				mobile,
				password,
				cpassword,
			});

			const storedata = await finalUser.save();
			// console.log(storedata);

			res.status(201).json(storedata);
		}
	} catch (error) {}
});

// login user api
router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ error: "fill the all data" });
	}

	try {
		const userlogin = await USER.findOne({ email: email });
		// console.log(userlogin);

		if (userlogin) {
			const isMatch = await bcrypt.compare(password, userlogin.password);
			// console.log(isMatch);

			// token generate
			const token = await userlogin.generateAuthToken();
			// console.log(token);

			res.cookie("Amazonweb", token, {
				expires: new Date(Date.now() + 900000),
				httpOnly: true,
			});

			if (!isMatch) {
				res.status(400).json({ error: "Password not matched" });
			} else {
				res.status(201).json(userlogin);
			}
		} else {
			res.status(400).json({ error: "invalid details" });
		}
	} catch (error) {
		res.status(400).json({ error: "invalid details" });
	}
});

// adding the data into cart
router.post("/addcart/:id", authenticate, async (req, res) => {
	try {
		const { id } = req.params;
		const cart = await Products.findOne({ id: id });
		console.log(cart);

		const UserContact = await USER.findOne({ _id: req.UserID });
		console.log(UserContact);

		if (UserContact) {
			const cartData = await UserContact.addcartdata(cart);
			await UserContact.save();
			console.log(cartData);
			res.status(201).json(UserContact);
		} else {
			res.status(401).json({ error: "invalid user" });
		}
	} catch (error) {
		res.status(401).json({ error: "invalid user" });
	}
});

// get cart details
router.get("/cartdetails", authenticate, async (req, res) => {
	try {
		const buyuser = await USER.findOne({ _id: req.UserID });
		console.log(buyuser + "user hain buy pr");
		res.status(201).json(buyuser);
	} catch (error) {
		console.log(error + "error for buy now");
	}
});

// get valid user
router.get("/validuser", authenticate, async (req, res) => {
	try {
		const validuserone = await USER.findOne({ _id: req.UserID });
		console.log(validuserone);
		res.status(201).json(validuserone);
	} catch (error) {
		console.log(error);
	}
});

// remove item from cart
router.delete("/remove/:id", authenticate, async (req, res) => {
	try {
		const { id } = req.params;
		req.rootUser.carts = req.rootUser.carts.filter((curval) => {
			return curval._id != id;
		});
		req.rootUser.save();
		res.status(201).json(req.rootUser);
		console.log("item removed");
	} catch (error) {
		console.log("error" + error);
		res.status(400).json(req.rootUser);
	}
});

// for userlogout

router.get("/logout", authenticate, async (req, res) => {
	try {
		req.rootUser.tokens = req.rootUser.tokens.filter((currelement) => {
			return currelement.token !== req.token;
		});

		res.clearCookie("Amazonweb", { path: "/" });
		req.rootUser.save();
		res.status(201).json(req.rootUser.tokens);
		console.log("User logged out successfully");
	} catch (error) {
		console.log(error + "jwt provide then logout");
	}
});

module.exports = router;
