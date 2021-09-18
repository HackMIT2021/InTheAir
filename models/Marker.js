const mongoose = require("mongoose");

const MarkerSchema = new mongoose.Schema({
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

//=================================================================================================

module.exports = Marker;
