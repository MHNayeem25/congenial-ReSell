import { create } from "apisauce";
import cache from "../utility/cache";
import axios from "axios";

const get = axios.get;
axios.get = async (url, params, axiosConfig) => {
  try {
    const response = await get(url, params, axiosConfig);
    if (response.status === 200) {
      await cache.store(url, response.data);
      return response;
    }
  } catch (error) {
    const data = await cache.get(url);
    if (data) return { status: 200, data };
    console.log(error);
  }
};
