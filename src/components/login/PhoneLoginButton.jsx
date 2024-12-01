import { useNavigate } from "react-router-dom";
import { PhoneLoginLogo } from "../icons/PhoneLoginLogo";

export function PhoneLoginButton() {
  const navigate = useNavigate();
  const handlePhoneLogin = () => {
    navigate("/login/local");
  };
  return (
    <button
      type="button"
      className="flex items-center justify-center w-full px-4 py-3 text-black bg-white border border-black rounded-xl" // 색상 변경
      onClick={handlePhoneLogin}
    >
      <PhoneLoginLogo />
      <div className="ml-4 text-xl text-center text-black font-basic">
        전화번호로 시작하기
      </div>
    </button>
  );
}
