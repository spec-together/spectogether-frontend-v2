import meetApi from "../../axiosInterceptor.js";
import { REISSUE_TOKEN } from "../../config.js";
import { setAccessTokenToLocalStorage } from "../../../services/setAccessTokenToLocalStorage.js";

export const reissueToken = async () => {
  try {
    console.log("[reissueToken] 토큰 재발급 요청 중...");
    const response = await meetApi.get(REISSUE_TOKEN);

    const { access_token } = response.data;
    setAccessTokenToLocalStorage(access_token);
    console.log(`
      [reissueToken] Token Reissued
    `);

    return true;
  } catch (error) {
    console.error("Error reissuing token:", error);
    return false;
  }
};
