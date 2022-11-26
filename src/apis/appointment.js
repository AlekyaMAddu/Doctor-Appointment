import {
	bookAppointmentEndpoint,
	doctorsEndpoint,
	slotEndpoint,
	cancelAppointmentEndpoint,
	appointmentsEndpoint,
	updateAppointmentEndpoint,
} from "../constants";
import axios from "axios";

export const appointments = () => {
	return axios
		.get(appointmentsEndpoint + localStorage.getItem("x-user-id"))
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return { msg: error.message };
		});
};

export const getAppointmentById = (id) => {
	return axios
		.get(bookAppointmentEndpoint + "/" + id)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.message;
		});
};

export const cancelAppointments = (id) => {
	return axios
		.get(cancelAppointmentEndpoint + id)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.message;
		});
};

export const createAppointment = (data) => {
	return axios
		.post(bookAppointmentEndpoint, data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.message;
		});
};

export const updateAppointment = (data) => {
	return axios
		.post(updateAppointmentEndpoint, data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error.message;
		});
};

export const getSlots = (data) => {
	return axios
		.post(slotEndpoint, data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return { msg: error.message };
		});
};

export const getDoctors = (data) => {
	return axios
		.post(doctorsEndpoint, data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return { msg: error.message };
		});
};
