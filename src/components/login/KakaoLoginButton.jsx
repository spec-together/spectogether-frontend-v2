import { handleKakaoLogin } from "../../api/auth/user/handleKakaoLogin.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext.jsx";
import { KakaoLogo } from "../icons/KakaoLogo.jsx";

export function KakaoLoginButton() {
  const navigate = useNavigate();
  const { login } = useUser();

  const handleKakaoLoginClick = async () => {
    try {
      const user = await handleKakaoLogin();
      console.log("[kakao-login] user : ", user);
      if (user.status) {
        // 로그인 성공
        console.log("[kakao-login] Found user : ", user.user);
        login(user.user);
        navigate("/");
      } else {
        // 로그인 실패
        console.log("[kakao-login] Unregistered user : ", user.user);
        // 회원가입 페이지로 리다이렉트
        navigate("/register/terms", {
          state: {
            type: "kakao",
            user: {
              oauth_id: user.user.oauth_id,
              email: user.user.email,
            },
          },
        });
      }
    } catch (err) {
      console.error("[kakao-login] ERR : ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLoginClick}
      className="w-full flex px-4 py-3 items-center justify-center text-[#191919] bg-[#fee500] rounded-md" // 색상 변경
    >
      <KakaoLogo />
      <div className="ml-4 text-xl text-center text-black font-basic">
        카카오로 시작하기
      </div>
    </button>
  );
}
