import { useState, useEffect } from "react";
import CheckBox from "../components/register/CheckBox";
import { useLocation, useNavigate } from "react-router-dom";
import { getTerms } from "../api/auth/register/getTerms";

export const NewTermsAgreePage = () => {
  const [terms, setTerms] = useState([]); // 초기 상태는 빈 배열
  const [agreeAll, setAgreeAll] = useState(false); // 전체 동의 상태
  const [agreeTerms, setAgreeTerms] = useState({}); // 각 약관 동의 상태
  const location = useLocation();
  const [prevState, setPrevState] = useState("");

  useEffect(() => {
    console.log("[약관동의 페이지] 넘어온 state 값 : ", location.state);
    if (location.state?.type === "kakao") {
      setPrevState(location.state?.user || "");
      console.log("prevState : ", prevState);
    }
    const fetchTerms = async () => {
      try {
        const fetchedTerms = await getTerms(); // getTerms 호출
        setTerms(fetchedTerms); // 상태 업데이트
        const initialAgreeState = fetchedTerms.reduce((acc, term) => {
          acc[term.term_id] = false; // 각 약관은 기본적으로 동의하지 않음
          return acc;
        }, {});
        setAgreeTerms(initialAgreeState);
      } catch (error) {
        console.error("Error fetching terms:", error); // 에러 처리
      }
    };

    fetchTerms(); // 비동기 함수 호출
  }, []); // 빈 배열로 설정하여 컴포넌트가 처음 마운트될 때만 실행

  const handleAgreeAllChange = () => {
    const newAgreeAll = !agreeAll;
    setAgreeAll(newAgreeAll);
    const newAgreeTerms = Object.keys(agreeTerms).reduce((acc, termId) => {
      acc[termId] = newAgreeAll; // 전체 동의 상태에 맞춰 각 약관의 동의 상태 변경
      return acc;
    }, {});
    setAgreeTerms(newAgreeTerms);
  };

  const handleAgreeTermChange = (termId) => {
    setAgreeTerms((prevState) => {
      const newTerms = {
        ...prevState,
        [termId]: !prevState[termId], // 해당 약관의 동의 상태 토글
      };

      // 전체 동의 상태 업데이트
      const allAgreed = Object.values(newTerms).every(Boolean);
      setAgreeAll(allAgreed);

      return newTerms;
    });
  };

  const isButtonDisabled = terms.some(
    (term) => term.is_required && !agreeTerms[term.term_id]
  );

  const navigate = useNavigate();
  const handleContinueRegister = () => {
    console.log("동의한 약관 : ", agreeTerms);
    console.log("[약관동의페이지] 전달하는 state : ", prevState);
    navigate("/register", { state: { email: prevState, agreeTerms } });
  };

  return (
    <div className="flex flex-row">
      <div className="flex-grow"></div>

      <div className="flex flex-col items-start mt-16 font-pretendard">
        <div className="flex flex-col space-y-1">
          <span className="text-4xl font-semibold">환영합니다,</span>
          <span className="text-4xl font-semibold">
            서비스 이용을 위해서 아래 약관에 동의해주세요.
          </span>
        </div>

        <div className="flex flex-row items-center mt-5">
          <CheckBox isChecked={agreeAll} setIsChecked={handleAgreeAllChange} />
          <span className="ml-2 text-2xl font-bold">전체 동의</span>
        </div>
        <div className="w-full h-px my-4 bg-black"></div>

        <div className="flex flex-col items-center w-full space-y-4">
          {terms.map((term) => (
            <div key={term.term_id} className="flex flex-col w-full">
              <div className="flex flex-row items-center w-full">
                <CheckBox
                  isChecked={agreeTerms[term.term_id]}
                  setIsChecked={() => handleAgreeTermChange(term.term_id)}
                />
                <span className="ml-2 text-xl font-semibold">
                  {term.is_required ? "(필수) " : "(선택) "}
                  {term.term_name}
                </span>
                <div className="flex-grow"></div>
              </div>

              <div className="p-4 mt-1 ml-10 text-sm border rounded">
                {term.term_content}
              </div>
            </div>
          ))}
        </div>

        <button
          disabled={isButtonDisabled}
          className={`w-full mt-10 py-3 px-4 text-2xl rounded-md transition-colors duration-300 ${
            isButtonDisabled
              ? "bg-gray-300 text-black cursor-not-allowed"
              : "bg-[#0010A3] text-white hover:bg-blue-700"
          }`}
          onClick={handleContinueRegister}
        >
          동의하고 계속하기
        </button>
      </div>

      <div className="flex-grow"></div>
    </div>
  );
};
