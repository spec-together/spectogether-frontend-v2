import { KakaoLoginButton } from "../components/login/KakaoLoginButton";
import { LoginToggles } from "../components/login/LoginToggles";
import { useState, useEffect } from "react";
import useFormattedPhoneNumber from "../hooks/useFormattedPhoneNumber";
import { handleUserLogin } from "../api/auth/user/handleUserLogin";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ShowAndHideIcon } from "../components/icons/ShowAndHideIcon";

export const NewLoginPage = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  useEffect(() => {
    if (password.includes(" ") || /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(password)) {
      setPassword(password.replace(/[\sㄱ-ㅎㅏ-ㅣ가-힣]/g, ""));
    }
  }, [password]);

  useFormattedPhoneNumber(loginId, setLoginId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checked_user = await handleUserLogin(loginId, password);
    if (checked_user) {
      setUser(checked_user);
      console.log("[LocalLoginPage] user : ", user, checked_user);
      alert(`환영합니다, ${checked_user.username} 님!`);
      navigate("/");
    } else {
      setLoginId("");
      setPassword("");
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="flex flex-col items-center justify-center space-y-10 mt-11 font-pretendard">
        <span className="text-4xl font-semibold">로그인</span>

        <div className="rounded py-14 px-14 flex flex-col mt-10 text-xl font-normal border border-black w-[32rem] font-pretendard">
          <input
            type="text"
            placeholder="전화번호를 입력하세요"
            className="p-1 border-b border-black focus:outline-none"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <div className="relative mt-10 border-b border-black ">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              className="p-1 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-base text-gray-900"
            >
              <ShowAndHideIcon isShow={showPassword} />
            </button>
          </div>

          <LoginToggles />

          <button
            onClick={handleSubmit}
            className="mt-16 mb-5 py-3 text-white bg-[#0010A3] rounded-md"
          >
            로그인 하기
          </button>
          <KakaoLoginButton />
        </div>
      </div>
    </div>
  );
};
