import { useEffect, useState } from "react";
import meetApi from "../api/axiosInterceptor";
import { GET_TERMS } from "../api/config";

export const useGetTerms = () => {
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const result = await meetApi.get(GET_TERMS);
        setTerms(result.data.success);
      } catch (error) {
        console.error(`[useGetTerms] error`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  return { terms, loading };
};
