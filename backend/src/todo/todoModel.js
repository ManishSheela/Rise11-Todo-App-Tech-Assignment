import mongoose, { mongo } from "mongoose";

const todoSchema = new mongoose.Schema(
	{
		title: { type: String },
		description: { type: String },
		completed: { type: Boolean, default: false },
		uploadedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
