import { useEffect, useState } from "react";
import api from "../apis/axios";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetchData;
