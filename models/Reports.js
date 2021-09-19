const mongoose = require("mongoose");

const opts = { toJSON: { virtuals: true } };

const ReportSchema = new mongoose.Schema(
	{
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
			type: {
				type: String,
				enum: ["Point"],
				required: true,
			},

			coordinates: {
				type: [Number],
				required: true,
			},
		},
	},
	opts
);

ReportSchema.virtual("properties.popUpContent").get(function () {
	return `<a href="/reports/${this._id}">${this.name}</a>`;
});

const Report = mongoose.model("Report", ReportSchema);

//=================================================================================================

module.exports = Report;
