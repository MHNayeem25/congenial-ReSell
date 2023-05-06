import axios from "axios";

import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY } from "@env";

export async function uploadImage(file, onUploadProgress) {
  try {
    const response = await axios.get("getSignature");
    const { signature, timestamp } = response.data;

    const newFile = {
      uri: file,
      type: `test/${file.split(".")[1]}`,
      name: `test:${file.split(".")[1]}`,
    };

    const form = new FormData();
    form.append("file", newFile);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload?api_key=${process.env.CLOUDINARY_API_KEY}&timestamp=${timestamp}&signature=${signature}`,
      {
        method: "POST",
        body: form,
      }
    );

    const { secure_url, public_id } = await res.json();
    return { secure_url, public_id };
  } catch (error) {
    console.log(error);
  }
}
