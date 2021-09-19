const Report = require("../models/Reports");
const User = require("../models/Users");

//=================================================================================================

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

	const targetUser = await User.findById(req.user._id);
	targetUser.report.hasReport = true;
	targetUser.report.curr = report._id;

	await targetUser.save();
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

const editReport = async (req, res) => {
	const { id } = req.params;
	let currDate = new Date();
	const { name, description } = req.body.newReport;
	const target = await Report.findById(id);
	target.date = currDate;
	target.name = name;
	target.description = description;
	target.geometry = { type: "Point", coordinates: [req.body.lng, req.body.lat] };

	await target.save();
	req.flash("success", "Successfully updated report!");
	res.redirect(`/reports`);
};

const destroyReport = async (req, res) => {
	const { id } = req.params;
	const deletedReport = await Report.findByIdAndDelete(id);
	const targetUser = await User.findById(deletedReport.author);
	targetUser.report.hasReport = false;
	targetUser.report.curr = null;
	await targetUser.save();
	req.flash("success", "Successfully deleted your report!");
	res.redirect("/reports");
};

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
