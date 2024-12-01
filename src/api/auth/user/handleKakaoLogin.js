import { setAccessTokenToLocalStorage } from "../../../services/setAccessTokenToLocalStorage.js";
import { BASE_URL, KAKAO_LOGIN } from "../../config.js";

export const handleKakaoLogin = () => {
  return new Promise((resolve) => {
    window.open(KAKAO_LOGIN, "resizable=no,location=no,scrollbars=yes");

    const messageHandler = (event) => {
      const allowedOrigins = [BASE_URL, "http://localhost:5173"];
      if (allowedOrigins.includes(event.origin) === false) {
        console.error("[handleKakaoLogin] Invalid origin: ", event.origin);
        return; // 서버 주소 확인
      }
      console.log("[handleKakaoLogin] event.data:", event.data);
      console.log("[handleKakaoLogin] event.origin:", event.origin);

      // 사용자가 등록되지 않은 경우
      if ("not_registered_user" in event.data) {
        const { email } = event.data.not_registered_user;
        console.log(
          "[handleKakaoLogin] User not found, please redirect to register page"
        );
        resolve({ status: false, user: { email } }); // Promise 해결
        // setTimeout(() => {
        //   window.location.reload();
        //   console.log(
        //     "[handleKakaoLogin] 창이 닫히고, 새로고침을 예약했습니다."
        //   );
        // }, 500);
      } else {
        const { user_id, username, token } = event.data;
        console.log("[handleKakaoLogin] User found:", user_id, username, token);
        setAccessTokenToLocalStorage(token);
        resolve({ status: true, user: { user_id, username } }); // Promise 해결
        // setTimeout(() => {
        //   window.location.reload();
        //   console.log(
        //     "[handleKakaoLogin] 창이 닫히고, 새로고침을 예약했습니다."
        //   );
        // }, 500);
      }

      // 이벤트 리스너 제거 (한 번만 처리)
      window.removeEventListener("message", messageHandler);
    };

    window.addEventListener("message", messageHandler);
  });
};
