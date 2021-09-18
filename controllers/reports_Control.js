const Report = require("../models/Reports");

const reportmap = async (req, res) => {
	let places = await Report.find({});
	res.render("Reports/reports", { places });
};

const reportForm = (req, res) => {
	res.render("Reports/new");
};

//=================================================================================================

module.exports = { reportmap };
