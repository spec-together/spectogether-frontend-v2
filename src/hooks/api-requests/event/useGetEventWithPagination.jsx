import { useQuery } from "@tanstack/react-query";
import stApi from "../../../api/axiosInterceptor.js";
import { GET_CONTESTS } from "../../../api/config.js";

export const useGetEventWithPagination = (page = 1, limit = 10) => {
  const options = (page, limit) => {
    return {
      queryKey: ["contests", page, limit],
      queryFn: async () => {
        const response = await stApi.get(
          `${GET_CONTESTS}?page=${page}&limit=${limit}`
        );
        console.log(response.data.success);
        return response.data.success;
      },
      keepPreviousData: true,
    };
  };

  return useQuery(options(page, limit));
};

// data: 쿼리의 성공적인 응답 데이터
// error: 쿼리의 에러 정보
// isLoading: 쿼리가 로딩 중인지 여부
// isError: 쿼리가 에러 상태인지 여부
// isFetching: 쿼리가 백그라운드에서 데이터를 다시 가져오는 중인지 여부
// refetch: 쿼리를 다시 실행하는 함수
