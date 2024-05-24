import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import AuthLayout from "./layouts/AuthLayout";

const router = createBrowserRouter([
	{ path: "/dashboard", element: <Dashboard /> },
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{ path: "login", element: <Login /> },
			{ path: "register", element: <Signup /> },
		],
	},
]);

export default router;
