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
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_API_KEY}/image/upload?api_key=${process.env.CLOUDINARY_API_KEY}&timestamp=${timestamp}&signature=${signature}`,
      {
        method: "POST",
        body: form,
      }
    );

    // let config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload?api_key=${CLOUDINARY_API_KEY}&timestamp=${timestamp}&signature=${signature}`,
    //   headers: {
    //     ...form.getHeaders(),
    //   },
    //   data: form,
    // };

    // const res = await axios.request(config);

    // console.log(res.data);
    const { secure_url, public_id } = await res.json();
    // console.log({ secure_url, public_id });
    return { secure_url, public_id };
  } catch (error) {
    console.log(error);
  }
}
