const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	description: {
		type: String,
		required: true,
	},

	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},

	date: {
		type: Date,
		required: true,
	},

	geometry: {
		type: Point,
		coordinates: {
			type: [Number],
			required: true,
		},
	},
});

const Report = mongoose.model("Report", ReportSchema);

//=================================================================================================

module.exports = Report;
