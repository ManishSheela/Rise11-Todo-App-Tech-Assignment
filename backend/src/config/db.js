import mongoose from "mongoose";

const connectDB = async () => {
	try {
		mongoose.connection.on("connected", () => {
			console.log("Connected to database successfully");
		});
		mongoose.connection.on("error", () => {
			console.log("Error in connection to database");
		});
		await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
			dbName: "Rise11",
		});
	} catch (err) {
		console.error("failed to connect to database", err);
		process.exit(1);
	}
};

export default connectDB;
