import React from "react";
import { Input, Form, Button, notification, Typography } from "antd";
import { Link } from "react-router-dom";
import { login } from "../../apis/login";
import { validateEmail } from "../../utils/validateEmail";

function Login() {
	if (localStorage.getItem("x-user-id")) {
		window.location = "/appointments/create";
	}
	const onSubmit = async (values) => {
		const res = await login(values);

		if (res.id) {
			window.location = "/appointments/create";
		} else {
			notification.error({
				message: "Invalid EMail or Password",
				// description: res.msg,
			});
		}
	};
	return (
		<div
			style={{
				padding: 20,
				backgroundImage: `url(${require("../../login.jpeg")})`,
				display: "flex",
				flexDirection: "column",
				height: "100vh"
			}}
		>
			<div
				style={{
					maxWidth: 800,
					minWidth: 400,
					margin: "auto",
					padding: 20,
					backgroundColor: "#fff",
				}}
			>
				<Typography.Title level={2}>Login</Typography.Title>
				<Form name="auth" layout="vertical" onFinish={onSubmit}>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								required: true,
								message: "Please enter your e-mail!",
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (value && !validateEmail(value)) {
										return Promise.reject("Invalid email address!");
									}
									return Promise.resolve();
								},
							}),
						]}
					>
						<Input size="large" placeholder="e-mail" />
					</Form.Item>
					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								message: "Please enter your password!",
							},
						]}
					>
						<Input size="large" placeholder="Password" type="password" />
					</Form.Item>
					<Form.Item>
						<Button
							size="large"
							form="auth"
							type="primary"
							shape="round"
							htmlType="submit"
							block
						>
							Login
						</Button>
					</Form.Item>
				</Form>
				<Link to={"/register"}>Register Account</Link>{" "}
			</div>
		</div>
	);
}

export default Login;
