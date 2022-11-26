export const validatePhoneNumber = (num) => {
	var regx = /^\d{10}$/;
	return regx.test(num);
};
