import { useNavigate } from "react-router-dom";
import { VerticalLine } from "../VerticalLine";

export const LoginAndRegister = () => {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const handleRegisterButtonClick = () => {
    navigate("/register/terms");
  };

  return (
    <div className="flex flex-row items-center space-x-[0.62rem] mr-[1.75rem]">
      <button
        className="text-[#3d3d3d] font-basic font-medium text-xl tracking-tight"
        onClick={handleLoginButtonClick}
      >
        로그인
      </button>
      {/* | 표시 */}
      <VerticalLine />
      {/* 회원가입 버튼 */}
      <button
        className="text-[#3d3d3d] font-basic font-medium text-xl tracking-tight"
        onClick={handleRegisterButtonClick}
      >
        회원가입
      </button>
    </div>
  );
};
