import express from "express";
import { config } from "dotenv";
import userRouter from "./user/userRouter.js";
import todoRouter from "./todo/todoRouter.js";
import cors from "cors";

const app = express();
config();
app.use(express.json());
app.use(cors());
app.get("/", (req, res, next) => {
	res.json({ message: "welcome to homepage" });
});

app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

export default app;
