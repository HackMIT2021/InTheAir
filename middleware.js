const ExpressError = require("./utils/ExpressError");

const { reportSchema } = require("./joischemas");

const Report = require("./models/Reports");
const User = require("./models/Users");

//=================================================================================================

const isAuth = (req, res, next) => {
	if (!req.isAuthenticated()) {
		// Behaviour to return to
		req.session.origin = req.originalUrl;

		req.flash("error", "You must be signed in to use this function");
		//console.log("You must be signed in to use this function");
		return res.redirect("/login");
	}
	next();
};

const checkAuthor = async (req, res, next) => {
	const { id } = req.params;
	const report = await Report.findById(id);
	if (!report.author.equals(req.user._id)) {
		req.flash("error", "You don't have permission to do that!");
		return res.redirect(`/reports/${id}`);
	}
	next();
};

const checkReportNum = async (req, res, next) => {
	const targetUser = await User.findById(req.user._id);
	if (targetUser.report.hasReport) {
		req.flash("error", "You already have a report, you can edit instead");
		return res.redirect(`/reports/edit/${id}`);
	}
	next();
};

const validateReport = (req, res, next) => {
	const { error } = reportSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(400, msg);
	}
	next();
};

//=================================================================================================

module.exports = { isAuth, validateReport, checkAuthor, checkReportNum };
