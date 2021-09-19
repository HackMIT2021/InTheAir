const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	report: {
		hasReport: {
			type: Boolean,
			default: false,
		},
		curr: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Report",
		},
	},
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

//=================================================================================================

module.exports = User;
