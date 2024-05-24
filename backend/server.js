import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const startServer = async () => {
	await connectDB();

	const port = process.env.PORT || 8080;
	app.listen(port, console.log(`Listening on port: ${port}`));
};
startServer();
