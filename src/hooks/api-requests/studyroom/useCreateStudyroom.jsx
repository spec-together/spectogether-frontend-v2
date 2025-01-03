import { useMutation } from "@tanstack/react-query";
import { CREATE_STUDYROOM } from "../../../api/config.js";
import stApi from "../../../api/axiosInterceptor.js";

const useCreateStudyroom = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await stApi.post(CREATE_STUDYROOM, data);
      return response.data.success;
    },
  });
};

export default useCreateStudyroom;

// data: 뮤테이션의 성공적인 응답 데이터
// error: 뮤테이션의 에러 정보
// isLoading: 뮤테이션이 로딩 중인지 여부
// isError: 뮤테이션이 에러 상태인지 여부
// mutate: 뮤테이션을 실행하는 함수
// reset: 뮤테이션의 상태를 초기화하는 함수
