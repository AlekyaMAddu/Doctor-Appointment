import axios from "axios";
import { loginEndpoint } from "../constants";

export const login = (data) => {
	return axios
		.post(loginEndpoint, data)
		.then((response) => {
			const { id } = response.data;
			localStorage.setItem("x-user-id", id);
			localStorage.setItem("x-user-email", data.email);
			return { id };
		})
		.catch((error) => {
			return { msg: error.message };
		});
};
