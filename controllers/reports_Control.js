const Report = require("../models/Reports");

const reportmap = async (req, res) => {
	let places = await Report.find({});
	res.render("Reports/reports", { places });
};

const reportForm = (req, res) => {
	res.render("Reports/new");
};

const addReport = async (req, res) => {
	console.log(new Date());
	// const geoData = await geocoderClient
	// 	.forwardGeocode({
	// 		query: req.body.newCamp.location,
	// 		limit: 1,
	// 	})
	// 	.send();

	const { name, description } = req.body.newReport;
	const report = new Report(req.body.newReport);

	report.author = req.user._id;
	report.geometry = geoData.body.features[0].geometry;

	await report.save();
	res.redirect("/reports");
};

//=================================================================================================

module.exports = { reportmap, reportForm, addReport };
