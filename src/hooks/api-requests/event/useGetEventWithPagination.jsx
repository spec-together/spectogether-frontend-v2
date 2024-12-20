import { useEffect, useState } from "react";
import stApi from "../../../api/axiosInterceptor.js";
import { GET_CONTESTS } from "../../../api/config.js";

export const useGetEventWithPagination = (page, limit) => {
  const [contestList, setContestList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContestList = async () => {
      try {
        setLoading(true);
        const response = await stApi.get(
          `${GET_CONTESTS}?page=${page || 1}&limit=${limit || 10}`
        );
        console.log("Contest Response:", response.data);
        setContestList(response.data.success.contests);
        setPagination(response.data.success.pagination);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContestList();
  }, [page, limit]);

  return { contestList, pagination, loading, error };
};
