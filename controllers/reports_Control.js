const Report = require("../models/Reports");

const reportmap = async (req, res) => {
	let places = await Report.find({});
	res.render("Reports/reports", { places });
};

const reportForm = (req, res) => {
	res.render("Reports/new");
};

const showReport = async (req, res) => {
	const { id } = req.params;
	const report = await Report.findById(id).populate("author");
	if (!report) {
		req.flash("error", "Couldn't find that report!");
		return res.redirect("/reports");
	}
	res.render("Reports/show", { report });
};

const addReport = async (req, res) => {
	let currDate = new Date();
	console.log(currDate);
	// const geoData = await geocoderClient
	// 	.forwardGeocode({
	// 		query: req.body.newCamp.location,
	// 		limit: 1,
	// 	})
	// 	.send();

	const { name, description } = req.body.newReport;
	const report = new Report(req.body.newReport);

	report.date = currDate;
	report.author = req.user._id;
	report.geometry = { type: "Point", coordinates: [req.body.lng, req.body.lat] };

	await report.save();
	req.flash("success", "Successfully created a new report!");
	res.redirect("/reports");
};

const editForm = async (req, res) => {
	const { id } = req.params;
	const report = await Report.findById(id).populate("author");
	if (!report) {
		req.flash("error", "Couldn't find that report!");
		return res.redirect("/reports");
	}
	res.render("Reports/edit", { report });
};

const editReport = async (req, res) => {};

const destroyReport = async (req, res) => {};

//=================================================================================================

module.exports = {
	reportmap,
	reportForm,
	addReport,
	showReport,
	editForm,
	editReport,
	destroyReport,
};
