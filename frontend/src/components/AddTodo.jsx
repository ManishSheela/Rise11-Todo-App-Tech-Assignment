import React, { useState } from "react";
import { _addTodos } from "../util";

const AddTodo = ({ openModel, handleEdit, setOpenModel, setTodos }) => {
	const [title, setTitle] = useState("");
	const accessToken = localStorage.getItem("accessToken");
	const isEditMode = openModel?.mode === "add" ? false : true;
	const handleAdd = async () => {
		if (!isEditMode) {
			const res = await _addTodos(title, accessToken);
			setTodos((prev) => [res, ...prev]);
		} else {
			handleEdit(openModel?.id, title, false);
		}
		setOpenModel(null);
	};

	return (
		<div className="ModelContainer">
			<div className="modelWrapper">
				<h3 style={{ textAlign: "center", marginBottom: "16px" }}>
					{isEditMode ? "Edit" : "Add"} Todo
				</h3>
				<input
					type="text"
					style={{
						width: "100%",
						padding: "5px",
						borderRadius: "5px",
						fontSize: "16px",
						outline: "none",
						border: "1px solid #6c63ff",
					}}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Input your task..."
				/>

				<div className="model-button">
					<button className="btn cancel-btn" onClick={() => setOpenModel(null)}>
						Cancel
					</button>
					<button className="btn" onClick={handleAdd}>
							{isEditMode ? "Save" : "Add"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddTodo;
