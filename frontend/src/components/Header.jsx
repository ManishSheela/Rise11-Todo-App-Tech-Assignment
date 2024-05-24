import React from "react";
import Avatar from "react-avatar";
import { Navigate } from "react-router-dom";
const Header = ({ details }) => {
	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		return <Navigate to={"/auth/login"} replace />;
	};
	return (
		<div className="heading">
			<h3> Rise11 Todo App</h3>
			<div>
				<Avatar
					name={details?.name}
					size="35"
					round="20px"
					color={Avatar.getRandomColor("sitebase", ["#6c63ff", "#FFA62F", "#A1DD70"])}
				/>
				<button onClick={handleLogout} className="btn">
					Logout
				</button>
			</div>
		</div>
	);
};

export default Header;
