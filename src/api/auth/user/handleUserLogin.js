import { useMutation } from "@tanstack/react-query";
import { setAccessTokenToLocalStorage } from "../../../services/setAccessTokenToLocalStorage.js";
import stApi from "../../axiosInterceptor.js";
import { USER_LOGIN } from "../../config.js";

const useUserLogin = () => {
  return useMutation({
    mutationFn: async ({ loginId, password }) => {
      const response = await stApi.post(USER_LOGIN, {
        login_id: loginId,
        password: password,
      });
      return response.data.success;
    },
    onSuccess: (data) => {
      console.log("로그인 응답 : ", data);
      const { access_token, user } = data;
      const { user_id, name, nickname } = user;

      setAccessTokenToLocalStorage(access_token);
      console.log(`[handleUserLogin] 로그인 성공!`);

      return { user_id, name, nickname };
    },
    onError: (error) => {
      if (error.response) {
        alert(`${error.response.status} : ${error.response.data.error.reason}`);
      } else {
        console.error("로그인 요청 중 에러가 발생했습니다.:", error);
        alert(
          `로그인 요청 중 에러가 발생했습니다. 관리자에게 문의하세요\nError Code: ${error.response?.status}\nMessage: ${error.message}`
        );
      }
    },
  });
};

export default useUserLogin;
