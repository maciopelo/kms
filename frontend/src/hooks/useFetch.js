import React, { useEffect, useState } from "react";

const useFetch = (url, method = "GET", options = null, body = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(url, { ...options, credentials: "include" });
        const json = await res.json();

        setData(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return { data, error, isLoading, setData };
};

export default useFetch;
