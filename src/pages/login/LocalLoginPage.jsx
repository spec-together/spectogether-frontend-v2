import { useState, useEffect } from "react";
import { handleUserLogin } from "../../api/auth/user/handleUserLogin.js";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../contexts/UserContext.jsx";
import { CustomInputFieldWithLabel } from "../../components/CustomInputFieldWithLabel.jsx";
import { CustomSubmitButton } from "../../components/CustomSubmitButton.jsx";
import { CustomPwFieldWithCheck } from "../../components/CustomPwFieldWithCheck.jsx";
import useFormattedPhoneNumber from "../../hooks/useFormattedPhoneNumber.jsx";
import MainLogo from "../../components/login/MainLogo.jsx";
import { VerticalLine } from "../../components/VerticalLine.jsx";

export const LocalLoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");

  const { user, setUser } = useUser();

  useEffect(() => {
    if (password.includes(" ") || /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(password)) {
      setPassword(password.replace(/[\sㄱ-ㅎㅏ-ㅣ가-힣]/g, ""));
    }
  }, [password]);

  useFormattedPhoneNumber(phoneNumber, setPhoneNumber);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checked_user = await handleUserLogin(phoneNumber, password);
    if (checked_user) {
      setUser(checked_user);
      console.log("[LocalLoginPage] user : ", user, checked_user);
      alert(`환영합니다, ${checked_user.username} 님!`);
      navigate("/");
    } else {
      setPhoneNumber("");
      setPassword("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-primary">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md bg-container-bg-primary">
        <h2 className="font-bold text-center text-md font-gmarket text-text-primary">
          <MainLogo />
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInputFieldWithLabel
            label="전화번호"
            type="text"
            placeholder="전화번호를 입력하세요"
            getter={phoneNumber}
            setter={setPhoneNumber}
          />

          <div>
            <label className="block mb-1 text-sm font-medium text-text-primary">
              비밀번호
            </label>

            <CustomPwFieldWithCheck getter={password} setter={setPassword} />
          </div>
          <div className="flex justify-end space-x-2 text-sm text-text-secondary">
            <button
              type="button"
              className="hover:underline"
              onClick={() => {
                navigate("/find/id");
              }}
            >
              아이디 찾기
            </button>

            {/* | 표시 */}
            <VerticalLine />

            <button
              type="button"
              className="hover:underline"
              onClick={() => {
                navigate("/find/pw");
              }}
            >
              비밀번호 찾기
            </button>

            {/* | 표시 */}
            <VerticalLine />

            <button
              type="button"
              className="hover:underline"
              onClick={() => {
                navigate("/register/terms");
              }}
            >
              회원가입
            </button>
          </div>
          <CustomSubmitButton text="로그인" />
        </form>
      </div>
    </div>
  );
};
