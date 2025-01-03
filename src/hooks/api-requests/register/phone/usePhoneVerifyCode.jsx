import { useMutation } from "@tanstack/react-query";
import stApi from "../../../../api/axiosInterceptor.js";
import { PHONE_VERIFY_CODE } from "../../../../api/config.js";

const usePhoneVerifyCode = () => {
  return useMutation({
    mutationFn: async ({ id, token }) => {
      const response = await stApi.post(PHONE_VERIFY_CODE, {
        id,
        token,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("인증 코드 확인 성공:", data);
    },
    onError: (error) => {
      console.error("인증 코드 확인 실패:", error);
    },
  });
};

export default usePhoneVerifyCode;

// data: 뮤테이션의 성공적인 응답 데이터
// error: 뮤테이션의 에러 정보
// isLoading: 뮤테이션이 로딩 중인지 여부
// isError: 뮤테이션이 에러 상태인지 여부
// mutate: 뮤테이션을 실행하는 함수
// reset: 뮤테이션의 상태를 초기화하는 함수
