import { setAccessTokenToLocalStorage } from "../../../services/setAccessTokenToLocalStorage.js";
import meetApi from "../../axiosInterceptor.js";
import { USER_LOGIN } from "../../config.js";

export const handleUserLogin = async (loginID, password) => {
  try {
    const response = await meetApi.post(USER_LOGIN, {
      login_id: loginID,
      password: password,
    });

    console.log("response : ", response.data);
    const { access_token, user } = response.data.success;
    const { user_id, name, nickname } = user;

    setAccessTokenToLocalStorage(access_token);
    console.log(`[handleUserLogin] 로그인 성공!`);

    return { user_id, name, nickname };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("잘못된 아이디 또는 비밀번호를 입력했습니다.");
      alert("잘못된 아이디 또는 비밀번호를 입력했습니다.");
      return null;
    }
    console.error("로그인 요청 중 에러가 발생했습니다.:", error);
    alert(
      `로그인 요청 중 에러가 발생했습니다. 관리자에게 문의하세요\nError Code: ${error.response.status}\nMessage: ${error.message}`
    );
    return null;
  }
};
