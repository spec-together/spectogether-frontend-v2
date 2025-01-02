import { useQuery } from "@tanstack/react-query";
import { GET_STUDYROOM_INFO } from "../../../api/config.js";
import stApi from "../../../api/axiosInterceptor.js";

const useGetStudyroomInfo = (id) => {
  return useQuery({
    queryKey: ["studyroomInfo", id],
    queryFn: async () => {
      const response = await stApi.get(`${GET_STUDYROOM_INFO}/${id}`);
      console.log(
        "[useGetStudyroomInfo] 스터디룸 정보를 가져왔습니다:",
        response.data.success
      );
      return response.data.success;
    },
  });
};

export default useGetStudyroomInfo;

// data: 쿼리의 성공적인 응답 데이터
// error: 쿼리의 에러 정보
// isLoading: 쿼리가 로딩 중인지 여부
// isError: 쿼리가 에러 상태인지 여부
// refetch: 쿼리를 다시 실행하는 함수
