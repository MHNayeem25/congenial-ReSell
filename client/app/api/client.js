import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://localhost:4000/api",
});

export default apiClient;
