import stApi from "../../axiosInterceptor";
import { USER_LOGOUT } from "../../config";

export const handleUserLogout = async () => {
  try {
    const result = await stApi.get(USER_LOGOUT, { withCredentials: true });
    console.log(`[handleUserLogout] result : ${result}`);
    return result;
  } catch (error) {
    console.error("로그아웃 요청 중 에러가 발생했습니다.:", error);
    alert(
      `로그아웃 요청 중 에러가 발생했습니다. 관리자에게 문의하세요\nError Code: ${error.response.status}\nMessage: ${error.message}`
    );
    return null;
  }
};
