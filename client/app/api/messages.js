import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api";
// axios.defaults.baseURL = "http://192.168.16.77:4000/api"; //for emulator

const sendMessage = async function (message, listingId, senderId) {
  try {
    // console.log(message);
    //send user id along with getListings as header
    const response = await axios.put("postMessage", {
      message,
      listingId,
      senderId,
    });
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

const getMessages = async function (userId) {
  try {
    // console.log(userId);
    const response = await axios.get("getMessages", { params: { userId } });
    // console.log(response.data);
    return response;
  } catch (error) {
    return error;
  }
};

const delMessage = async function (messageId) {
  try {
    // console.log(messageId);
    const response = await axios.put("delMessage", { messageId });
    return response;
  } catch (error) {
    return error;
  }
};

export default {
  sendMessage,
  getMessages,
  delMessage,
};
