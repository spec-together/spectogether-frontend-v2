import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // 현재 시간을 초 단위로 가져옵니다.

  return decodedToken.exp < currentTime; // 토큰이 만료되었는지 확인합니다.
};
