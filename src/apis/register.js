import axios from "axios";
import { registerEndpoint } from "../constants";

export const register = (data) => {
	return axios
		.post(registerEndpoint, data)
		.then((response) => {
			const { id } = response.data;
			localStorage.setItem("x-user-id", id);
			localStorage.setItem("x-user-email", data.email);
			return response.data;
		})
		.catch((error) => {
			return { msg: error.message };
		});
};
