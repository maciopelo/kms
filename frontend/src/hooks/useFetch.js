import React, { useEffect, useState, useCallback } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const callAPI = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      options = null,
      headers = { "Content-Type": "application/json" }
    ) => {
      try {
        setIsLoading(true);
        const res = await fetch(url, {
          ...options,
          method: method,
          credentials: "include",
          headers: { ...headers },
          body: body,
        });

        const json = await res.json();

        if (method === "GET") setData(json);
        setIsLoading(false);
        return json;
      } catch (error) {}
    },
    []
  );

  return { data, isLoading, setData, callAPI };
};

export default useFetch;
