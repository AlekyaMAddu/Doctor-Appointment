import React, { useEffect, useState } from "react";
import {
	Button,
	DatePicker,
	Form,
	Input,
	InputNumber,
	notification,
	Select,
	Space,
	Typography,
} from "antd";
import { useHistory } from "react-router-dom";
import { getDoctors, getSlots } from "../../../apis/appointment";
import moment from "moment";
import { validateEmail } from "../../../utils/validateEmail";
import { validatePhoneNumber } from "../../../utils/validatePhoneNumber";

const { Title } = Typography;
const { Option } = Select;
const format = "DD-MM-YYYY";

const layout = {
	labelCol: {
		span: 12,
	},
};

const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};

function BasicForm({
	onFinish,
	slots,
	setDoctors,
	setSlots,
	doctors,
	formData,
}) {
	const history = useHistory();
	const [form] = Form.useForm();
	const [isDisable, setIsDisabled] = useState(true);
	const disabledDate = (current) => {
		return current && current <= moment();
	};
	console.log(form.getFieldValue('slot'),"rrgfg");
	return (
		<Space
			style={{
				display: "flex",
				flexDirection: "column",
				alignContent: "left",
				backgroundImage: `url(${require("../../../appointment.jpeg")})`,
				padding: 30,
				height: "100%",
			}}
		>
			<Title>Book Appointment</Title>

			<Form
				{...layout}
				form={form}
				name="appointment"
				layout="horizontal"
				initialValues={{ ...formData }}
				onFinish={onFinish}
				onValuesChange={async (changedValues, allValues) => {
					if (changedValues["location"] || changedValues["appointmentType"]) {
						if (allValues["location"] && allValues["appointmentType"]) {
							const data = await getDoctors({
								appointmentType: allValues["appointmentType"],
								location: allValues["location"],
							});
							if (data.msg) {
								notification.error({ message: data.msg });
							}
							setDoctors(data);
						}
					}
					if (
						changedValues["location"] ||
						changedValues["appointmentType"] ||
						changedValues["appointmentDate"] ||
						changedValues["doctorId"]
					) {
						if (
							allValues["location"] &&
							allValues["appointmentType"] &&
							allValues["appointmentDate"] &&
							allValues["doctorId"]
						) {
							const data = await getSlots({
								appointmentType: allValues["appointmentType"],
								appointmentDate: moment(allValues["appointmentDate"]).format(
									format
								),
								location: allValues["location"],
								doctorId: allValues["doctorId"],
							});
							if (data.msg) {
								notification.error({ message: data.msg });
							}
							setSlots(data);
						}
					}
				}}
			>
				<Form.Item name="patientName" label="Full Name" rules={[
							{
								required: true,
								message: "Please enter your Full Name",
							},
						]}>
					<Input placeholder="Full Name" />
				</Form.Item>
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
					<Input placeholder="Email" type="email" />
				</Form.Item>
				<Form.Item
					name="mobileNumber"
					label="Mobile Number"
					rules={[
						{
							required: true,
							message: "Please enter your Mobile number!",
						},
						({ getFieldValue }) => ({
							validator(rule, value) {
								if (value && !validatePhoneNumber(value)) {
									return Promise.reject("Invalid mobile number!");
								}
								return Promise.resolve();
							},
						}),
					]}
				>
					<Input placeholder="Mobile Number" maxlength="10" />
				</Form.Item>
				<Form.Item name="gender" label="Gender">
					<Select placeholder="Select a gender">
						<Option value="Male">Male</Option>
						<Option value="Female">Female</Option>
						<Option value="Others">Others</Option>
					</Select>
				</Form.Item>
				<Form.Item name="age" label="Age">
					<InputNumber placeholder="Age" />
				</Form.Item>
				<Form.Item name="location" label="Location">
					<Select placeholder="Select Location">
					<Option value="Arkansas">Arkansas</Option>
						<Option value="Chicago">Chicago</Option>
						<Option value="Florida">Florida</Option>
						<Option value="Ohio">Ohio</Option>
						<Option value="Oklahoma">Oklahoma</Option>
						<Option value="Overland park">Overland park</Option>
						<Option value="Saint Louis">Saint Louis</Option>
					</Select>
				</Form.Item>
				<Form.Item name="appointmentType" label="Appointment Type">
					<Select placeholder="Select appointment type">
						<Option value="General Checkup">General Checkup</Option>
						<Option value="ENT">ENT</Option>
						<Option value="Cardiology">Cardiology</Option>
						<Option value="Gynechology">Gynechology</Option>
						<Option value="Dermatology">Dermatology</Option>
						<Option value="Opthamology">Opthamology</Option>
						<Option value="Pulmonology">Pulmonology</Option>
					</Select>
				</Form.Item>
				<Form.Item name="doctorId" label="Doctor name">
					<Select placeholder="Select Doctor name">
						{doctors.map((doctor) => (
							<Option value={doctor.id}>{doctor.name}</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item name="appointmentDate" label="Appointment Date">
					<DatePicker
						disabledDate={disabledDate}
						onChange={() => form.setFieldValue("slot", "")}
					/>
				</Form.Item>
				<Form.Item name="slot" label="Avaialable Slots">
					<Select placeholder="Select a slot" onChange={(value) => setIsDisabled(!value)}>
						{slots.map((each, idx) => (
							<Option
								value={each.slot}
								key={idx}
								style={{
									backgroundColor: each.available ? "green" : "red",
									color: "white",
								}}
							>
								{each.slot}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button
						shape="round"
						onClick={() => history.push("/appointments")}
						style={{ marginRight: 5 }}
					>
						Cancel
					</Button>
					<Button type="primary" shape="round" htmlType="submit" disabled={isDisable}>
						Book now
					</Button>
				</Form.Item>
			</Form>
		</Space>
	);
}

export default BasicForm;
