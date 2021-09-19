if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
const MongoDBStore = require("connect-mongo");

//=================================================================================================

const DatabaseURL = process.env.MONGODB_URL || "mongodb://localhost:27017/InTheAir";

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

app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

const secretString = process.env.SECRET || "thisisthedevelopmentsecret";

const sessionStore = MongoDBStore.create({
	mongoUrl: DatabaseURL,
	touchAfter: 24 * 60 * 60,
	crypto: {
		secret: secretString,
	},
});

sessionStore.on("error", function (err) {
	console.log("Session store error! ", err);
});

const sessionConfig = {
	name: "session",
	store: sessionStore,
	secret: secretString,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
		maxAge: 7 * 24 * 60 * 60 * 1000,
	},
};

app.use(session(sessionConfig));
app.use(flash());

//=================================================================================================

const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/Users");

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=================================================================================================

const Report = require("./models/Reports");
const userRoutes = require("./routes/users");
const reportRoutes = require("./routes/reports");

app.use((req, res, next) => {
	res.locals.currUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

app.get("/", async (req, res) => {
	let places = await Report.find({});
	res.render("home", { places });
});

app.use("/", userRoutes);
app.use("/reports", reportRoutes);

app.all("*", (req, res, next) => {
	//res.status(404).send("Error 404 Not Found");
	next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
	const { statusCode = 500, message = "Something went wrong!" } = err;
	if (!err.statusCode) {
		err.statusCode = 500;
	}
	if (!err.message) {
		err.message = "Something went wrong!";
	}
	res.status(statusCode).render("error", { err });
});

//=================================================================================================

const Port = 3000;

app.listen(Port, () => {
	console.log(`InTheAir is online on port ${Port}`);
});
