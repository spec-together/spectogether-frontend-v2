// 이게 쓰는거임

import { useNavigate } from "react-router-dom";
import { VerticalLine } from "../VerticalLine";

export const LoginToggles = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row mt-5 text-sm font-medium text-gray-600 opacity-80">
      <div className="flex flex-row space-x-1">
        <button
          type="button"
          className="hover:underline"
          onClick={() => {
            navigate("/find/id");
          }}
        >
          아이디 찾기
        </button>

        <span>|</span>

        <button
          type="button"
          className="hover:underline"
          onClick={() => {
            navigate("/find/pw");
          }}
        >
          비밀번호 찾기
        </button>
      </div>

      <div className="flex-grow"></div>

      <button
        type="button"
        className="hover:underline"
        onClick={() => {
          navigate("/register/terms");
        }}
      >
        회원가입하기
      </button>
    </div>
  );
};
