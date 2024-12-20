import { useEffect, useState } from "react";
import stApi from "../../api/axiosInterceptor.js";
import { GET_TERMS } from "../../api/config.js";

export const useGetTerms = () => {
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const result = await stApi.get(GET_TERMS);
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
