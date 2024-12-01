import { useEffect, useState } from "react";
import { getTerms } from "../../api/auth/register/getTerms.js";
import CheckBox from "./CheckBox.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import MainLogo from "../login/MainLogo.jsx";

export const TermsPage = () => {
  const [terms, setTerms] = useState([]); // 초기 상태는 빈 배열
  const [agreeAll, setAgreeAll] = useState(false); // 전체 동의 상태
  const [agreeTerms, setAgreeTerms] = useState({}); // 각 약관 동의 상태
  const location = useLocation();
  const [prevState, setPrevState] = useState("");

  useEffect(() => {
    console.log("location : ", location.state);
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

  // 전체 동의 상태 변경
  const handleAgreeAllChange = () => {
    const newAgreeAll = !agreeAll;
    setAgreeAll(newAgreeAll);
    const newAgreeTerms = Object.keys(agreeTerms).reduce((acc, termId) => {
      acc[termId] = newAgreeAll; // 전체 동의 상태에 맞춰 각 약관의 동의 상태 변경
      return acc;
    }, {});
    setAgreeTerms(newAgreeTerms);
  };

  // 각 약관 동의 상태 변경
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

  // 버튼 활성화 여부: 필수 약관이 동의되어야만 활성화
  const isButtonDisabled = Object.values(agreeTerms).some((isAgreed, index) => {
    return terms[index].is_required && !isAgreed; // 필수 약관 중 하나라도 동의하지 않으면 버튼 비활성화
  });

  const navigate = useNavigate();
  const handleContinueRegister = () => {
    console.log("동의한 약관 : ", agreeTerms);
    console.log("prevState before continue : ", prevState);
    navigate("/register", { state: { email: prevState, agreeTerms } });
  };

  return (
    <div className="min-h-screen p-10 bg-bg-primary">
      <h1 className="mb-4 font-bold text-left text-9xl font-gmarket">
        <MainLogo />
      </h1>
      <p className="mb-8 text-lg text-left font-gmarket">
        서비스 이용을 위해 약관 동의가 필요합니다.
      </p>
      <div className="flex items-center mb-4">
        <CheckBox isChecked={agreeAll} setIsChecked={handleAgreeAllChange} />
        <label className="text-lg">전체 동의</label>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {terms.map((term) => (
          <div
            key={term.term_id}
            className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
          >
            <div className="flex items-center mb-4">
              <CheckBox
                isChecked={agreeTerms[term.term_id]}
                setIsChecked={() => handleAgreeTermChange(term.term_id)}
              />
              <label className="text-lg">
                {term.title} {term.is_required ? "(필수)" : "(선택)"}
              </label>
            </div>
            <p className="mt-2 text-gray-600">{term.content}</p>
          </div>
        ))}
      </div>
      <button
        disabled={isButtonDisabled}
        className={`w-full mt-8 px-4 py-2 rounded-lg font-gmarket transition-colors duration-300 ${
          isButtonDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        onClick={handleContinueRegister}
      >
        동의하고 계속 진행
      </button>
    </div>
  );
};
