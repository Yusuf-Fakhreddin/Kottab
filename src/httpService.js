import axios from "axios";

// whenever we make http request the token will be included
// if the user is not logged in the token will be undefined
// for getting rid of Bi-directional dependencies
function setJwt(jwt) {
	axios.defaults.headers.common = { Authorization: `Bearer ${jwt}` };
}
// handling only unexpected errors globally
axios.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedError) {
		console.log("Logging the error", error);
		alert("An unexpected error occurred.");
	}
	// to pass the control back to the catch block and resume the function we return a rejected promise
	return Promise.reject(error);
});

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setJwt,
};
