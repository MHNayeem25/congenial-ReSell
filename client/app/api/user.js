import axios from "axios";

export async function getUserById(userId) {
  try {
    // console.log(userId);
    const response = await axios.get("getUserById", { params: { userId } });
    return response;
  } catch (error) {
    return error;
  }
}
