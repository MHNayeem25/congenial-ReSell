import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000/api";
// axios.defaults.baseURL = "http://192.168.16.77:4000/api"; //for emulator

export async function login(email, password) {
  const bodyData = { email: email, password: password };
  try {
    // const response = await axios.request(config);
    const response = await axios.post("login", bodyData);
    // console.log(response);
    return response;
  } catch (error) {
    return error;
  }
}

export async function register(data) {
  try {
    // console.log(data);
    const response = await axios.put("register", data);
    // console.log(response.data);
    return response;
  } catch (error) {
    // console.log(error.response.status);
    // console.log(error.response.data);
    return error;
  }
}
