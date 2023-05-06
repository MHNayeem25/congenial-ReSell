import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = async (...args) => {
    try {
      setLoading(true);

      const response = await apiFunc(...args);
      // console.log(response);
      setLoading(false);

      setError(response.status !== 200);
      setData(response.data.listings);

      return response;
    } catch (error) {
      setError(true);
      return error;
    }
  };
  return { request, data, error, loading };
};
