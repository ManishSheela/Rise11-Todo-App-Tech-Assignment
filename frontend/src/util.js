import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
console.log(process.env);
const _fetchTodos = async (authToken) => {
	try {
		const response = await axios.get(`${baseURL}/api/todos`, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		const todos = response.data;
		return todos;
	} catch (error) {
		console.error("Error fetching todos:", error.message);
		throw error;
	}
};

const _deleteTodo = async (todoId, authToken) => {
	try {
		const response = await axios.delete(`${baseURL}/api/todos/${todoId}`, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		if (response.status >= 200 && response.status < 300) {
			console.log("Todo deleted successfully");
			return true;
		} else {
			console.error("Failed to delete todo:", response.statusText);
			return false;
		}
	} catch (err) {
		console.error("Error deleting todos:", err.message);
		throw err;
	}
};

const _addTodos = async (title, accessToken) => {
	try {
		const response = await axios.post(
			`${baseURL}/api/todos/addTodos`,
			{ title },
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (response.status >= 200 && response.status < 300) {
			console.log("Todo added successfully");
			return response.data;
		} else {
			console.error("Failed to add todo:", response.statusText);
			return null;
		}
	} catch (error) {
		console.error("Error adding todo:", error.message);
		throw error;
	}
};

const _editTodo = async (id, title, status) => {
	try {
		const response = await axios.put(`${baseURL}/api/todos/${id}`, {
			completed: status,
			title,
		});

		if (response.status >= 200 && response.status < 300) {
			console.log("Todo status updated successfully");
			return response.data;
		} else {
			console.error("Failed to update todo status:", response.statusText);
			return null;
		}
	} catch (error) {
		console.error("Error updating todo status:", error.message);
		throw error;
	}
};

export { _fetchTodos, _deleteTodo, _addTodos, _editTodo };
