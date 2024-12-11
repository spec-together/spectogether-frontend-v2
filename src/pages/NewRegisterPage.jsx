import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFormattedPhoneNumber from "../hooks/useFormattedPhoneNumber";
import { ShowAndHideIcon } from "../components/icons/ShowAndHideIcon";
import { VerifyTrueFalseIcon } from "../components/icons/VerifyTrueFalseicon";
import { checkUniqueValue } from "../api/auth/register/checkUniqueValue";
import {
  validateEmailFormat,
  validatePhoneNumberFormat,
  validateName,
  validatePassword,
} from "../api/auth/register/validations";
import { userRegister } from "../api/auth/register/userRegister";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const NewRegisterPage = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthdate, setBirthdate] = useState(new Date("1990-01-01"));

  const navigate = useNavigate();
  const location = useLocation();

  const [presetEnabled, setPresetEnabled] = useState(false);

  const [nameError, setNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [isUniqueEmail, setIsUniqueEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isUniquePhoneNumber, setIsUniquePhoneNumber] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  const [triedUniqueEmail, setTriedUniqueEmail] = useState(false);
  const [triedUniquePhoneNumber, setTriedUniquePhoneNumber] = useState(false);

  const [profileImage, setProfileImage] = useState("");
  const [fileName, setFileName] = useState("");

  // 비밀번호에 공백, 한글이 포함되어 있을 경우 제거
  useEffect(() => {
    if (password.includes(" ") || /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(password)) {
      setPassword(password.replace(/[\sㄱ-ㅎㅏ-ㅣ가-힣]/g, ""));
    }
  }, [password]);

  // 이메일, 전화번호 유효성 검사
  useEffect(() => {
    if (validateEmailFormat(email)) {
      setIsValidEmail(true);
    } else {
      setIsUniqueEmail(false);
      setIsValidEmail(false);
    }
  }, [email]);

  useEffect(() => {
    if (validatePhoneNumberFormat(phoneNumber)) {
      setIsValidPhoneNumber(true);
    } else {
      setIsUniquePhoneNumber(false);
      setIsValidPhoneNumber(false);
    }
  }, [phoneNumber]);

  // 전화번호 입력 시 '-' 자동 입력
  useFormattedPhoneNumber(phoneNumber, setPhoneNumber);

  // 카카오톡으로 회원가입 시 email은 고정하도록 하는 부분
  useEffect(() => {
    console.log("[회원가입 : 메인] state로 넘어온 약관 : ", location.state);
    // TODO : type에 따른 구별 처리 및 정보를 자동으로 채웠을 떄에는 disabled 처리
    if (location.state?.email) {
      setEmail(location.state?.email || "");
      setPresetEnabled(true);
      setIsUniqueEmail(true);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      name: validateName(name),
      password: validatePassword(password),
      phoneNumber: !validatePhoneNumberFormat(phoneNumber),
      email: !validateEmailFormat(email),
    };

    if (Object.values(errors).some((error) => error)) {
      console.log("errors : ", errors);
      setNameError(errors.name);
      setPasswordError(errors.password);
      setPhoneNumberError(errors.phoneNumber);
      setEmailError(errors.email);
      return;
    }

    setPasswordError("");
    setPhoneNumberError("");
    setEmailError("");

    const userAgreedTerms = Object.entries(location.state.agreeTerms).map(
      ([key, value]) => ({
        term_id: Number(key),
        agreed: value,
      })
    );
    const userRegisterType = presetEnabled ? "kakao" : "local";

    try {
      // TODO : date 한국시간 기준으로 변경해야하나?
      const registerResult = await userRegister({
        user_register_type: userRegisterType,
        name,
        nickname,
        birthdate: birthdate.toISOString().split("T")[0],
        email,
        email_verification_id: "1",
        phone_number: phoneNumber,
        phone_number_verification_id: "1",
        password,
        terms: userAgreedTerms,
        profile_image: "123", // TODO : 이미지 S3에 업로드 후 URL 반환하는 것으로 수정
      });
      if (!registerResult.status) {
        alert("회원가입에 실패했습니다.\n" + registerResult.message);
        return;
      } else {
        alert("회원가입 성공!");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      alert(`회원가입 에러 발생!\nError : ${err}`);
    }
  };

  const handleEmailCheck = async () => {
    const result = await checkUniqueValue("email", email);
    setIsUniqueEmail(result);
    setTriedUniqueEmail(true);
  };

  const handlePhoneNumberCheck = async () => {
    const result = await checkUniqueValue("phone_number", phoneNumber);
    setIsUniquePhoneNumber(result);
    setTriedUniquePhoneNumber(true);
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="flex flex-col items-center justify-center space-y-10 mt-11 font-pretendard">
        <span className="text-4xl font-semibold">회원가입</span>

        <div className="rounded py-14 px-14 flex flex-col mt-10 text-xl font-normal border border-black w-[32rem] font-pretendard">
          <input
            type="text"
            placeholder="이름을 입력하세요"
            className="p-1 border-b border-black focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="mt-1 -mb-2 text-xs text-red-500">{nameError}</span>

          <input
            type="text"
            placeholder="닉네임을 입력하세요"
            className="p-1 mt-10 border-b border-black focus:outline-none"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          {/* 생년월일 입력 */}
          <div className="flex flex-row mt-10 border-b border-black">
            <span className="p-1">생년월일</span>
            <div className="flex-grow"></div>
            <DatePicker
              selected={birthdate}
              onChange={(date) => setBirthdate(date)}
              dateFormat="yyyy-MM-dd"
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="생년월일을 입력하세요"
              shouldCloseOnSelect
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
            />
          </div>

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
              className="absolute inset-y-0 right-0 flex items-center px-4 text-base text-black"
            >
              <ShowAndHideIcon isShow={showPassword} />
            </button>
          </div>
          <span className="mt-1 -mb-2 text-xs text-red-500">
            {passwordError}
          </span>

          <div className="relative mt-10 border-b border-black ">
            <input
              type="text"
              placeholder="전화번호를 입력하세요"
              className="p-1 focus:outline-none"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              type="button"
              onClick={handlePhoneNumberCheck}
              className={`absolute inset-y-0 right-0 flex items-center px-4 text-base ${isUniquePhoneNumber ? "text-green-500" : "text-red-500"}`}
            >
              <VerifyTrueFalseIcon isValid={isUniquePhoneNumber} />
            </button>
          </div>
          <span className="mt-1 -mb-2 text-xs text-red-500">
            {triedUniquePhoneNumber &&
              (!isValidPhoneNumber
                ? "전화번호는 010-123(4)-5678 형식으로 입력해주세요."
                : !isUniquePhoneNumber
                  ? "이미 가입된 전화번호 입니다."
                  : "")}
          </span>

          <div className="relative mt-10 border-b border-black ">
            <input
              type="text"
              placeholder="이메일을 입력하세요"
              className="p-1 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              onClick={handleEmailCheck}
              className={`absolute inset-y-0 right-0 flex items-center px-4 text-base ${isUniqueEmail ? "text-green-500" : "text-red-500"}`}
            >
              <VerifyTrueFalseIcon isValid={isUniqueEmail} />
            </button>
          </div>
          <span className="mt-1 -mb-2 text-xs text-red-500">
            {triedUniqueEmail &&
              (!isValidEmail
                ? "유효한 이메일 주소를 입력해주세요."
                : !isUniqueEmail
                  ? "이미 가입된 이메일 입니다."
                  : "")}
          </span>

          {/* 스터디룸 프로필 이미지 */}
          <div className="relative flex items-center mt-10 border-b border-black">
            <label className="text-gray-700">스터디룸 프로필</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFileName(file.name); // 파일명 저장
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setProfileImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span className="text-gray-500">
                {fileName || "이미지 파일 선택"}
              </span>
              <button
                type="button"
                className="px-4 py-1 text-sm text-blue-600 bg-white rounded-md shadow-sm hover:bg-blue-100"
              >
                파일 선택
              </button>
            </div>
            {fileName && (
              <div className="mt-2 text-sm text-blue-600">
                선택된 파일: {fileName}
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className={`mt-16 mb-5 py-3 rounded-md ${!isUniqueEmail || !isUniquePhoneNumber ? "cursor-not-allowed bg-[#999999] text-gray-900" : "bg-[#0010A3] text-white"}`}
            disabled={!isUniqueEmail || !isUniquePhoneNumber}
          >
            {!isValidEmail || !isValidPhoneNumber
              ? "입력하신 값을 점검해주세요"
              : !isUniqueEmail || !isUniquePhoneNumber
                ? "중복확인을 해주세요"
                : "회원가입 하기"}
          </button>
        </div>
      </div>
    </div>
  );
};
