import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { MdOutlineAdd } from "react-icons/md";
import Todo from "../components/Todo";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import { _addTodos, _deleteTodo, _editTodo, _fetchTodos } from "../util";
import AddTodo from "../components/AddTodo";

const Dashboard = () => {
	const [searchValue, setSearchValue] = useState("");
	const [openModel, setOpenModel] = useState(null);
	const [todos, setTodos] = useState([]);
	const accessToken = localStorage.getItem("accessToken");

	const searchedItems = todos.filter((todo) =>
		todo.title?.toLocaleLowerCase().includes(searchValue?.toLocaleLowerCase())
	);

	const handleDelete = async (id) => {
		try {
			const newTodos = todos.filter((todo) => todo?._id !== id);

			const deletionSuccessful = await _deleteTodo(id, accessToken);

			if (deletionSuccessful) {
				setTodos(newTodos);
				console.log("Todo deleted successfully");
			} else {
				console.error("Failed to delete todo");
			}
		} catch (err) {
			console.log("Error", err.message);
		}
	};
	const handleEdit = async (id, title = "", status) => {
		try {
			const editSuccessfully = await _editTodo(id, title, status);
			console.log(editSuccessfully);
			if (editSuccessfully) {
				setTodos((prevTodos) =>
					prevTodos.map((todo) =>
						todo._id === id ? { ...todo, ...editSuccessfully } : todo
					)
				);
			}
		} catch (error) {
			console.error("Error updating todo:", error.message);
		}
	};
	useEffect(() => {
		if (accessToken) {
			const fetchTodos = async () => {
				try {
					const res = await _fetchTodos(accessToken);
					setTodos(res);
				} catch (err) {
					console.error("Error fetching todos:", err.message);
				}
			};
			fetchTodos();
		}
	}, []);

	if (!accessToken) {
		return <Navigate to={"/auth/login"} replace />;
	}
	return (
		<>
			<div className="todoContainer">
				<div className="wrapper">
					<Header details={todos?.[0]?.uploadedBy} />
					<div className="searchInput">
						<input
							type="search"
							value={searchValue}
							placeholder="Search note..."
							onChange={(e) => setSearchValue(e.target.value)}
						/>
					</div>
					<div className="taskWrapper">
						{searchedItems?.map((todo) => {
							return (
								<Todo
									key={todo?._id}
									todo={todo}
									handleDelete={handleDelete}
									handleEdit={handleEdit}
									setOpenModel={setOpenModel}
								/>
							);
						})}
					</div>
					{!searchedItems?.length && <img src="/LIST.png" alt="empty list" />}
					<div className="addButton">
						<MdOutlineAdd
							className="addIcon"
							onClick={() => setOpenModel({ mode: "add", id: null })}
						/>
					</div>
				</div>
			</div>
			{openModel && (
				<AddTodo
					openModel={openModel}
					setOpenModel={setOpenModel}
					setTodos={setTodos}
					handleEdit={handleEdit}
				/>
			)}
		</>
	);
};

export default Dashboard;
