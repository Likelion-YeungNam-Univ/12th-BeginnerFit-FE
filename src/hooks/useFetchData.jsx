import { useEffect, useState } from "react";
import api from "../apis/axios";
import axios from "axios";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [arr,setArr]=useState([]);//배열형태 추가
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await api.get(url);
        setData(response.data);
        setArr(response.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [url]);

  return { data, isLoading, error,arr };
};

export default useFetchData;
