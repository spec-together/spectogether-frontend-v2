import { useState } from "react";
import useFormatPhoneNumber from "../../hooks/formats/useFormatPhoneNumber";
import useCheckPhoneUnique from "../../hooks/api-requests/register/phone/useCheckPhoneUnique";
import usePhoneSendCode from "../../hooks/api-requests/register/phone/usePhoneSendCode";
import usePhoneVerifyCode from "../../hooks/api-requests/register/phone/usePhoneVerifyCode";

export const ResetPasswordPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  // 핸드폰번호 인증 관련
  const [isRegisteredPhone, setIsRegisteredPhone] = useState(false);
  const [phoneToken, setPhoneToken] = useState("");
  const [phoneVerifyId, setPhoneVerifyId] = useState("");

  const [isTokenSent, setIsTokenSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  useFormatPhoneNumber(phoneNumber, setPhoneNumber);

  // useMutation을 사용하여 API 호출
  const checkPhoneUnique = useCheckPhoneUnique();
  const phoneSendCode = usePhoneSendCode();
  const phoneVerifyCode = usePhoneVerifyCode();

  const handleCheckPhoneUnique = () => {
    const formattedPhoneNumber = phoneNumber.replace(/-/g, "");
    checkPhoneUnique.mutate(formattedPhoneNumber, {
      onSuccess: () => {
        alert("가입되어 있지 않은 번호입니다");
      },
      onError: () => {
        setIsRegisteredPhone(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isRegisteredPhone) {
      handleCheckPhoneUnique();
      return;
    }
    console.log("전화번호: ", phoneNumber);
  };

  // 전화번호 입력할 땐 다음 > 인증번호 발송하기 > 인증번호 입력

  return (
    <div className="flex justify-center mt-16">
      <div className="flex flex-col items-center justify-center space-y-10 mt-11 font-pretendard">
        <span className="text-4xl font-semibold">비밀번호 찾기</span>

        <div className="rounded py-14 px-14 flex flex-col mt-10 text-xl font-normal border border-black w-[40rem] font-pretendard">
          <span>비밀번호를 찾고자 하는 아이디 (전화번호)를 입력해주세요</span>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="전화번호를 입력하세요"
              className="w-full p-1 border-b border-black focus:outline-none"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            {/* 핸드폰번호 unique할 경우 인증 UI 띄워주기 */}
            {isRegisteredPhone && (
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
                    인증번호 발송하기
                  </button>
                )}
              </div>
            )}

            <button
              type="submit"
              className="mt-16 w-full mb-5 py-3 text-white bg-[#0010A3] rounded-md"
            >
              {isRegisteredPhone ? "인증하기" : "다음"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
