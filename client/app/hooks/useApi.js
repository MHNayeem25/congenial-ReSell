import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = async (...args) => {
    try {
      setLoading(true);
      const response = await apiFunc(...args);
      console.log(response);
      setLoading(false);
      if (!response.ok) return setError(true);
      setError(false);
      setData(response.data);
    } catch (error) {
      setError(true);
    }
  };
  return { request, data, error, loading };
};
