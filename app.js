const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();
require("./db/connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Products = require("./models/productsSchema");
const DefaultData = require("./defaultdata");
const router = require("./routes/router");

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);

const port = process.env.PORT || 8005;

if (process.env.NODE_ENV == "production") {
	const path = require("path");

	app.get("/", (req, res) => {
		app.use(express.static(path.resolve(__dirname, "client", "build")));
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(port, () => {
	console.log(`server is running on port number ${port}`);
});

DefaultData();
