import todoModel from "./todoModel.js";

const addTodos = async (req, res, next) => {
	const { title, description = "no description added" } = req.body;

	if (!title)
		return res.status(400).send({ message: "Please give name to the task!" });

	try {
		const todo = await todoModel.create({
			title,
			description,
			uploadedBy: req?.userId,
		});
		return res.json(todo);
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
};
const getAllTodos = async (req, res, next) => {
	const userId = req?.userId;
	try {
		const todos = await todoModel
			.find({ uploadedBy: userId })
			.populate("uploadedBy", "name");
		return res.json(todos);
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
};
const deleteTodo = async (req, res, next) => {
	const { todoId } = req.params;

	try {
		const todo = await todoModel.findOne({ _id: todoId });
		if (!todo) return res.status(400).send({ message: "todo not found" });

		if (todo?.uploadedBy != req?.userId)
			return res
				.status(400)
				.send({ message: "you don't have access to delete this todo" });
		await todoModel.deleteOne({ _id: todoId });

		return res.json({ message: "todo successfully deleted" });
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
};
const editTodo = async (req, res, next) => {
	const { todoId } = req.params;
	const { title, description, completed } = req.body;

	try {
		const todo = await todoModel.findOne({ _id: todoId });
		if (!todo) return res.status(400).send({ message: "Todo not found" });

		// if (todo.uploadedBy != req.userId)
		// 	return res
		// 		.status(403)
		// 		.send({ message: "You don't have access to edit this todo" });
    console.log(completed);
		// Update the todo fields
		if (title) todo.title = title;
		if (description) todo.description = description;
		todo.completed = completed;

		await todo.save();

		return res.json(todo);
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
};

export { addTodos, getAllTodos, deleteTodo, editTodo };
