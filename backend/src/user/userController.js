import userModel from "./userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req, res, next) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res.status(400).send({ message: "All fileds required!" });
	}

	try {
		const user = await userModel.findOne({ email });
		if (user)
			return res
				.status(400)
				.send({ message: "User already Exits with this mail" });
	} catch (err) {
		return res.status(500).send({ message: "error while registring user!" });
	}
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const newUser = await userModel.create({
			name,
			email,
			password: hashedPassword,
		});
		const token = jwt.sign({ sub: newUser._id }, process.env.JWT_TOKEN, {
			expiresIn: "7d",
			algorithm: "HS256",
		});
		return res.json({ accessToken: token });
	} catch (err) {
		return res.json({ message: err.message });
	}
};

const loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).send({ message: "Enter email and password!" });
	}
	try {
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(400).send({ message: "User not found with this mail" });
		}
		const isMatch = bcrypt.compare(password, user?.password);
		if (!isMatch) return next(createHttpError(400, "Password Incorrect"));

		const token = jwt.sign({ sub: user._id }, process.env.JWT_TOKEN, {
			expiresIn: "7d",
			algorithm: "HS256",
		});
		return res.json({ accessToken: token });
	} catch (err) {
		return res.status(500).send({ message: "error while login user!" });
	}
};

export { createUser, loginUser };
