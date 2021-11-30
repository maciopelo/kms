import React, { useEffect, useState, useCallback } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const callAPI = useCallback(
    async (url, method = "GET", body = null, options = null) => {
      try {
        setIsLoading(true);
        const res = await fetch(url, {
          ...options,
          method: method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        });
        const json = await res.json();

        if (method === "GET") setData(json);
        setIsLoading(false);
        return json;
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  return { data, isLoading, setData, callAPI };
};

export default useFetch;
