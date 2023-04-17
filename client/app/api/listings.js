import client from "./client";
// import axios from "axios";
const endpoint = "/listings";

const getListings = () => client.get(endpoint);

export default {
  getListings,
};
// axios.defaults.baseURL = "http://127.0.0.1:9000";
// export async function getListings() {
//   try {
//     const response = await axios.get("api/listings");
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }
