import { useState } from "react";
import api from "../apis/axios";

export const usePostData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const postData = async (payload = {}) => {
    setIsLoading(true);

    try {
      const res = await api.post(url, payload);
      
      setData(res.data);
      console.log(res);
      return res.data;

    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, postData };
};
