import { KakaoLoginButton } from "../../components/login/KakaoLoginButton.jsx";
import { LoginToggles } from "../../components/login/LoginToggles.jsx";
import { useState } from "react";
import useFormatPhoneNumber from "../../hooks/formats/useFormatPhoneNumber.jsx";
import useUserLogin from "../../api/auth/user/handleUserLogin.js";
import { useUser } from "../../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { ShowAndHideIcon } from "../../components/icons/ShowAndHideIcon.jsx";
import useFormatPassword from "../../hooks/formats/useFormatPassword.jsx";

export const LoginPage = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { login } = useUser();
  const userLogin = useUserLogin();

  useFormatPassword(password, setPassword);
  useFormatPhoneNumber(loginId, setLoginId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedLoginId = loginId.replace(/-/g, "");
    userLogin.mutate(
      { loginId: trimmedLoginId, password },
      {
        onSuccess: (data) => {
          console.log("[LoginPage] data : ", data);
          login(data.user);
          alert(`환영합니다, ${data.user.name} 님!`);
          navigate("/");
        },
        onError: (error) => {
          console.error("[LoginPage] error : ", error);
          setPassword("");
        },
      }
    );
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="flex flex-col items-center justify-center space-y-10 mt-11 font-pretendard">
        <span className="text-4xl font-semibold">로그인</span>

        <div className="rounded py-14 px-14 flex flex-col mt-10 text-xl font-normal border border-black w-[32rem] font-pretendard">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="전화번호를 입력하세요"
              className="w-full p-1 border-b border-black focus:outline-none"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <div className="relative w-full mt-10 border-b border-black ">
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
              type="submit"
              className="mt-16 w-full mb-5 py-3 text-white bg-[#0010A3] rounded-md"
            >
              로그인 하기
            </button>
            <KakaoLoginButton />
          </form>
        </div>
      </div>
    </div>
  );
};
