import { useQuery } from "@tanstack/react-query";
import stApi from "../../../api/axiosInterceptor.js";
import { GET_CONTESTS } from "../../../api/config.js";

export const useGetEventInfo = (contestId) => {
  const fetchContestInfo = async () => {
    console.log(
      `[useGetContestInfo] 데이터를 불러오는 중... contestId: ${contestId}`
    );
    const result = await stApi.get(`${GET_CONTESTS}/${contestId}`);
    console.log(`[useGetContestInfo] result`, result.data.success);
    return result.data.success.event;
  };
  return useQuery({
    queryKey: ["contest", contestId],
    queryFn: fetchContestInfo,
    enabled: !!contestId,
    staleTime: 1000 * 60 * 5, // 5분
    onError: (error) => {
      console.error(`[useGetContestInfo] error`, error);
    },
  });
};

// data: 쿼리의 성공적인 응답 데이터
// error: 쿼리의 에러 정보
// isLoading: 쿼리가 로딩 중인지 여부
// isError: 쿼리가 에러 상태인지 여부
// isFetching: 쿼리가 백그라운드에서 데이터를 다시 가져오는 중인지 여부
// refetch: 쿼리를 다시 실행하는 함수
