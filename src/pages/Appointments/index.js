import { Button, notification, Space, Table, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appointments, cancelAppointments } from "../../apis/appointment";

export default function Appointments() {
	const [data, setData] = useState([]);
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			width: 10,
		},
		{
			title: "Name",
			dataIndex: "patientName",
			width: 10,
		},
		{
			title: "Gender",
			dataIndex: "gender",
			width: 10,
		},
		{
			title: "Doctor Name",
			dataIndex: "doctorName",
			width: 10,
		},
		{
			title: "Appointment Type",
			dataIndex: "appointmentType",
			width: 10,
		},
		{
			title: "Appointment Date",
			dataIndex: "appointmentDate",
			width: 10,
		},
		{
			title: "Slot",
			dataIndex: "slot",
			width: 10,
		},
		{
			title: "Status",
			dataIndex: "bookingStatus",
			width: 10,
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Space
					size="middle"
					style={{
						display: "flex",
						flexDirection: "row",
						gap: "5px",
					}}
				>
					<Button>
						<Link to={`/appointments/${record.id}/edit`}>Edit </Link>
					</Button>

					<Popconfirm
						title="Are you sure you want to cancel?"
						onConfirm={() => onCancel(record.id)}
					>
						<Button type="danger">Cancel</Button>
					</Popconfirm>
				</Space>
			),
			width: 10,
		},
	];

	useEffect(() => {
		loadAppointments();
	}, []);
	const loadAppointments = async () => {
		const res = await appointments();
		setData(res);
	};

	const onCancel = async (appointmentId) => {
		const res = await cancelAppointments(appointmentId);

		if (res.id) {
			notification.success({
				message: "Booking cancelled successfully",
			});
		} else {
			notification.error({
				message: "Booking cancellation failed",
			});
		}

		loadAppointments();
	};
	return (
		<div style={{ marginTop: "30px", marginRight: "40px", marginLeft: "40px" }}>
			<div>
				<Link to="/appointments/create">
					<Button style={{ marginBottom: "20px" }}>Book Appointment</Button>
				</Link>
			</div>
			<Table
				columns={columns}
				dataSource={data}
				pagination={false}
				rowKey={"id"}
			/>
		</div>
	);
}
