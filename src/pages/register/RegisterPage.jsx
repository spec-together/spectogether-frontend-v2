import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFormatPhoneNumber from "../../hooks/formats/useFormatPhoneNumber.jsx";
import { ShowAndHideIcon } from "../../components/icons/ShowAndHideIcon.jsx";
import { VerifyTrueFalseIcon } from "../../components/icons/VerifyTrueFalseicon.jsx";
import validator from "../../api/auth/register/validations.js";
import useFormatBirthDate from "../../hooks/formats/useFormatBitrhDate.jsx";
import useFormatPassword from "../../hooks/formats/useFormatPassword.jsx";
import useCheckPhoneUnique from "../../hooks/api-requests/register/phone/useCheckPhoneUnique.jsx";
import usePhoneSendCode from "../../hooks/api-requests/register/phone/usePhoneSendCode.jsx";
import usePhoneVerifyCode from "../../hooks/api-requests/register/phone/usePhoneVerifyCode.jsx";
import useUserRegister from "../../hooks/api-requests/register/useUserRegister.jsx";

export const RegisterPage = () => {
  // form 관련
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  // 핸드폰번호 인증 관련
  const [isPhoneUnique, setIsPhoneUnique] = useState(false);
  const [phoneToken, setPhoneToken] = useState("");
  const [phoneVerifyId, setPhoneVerifyId] = useState("");

  const [isTokenSent, setIsTokenSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  // OAuth 회원가입인 경우 비밀번호 입력창을 제거
  // 이메일이 넘어온 경우
  const [presetEnabled, setPresetEnabled] = useState(false);
  const [isOAuthRegister, setIsOAuthRegister] = useState(false);
  const [registerType, setRegisterType] = useState("");

  // 회원가입이 가능한 상태
  const [goodToGo, setGoodToGo] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const [errors, setErrors] = useState({
    name: "",
    password: "",
    phoneNumber: "",
    email: "",
  });

  const [isValid, setIsValid] = useState({
    email: false,
    phoneNumber: false,
  });

  const capitalizeLetters = (str) =>
    str
      .split("") // 문자열을 문자 배열로 분리
      .map((char) => {
        // 문자가 숫자가 아니면 대소문자 변환
        if (/\d/.test(char)) {
          return char; // 숫자는 그대로 둠
        }
        // 알파벳이면 대문자화
        return char.toUpperCase();
      })
      .join(""); // 배열을 다시 문자열로 합침

  // useMutation을 사용하여 API 호출
  const checkPhoneUnique = useCheckPhoneUnique();
  const phoneSendCode = usePhoneSendCode();
  const phoneVerifyCode = usePhoneVerifyCode();
  const userRegister = useUserRegister();

  const handleCheckPhoneUnique = () => {
    const formattedPhoneNumber = phoneNumber.replace(/-/g, "");
    checkPhoneUnique.mutate(formattedPhoneNumber, {
      onSuccess: () => {
        setIsPhoneUnique(true);
        alert("사용 가능한 번호입니다.");
      },
      onError: () => {
        alert("이미 가입된 번호입니다.");
      },
    });
  };

  const handlePhoneSendCode = () => {
    const formattedPhoneNumber = phoneNumber.replace(/-/g, "");
    phoneSendCode.mutate(formattedPhoneNumber, {
      onSuccess: (data) => {
        setIsTokenSent(true);
        setPhoneVerifyId(data.id);
        alert("인증번호가 발송되었습니다.");
      },
      onError: () => {
        alert("인증번호 발송에 실패했습니다.");
      },
    });
  };

  const handlePhoneVerifyCode = (code) => {
    phoneVerifyCode.mutate(
      { token: phoneToken, id: phoneVerifyId, code },
      {
        onSuccess: () => {
          setIsPhoneVerified(true);
          alert("인증에 성공했습니다.");
        },
        onError: () => {
          alert("인증에 실패했습니다.");
        },
      }
    );
  };

  // 전화번호 입력 시 '-' 자동 입력
  useFormatPhoneNumber(phoneNumber, setPhoneNumber);
  // 생년월일 입력 검증
  useFormatBirthDate(birthdate, setBirthdate);
  // 비밀번호에 공백, 한글이 포함되어 있을 경우 제거
  useFormatPassword(password, setPassword);

  // 카카오톡으로 회원가입 시
  // email은 고정하도록 하는 부분
  // state가 넘어왔을 경우를 처리
  useEffect(() => {
    console.log("[회원가입 : 메인] state로 넘어온 약관 : ", location.state);
    // TODO : type에 따른 구별 처리 및 정보를 자동으로 채웠을 떄에는 disabled 처리
    if (location.state?.user) {
      setEmail(location.state?.user.email || "");
      setRegisterType(location.state?.type ? "oauth" : "local");
      setIsOAuthRegister(true);
      setPresetEnabled(true);
      console.log(`state가 존재하여 email을 ${location.state?.user.email}로 설정합니다.
        \nregisterType : ${location.state?.type}`);
    }
  }, [location]);

  // 회원가입
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      name: validator.name(name),
      password: isOAuthRegister ? "" : validator.password(password),
      phoneNumber: !validator.phoneNumber(phoneNumber),
      email: !validator.email(email),
    };

    if (Object.values(errors).some((error) => error)) {
      console.log("errors : ", errors);
      setErrors(errors);
      return;
    }

    // 전송할 값으로 파싱하는 절차
    const userAgreedTerms = Object.entries(location.state.agreeTerms).map(
      ([key, value]) => ({
        term_id: Number(key),
        is_agreed: value,
      })
    );
    const formattedBirthdate = `${birthdate.slice(0, 4)}-${birthdate.slice(4, 6)}-${birthdate.slice(6, 8)}`;
    const userData = {
      register_type: registerType,
      name,
      nickname: capitalizeLetters(phoneVerifyId.slice(0, 4)),
      birthdate: formattedBirthdate,
      phone_verification_session_id: phoneVerifyId,
      email,
      terms: userAgreedTerms,
    };
    // 로컬 회원가입일 경우만 password 전송
    if (registerType === "local") {
      userData.password = password;
    } else if (registerType === "oauth") {
      userData.oauth_type = location.state.type;
      userData.oauth_id = location.state.user.oauth_id.toString();
    }

    userRegister.mutate(userData, {
      onSuccess: () => {
        alert("회원가입에 성공했습니다.");
        navigate("/login");
      },
      onError: () => {
        alert("회원가입에 실패했습니다.");
      },
    });
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
          <span className="mt-1 -mb-2 text-xs text-red-500">{errors.name}</span>

          {/* 생년월일 입력 */}
          <input
            type="text"
            placeholder="생년월일 8자리를 입력해주세요"
            className="p-1 mt-10 border-b border-black focus:outline-none"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />

          {/* 비밀번호 입력 */}
          {!isOAuthRegister && (
            <div>
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
                {errors.password}
              </span>
            </div>
          )}

          <div className="relative mt-10 border-b border-black ">
            <input
              type="text"
              placeholder="전화번호를 입력하세요"
              className="p-1 focus:outline-none"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={isTokenSent}
            />
            <button
              type="button"
              onClick={handleCheckPhoneUnique}
              className={`absolute inset-y-0 right-0 flex items-center px-4 text-base ${isPhoneUnique ? "text-green-500" : "text-red-500"}`}
            >
              <VerifyTrueFalseIcon isValid={isPhoneUnique} />
            </button>
          </div>

          {/* 핸드폰번호 unique할 경우 인증 UI 띄워주기 */}
          {isPhoneUnique && (
            <div className="relative mt-10 border-b border-black ">
              <input
                type="text"
                placeholder="인증번호를 입력하세요"
                className="p-1 focus:outline-none"
                value={phoneToken}
                onChange={(e) => setPhoneToken(e.target.value)}
              />
              {isPhoneVerified ? (
                <div
                  className={`absolute inset-y-0 right-0 flex items-center px-4 text-base`}
                >
                  인증되었습니다
                </div>
              ) : isTokenSent ? (
                <button
                  type="button"
                  onClick={handlePhoneVerifyCode}
                  className={`absolute inset-y-0 right-0 flex items-center px-4 text-base`}
                >
                  인증하기
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePhoneSendCode}
                  className={`absolute inset-y-0 right-0 flex items-center px-4 text-base`}
                >
                  인증번호 발송
                </button>
              )}
            </div>
          )}

          <div className="relative mt-10 border-b border-black ">
            <input
              type="text"
              placeholder="이메일을 입력하세요"
              className="p-1 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={presetEnabled}
            />
            <span className="mt-1 -mb-2 text-xs text-red-500">
              {errors.email}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            className={`mt-16 mb-5 py-3 rounded-md ${!goodToGo ? "cursor-not-allowed bg-[#999999] text-gray-900" : "bg-[#0010A3] text-white"}`}
            disabled={!goodToGo}
          >
            회원가입 하기
          </button>
        </div>
      </div>
    </div>
  );
};
