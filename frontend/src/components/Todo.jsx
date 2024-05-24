import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "../pages/dashboard.css";

const Todo = ({
	todo,
	setOpenModel = () => {},
	handleDelete = () => {},
	handleEdit = () => {},
}) => {
	const [isCompleted, setIsCompleted] = useState(todo?.completed);

	return (
		<div className="task">
			<div className="left">
				<input
					type="checkbox"
					checked={isCompleted}
					onChange={() => {
						handleEdit(todo?._id, "", !isCompleted);
						setIsCompleted(!isCompleted);
					}}
				/>
				<span className={isCompleted ? "completedTask" : ""}>
					{todo?.title}
				</span>
			</div>
			<div className="right">
				<FaEdit
					className="rightItem edit"
					onClick={() => setOpenModel({ mode: "edit", id: todo?._id })}
				/>
				<MdDelete
					className="rightItem delete"
					onClick={() => handleDelete(todo?._id)}
				/>
			</div>
		</div>
	);
};

export default Todo;
