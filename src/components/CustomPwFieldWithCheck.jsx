import { useState } from "react";

export const CustomPwFieldWithCheck = ({
  getter,
  setter,
  errGetter,
  required,
}) => {
  const [showPassword, setShowPassword] = useState();
  return (
    <div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={getter}
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setter(e.target.value)}
          className="w-full px-4 py-2 bg-input-bg border border-input-border rounded-md hover:outline hover:outline-1 hover:outline-input-border-hover focus:outline-none focus:ring focus:ring-1 focus:ring-input-border-focused"
          required={required ? true : false}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center px-4 text-m text-text-secondary"
        >
          {showPassword ? "숨기기" : "보기"}
        </button>
      </div>
      {errGetter && <p className="mt-1 text-sm text-red-500">{errGetter}</p>}
    </div>
  );
};
