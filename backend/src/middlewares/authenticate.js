import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
	const token = req.header("Authorization");
	if (!token) {
		return res.status(401).send(message, "Authorization token is required");
	}
	const parsedToken = token.split(" ")[1];
	const decoded = jwt.verify(parsedToken, process.env.JWT_TOKEN);
	req.userId = decoded?.sub;
	console.log("decoded", decoded);
	next();
};

export default authenticate;
