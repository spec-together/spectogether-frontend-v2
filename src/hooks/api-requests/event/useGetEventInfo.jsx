import { useEffect, useState } from "react";
import stApi from "../../api/axiosInterceptor.js";
import { GET_CONTESTS } from "../../api/config.js";

export const useGetContestInfo = (contestId) => {
  const [contestInfo, setContestInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContestInfo = async () => {
      try {
        console.log(
          `[useGetContestInfo] 데이터를 불러오는 중... contestId: ${contestId}`
        );
        const result = await stApi.get(`${GET_CONTESTS}/${contestId}`);
        setContestInfo(result.data.success.contest);
        console.log(`[useGetContestInfo] result`, result.data.success);
      } catch (error) {
        console.error(`[useGetContestInfo] error`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchContestInfo();
  }, [contestId]);

  return { contestInfo, loading };
};
