import { setAccessTokenToLocalStorage } from "../../../services/setAccessTokenToLocalStorage.js";
import { BASE_URL, KAKAO_LOGIN } from "../../config.js";

export const handleKakaoLogin = () => {
  return new Promise((resolve) => {
    window.open(KAKAO_LOGIN, "resizable=no,location=no,scrollbars=yes");

    const messageHandler = (event) => {
      const allowedOrigins = [
        BASE_URL,
        "http://localhost:5173",
        "https://api.st.skyofseoul.synology.me",
      ];
      console.log("[handleKakaoLogin] event.data:", event.data);
      console.log("[handleKakaoLogin] event.origin:", event.origin);
      if (allowedOrigins.includes(event.origin) === false) {
        console.error("[handleKakaoLogin] Invalid origin: ", event.origin);
        return; // 서버 주소 확인
      }

      if (event.data?.is_registered === true) {
        console.log("[handleKakaoLogin] 카카오 로그인 성공", event.data);
        setAccessTokenToLocalStorage(event.data.access_token);
        resolve({ status: true, user: JSON.parse(event.data.user_info) });
      } else if (event.data?.is_registered === false) {
        console.log(
          "[handleKakaoLogin] 사용자가 등록되지 않았습니다.",
          event.data.not_registered_user
        );
        resolve({
          status: false,
          user: {
            oauth_id: event.data.id,
            email: event.data.email,
          },
        });
      }
      // 이벤트 리스너 제거 (한 번만 처리)
      window.removeEventListener("message", messageHandler);
    };

    window.addEventListener("message", messageHandler);
  });
};
