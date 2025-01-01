// 이게 쓰는거임

import { useNavigate } from "react-router-dom";

export const LoginToggles = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row mt-5 text-sm font-medium text-gray-600 opacity-80">
      <div className="flex flex-row space-x-1">
        <button
          type="button"
          className="hover:underline"
          onClick={() => {
            alert(
              "스펙투게더는 전화번호를 아이디로 활용하고 있습니다.\n전화번호로 로그인 해 주세요."
            );
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
