import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import Home from "./pages/index.js";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateAppointment from "./pages/Appointments/create.js";
import Appointments from "./pages/Appointments";
import EditAppointment from "./pages/Appointments/edit.js";
import Layout from "./Layout";

function App() {
	const [userExists, setUserExists] = useState(false);
	useEffect(() => {
		setUserExists(localStorage.getItem("x-user-id") ? true : false);
	}, [localStorage.getItem("x-user-id")]);

	return (
		<div className="App">
			<Router>
				<Switch>
					<Layout>
						<Route path="/" component={() => <Home />} exact />
						<Route path="/login" component={() => <Login />} exact />
						<Route path="/register" component={() => <Register />} exact />
						{userExists && (
							<>
								<Route
									path="/appointments/create"
									component={() => <CreateAppointment />}
									exact
								/>
								<Route
									path="/appointments/:appID/edit"
									component={() => <EditAppointment />}
									exact
								/>
								<Route
									path="/appointments"
									component={() => <Appointments />}
									exact
								/>
							</>
						)}
					</Layout>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
