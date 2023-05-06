import axios from "axios";

// axios.defaults.baseURL = "http://localhost:4000/api";
// axios.defaults.baseURL = "http://192.168.16.77:4000/api"; //for emulator

export async function registerPushToken(pushToken, userId) {
  try {
    //send user id along with getListings as header
    const response = await axios.put(
      "expoPushToken",
      { token: pushToken },
      {
        headers: {
          "user-id": userId,
        },
      }
    );
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
