const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");

//=================================================================================================

const DatabaseURL = "mongodb://localhost:27017/InTheAir";

const mongoose = require("mongoose");

mongoose.connect(DatabaseURL, {
	useNewURLParser: true,
	useUnifiedTopology: true,
	serverSelectionTimeoutMS: 10000,
});

const dbConnect = mongoose.connection;
dbConnect.on("error", console.error.bind(console, "Database connection error:"));
dbConnect.once("open", () => {
	console.log("Connected to database");
});

//=================================================================================================

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.engine("ejs", ejsMate);

//=================================================================================================

const userRoutes = require("./routes/users");

app.get("/", (req, res) => {
	res.render("home");
});

app.use("/", userRoutes);

app.all("*", (req, res, next) => {
	res.status(404).send("Error 404 Not Found");
});

//=================================================================================================

const Port = 3000;

app.listen(Port, () => {
	console.log(`InTheAir is online on port ${Port}`);
});
