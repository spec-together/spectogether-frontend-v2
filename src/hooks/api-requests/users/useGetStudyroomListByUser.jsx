import { useEffect, useState } from "react";
import stApi from "../../api/axiosInterceptor.js";
import { GET_USER_STUDYROOMS } from "../../api/config.js";

export const useGetStudyrooms = () => {
  const [studyrooms, setStudyrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudyrooms = async () => {
      try {
        console.log(`[useGetStudyrooms] 데이터를 불러오는 중...`);
        const result = await stApi.get(GET_USER_STUDYROOMS);
        setStudyrooms(result.data.success.studyrooms);
        console.log(`[useGetStudyrooms] result`, result.data.success);
      } catch (error) {
        console.error(`[useGetStudyrooms] error`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyrooms();
  }, []);

  return { studyrooms, loading };
};
