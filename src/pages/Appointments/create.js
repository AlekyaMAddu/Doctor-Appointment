import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { useHistory } from "react-router-dom";
import { createAppointment } from "../../apis/appointment";
import moment from "moment";
import BasicForm from "./components/Form";

const format = "DD-MM-YYYY";

function CreateAppointment() {
	const history = useHistory();
	const [slots, setSlots] = useState([]);
	const [doctors, setDoctors] = useState([]);

	useEffect(() => {}, []);

	const onSubmit = async (values) => {
		const doctorName = doctors.filter((each) => each.id == values.doctorId)[0]
			.name;
		const res = await createAppointment({
			...values,
			doctorName,
			appointmentDate: moment(values["appointmentDate"]).format(format),
			userId: localStorage.getItem("x-user-id"),
		});
		if (res.id) {
			notification.success({
				message:
					"Appointment booked successfully and details sent to registered mail ",
			});
			history.push("/appointments");
		} else {
			notification.error({
				message: "Error",
				description: res,
			});
		}
	};

	return (
		<BasicForm
			formData={{ email: localStorage.getItem("x-user-email") }}
			onFinish={onSubmit}
			slots={slots}
			setSlots={setSlots}
			setDoctors={setDoctors}
			doctors={doctors}
		/>
	);
}

export default CreateAppointment;
