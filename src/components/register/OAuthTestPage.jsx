import React, { useEffect } from "react";
import axios from "./checkAuthorized.js";

const OAuthTestPage = () => {
  // 카카오 로그인 처리 함수
  const handleKakaoLogin = () => {
    const kakaoOAuthUrl = `http://localhost:3000/auth/kakao`;
    window.location.href = kakaoOAuthUrl; // 카카오 인증 URL로 리다이렉트
  };

  // 콜백 페이지에서 호출되는 함수
  useEffect(() => {
    // URL에서 인증 코드 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    if (authorizationCode) {
      console.log("Authorization Code:", authorizationCode);

      // 서버로 인증 코드 전송
      axios
        .post("http://localhost:3000/auth/kakao/callback", {
          code: authorizationCode,
        })
        .then((response) => {
          console.log("Login Successful:", response.data);
          // 여기서 사용자를 적절한 페이지로 리다이렉트 할 수 있음
        })
        .catch((error) => {
          console.error("Login Failed:", error);
        });
    }
  }, []); // 빈 배열을 의존성으로 전달하여 마운트 시 한 번만 실행

  return (
    <div>
      <h1>OAuth Login Test</h1>
      <button onClick={handleKakaoLogin}>Login with OAuth</button>
    </div>
  );
};

export default OAuthTestPage;
