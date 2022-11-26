import React from "react";
import { Input, Form, Button, notification, Typography } from "antd";
import { register } from "../../apis/register";
import { Link, useHistory } from "react-router-dom";
import { validateEmail } from "../../utils/validateEmail";
import { validatePhoneNumber } from "../../utils/validatePhoneNumber";

function Register() {
	const history = useHistory();

	if (localStorage.getItem("x-user-id")) {
		history.push("/appointments");
	}

	const onSubmit = async (values) => {
		const res = await register(values);

		if (res.id) {
			notification.success({
				message: "Registered successfully",
			});
			history.push("/appointments/create");
		} else {
			notification.error({
				message: "Error",
				description: res.msg,
			});
		}
	};
	return (
		<div
			style={{
				backgroundImage: `url(${require("../../login.jpeg")})`,
				display: "flex",
				flexDirection: "column",
				height: "100%",
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
				<div style={{ maxWidth: 600, minWidth: 400, margin: "2rem" }}>
					<Typography.Title level={2}>Register</Typography.Title>
					<Form name="auth" layout="vertical" onFinish={onSubmit}>
						<Form.Item
							name="fristName"
							label="First name"
							rules={[
								{
									required: true,
									message: "Please enter your first name!",
								},
							]}
						>
							<Input size="large" placeholder="First name" />
						</Form.Item>
						<Form.Item
							name="lastName"
							label="Last name"
							rules={[
								{
									required: true,
									message: "Please enter your last name!",
								},
							]}
						>
							<Input size="large" placeholder="Last name" />
						</Form.Item>
						<Form.Item
							name="email"
							label="Email"
							rules={[
								{
									required: true,
									message: "Please enter your email!",
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
							<Input size="large" type="email" placeholder="Email" />
						</Form.Item>
						<Form.Item
							name="phone"
							label="Phone number"
							rules={[
								{
									required: true,
									message: "Please enter your Phone number!",
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (value && !validatePhoneNumber(value)) {
											return Promise.reject("Invalid phone number!");
										}
										return Promise.resolve();
									},
								}),
							]}
						>
							<Input size="large" placeholder="Phone number" maxlength="10" />
						</Form.Item>
						<Form.Item
							name="password"
							label="Password"
							rules={[
								{
									required: true,
									message: "Please enter password!",
								},
							]}
						>
							<Input size="large" placeholder="password" type="password" />
						</Form.Item>
						<Form.Item
							name="confirmPassword"
							label="Confirm Password"
							rules={[
								{
									required: true,
									message: "Please re-enter your password!",
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (getFieldValue("password") !== value) {
											return Promise.reject("Password do no match!");
										}
										return Promise.resolve();
									},
								}),
							]}
						>
							<Input
								size="large"
								placeholder="confirm password"
								type="password"
							/>
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
								Register
							</Button>
						</Form.Item>
					</Form>
				</div>
				<Link to={"/login"}>Login into your account</Link>{" "}
			</div>
		</div>
	);
}

export default Register;
