import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
	addTodos,
	getAllTodos,
	deleteTodo,
	editTodo,
} from "./todoController.js";

const todoRouter = express.Router();

todoRouter.get("/", authenticate, getAllTodos);
// todoRouter.get("/:todoId", getSingleTodo);
todoRouter.post("/addTodos", authenticate, addTodos);
todoRouter.put("/:todoId", editTodo);
todoRouter.delete("/:todoId", authenticate, deleteTodo);

export default todoRouter;
