import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { instance } from "../instance";

const useAxios = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await instance.get(url);
      setData(data);
    };
    getData();
  }, [url]);
  return {
    data,
    setData,
    isLoading,
    setIsLoading,
  };
};

export default useAxios;
