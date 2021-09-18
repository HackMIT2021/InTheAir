const Report = require("../models/Reports");

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

const seed = async () => {
	await Report.deleteMany({});
	let coords1, coords2;
	coords1 = 30.5;
	coords2 = 50.5;
	let report = new Report({
		name: "Kiev",
		description: "Runny nose",
		geometry: {
			type: "Point",
			coordinates: [coords1, coords2],
		},
	});
	await report.save();
};

//=================================================================================================

seed();
