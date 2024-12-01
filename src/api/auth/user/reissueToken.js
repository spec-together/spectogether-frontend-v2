import meetApi from "../../axiosInterceptor.js";
import { REISSUE_TOKEN } from "../../config.js";
import { setAccessTokenToLocalStorage } from "../../../services/setAccessTokenToLocalStorage.js";

export const reissueToken = async () => {
  try {
    console.log("[reissueToken] 토큰 재발급 요청 중...");
    const response = await meetApi.get(REISSUE_TOKEN);

    const { token, user } = response.data;
    const { user_id, username } = user;
    setAccessTokenToLocalStorage(token);
    console.log(`
      [reissueToken] Token Reissued, 사용자 정보:\n
      user_id: ${user_id}\n
      username: ${username}
    `);

    return true;
  } catch (error) {
    console.error("Error reissuing token:", error);
    return false;
  }
};
