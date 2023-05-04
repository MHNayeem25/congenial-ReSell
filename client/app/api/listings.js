import client from "./client";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api";
// axios.defaults.baseURL = "http://192.168.16.77:4000/api"; //for emulator

export async function getListings(userId) {
  try {
    //send user id along with getListings as header
    const response = await axios.get("listings", {
      headers: {
        "user-id": userId,
      },
    });
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function addListing(data, onUploadProgress) {
  try {
    // console.log(data);
    const response = await axios.post("post/listing", data, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
