import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { useHistory, useParams } from "react-router-dom";
import {
	getAppointmentById,
	getDoctors,
	getSlots,
	updateAppointment,
} from "../../apis/appointment";
import moment from "moment";
import BasicForm from "./components/Form";

const format = "DD-MM-YYYY";

function EditAppointment() {
	const { appID } = useParams();
	const history = useHistory();
	const [formData, setFormData] = useState({});
	const [slots, setSlots] = useState([]);
	const [doctors, setDoctors] = useState([]);
	const [loading, setLoading] = useState(true);
	console.log(formData);
	useEffect(() => {
		getAppointment();
	}, [appID]);

	const getAppointment = async () => {
		let res = await getAppointmentById(appID);

		const docs = await getDoctors({
			appointmentType: res.appointmentType,
			location: res.location,
		});

		if (docs.msg) {
			notification.error({ message: docs.msg });
		}

		setDoctors(docs);

		const slt = await getSlots({
			appointmentDate: res.appointmentDate,
			appointmentType: res.appointmentType,
			location: res.location,
			doctorId: res.doctorId,
		});

		if (slt.msg) {
			notification.error({ message: slt.msg });
		}
		setSlots(slt);

		if (res.id) {
			const arr = res.appointmentDate.split("-");
			setFormData({
				...res,
				appointmentDate: moment(new Date(arr.reverse().join("/"))),
			});
			setLoading(false);
		}
	};

	const onSubmit = async (values) => {
		const doctorName = doctors.filter((each) => each.id == values.doctorId)[0]
			.name;
		const res = await updateAppointment({
			...values,
			doctorName,
			id: appID,
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
				message:
					"Appointment cannot be booked. Please re-check your details and try again",
				description: res,
			});
		}
	};

	if (loading) {
		return null;
	}

	return (
		<BasicForm
			formData={formData}
			onFinish={onSubmit}
			slots={slots}
			setSlots={setSlots}
			setDoctors={setDoctors}
			doctors={doctors}
		/>
	);
}

export default EditAppointment;
