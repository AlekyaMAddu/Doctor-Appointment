import React from "react";
import { Dropdown, Space, Typography } from "antd";
import logo from "../logo.jpg";
import menu from "../menu.png";

import { Link, useHistory } from "react-router-dom";

export default function Header() {
	const history = useHistory();
	let items = [
		{
			key: "1",
			label: <Link to="/appointments">Appointments</Link>,
		},
		{
			key: "2",
			label: (
				<p
					onClick={() => {
						localStorage.removeItem("x-user-id");
						localStorage.removeItem("x-user-email");
						history.push("/");
					}}
				>
					Logout
				</p>
			),
		},
	];

	return (
		<Space
			style={{
				display: "flex",
				justifyContent: "space-between",
				backgroundColor: "lightblue",
				height: "8vh",
			}}
		>
			<div
				style={{
					display: "flex",
					gap: 5,
				}}
			>
				<img
					src={logo}
					alt="logo"
					style={{ height: "50px" }}
					onClick={() => history.push("/")}
				/>
				<Typography.Title>General Hospital</Typography.Title>
			</div>
			{localStorage.getItem("x-user-id") && (
				<Dropdown
					menu={{
						items,
					}}
					style={{ color: "red" }}
					placement="bottomRight"
				>
					<img src={menu} alt="logo" style={{ height: "70px" }} />
				</Dropdown>
			)}
		</Space>
	);
}
