import { useState, useEffect } from "react";
import CheckBox from "../../components/register/CheckBox.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetTerms } from "../../hooks/api-requests/register/useGetTerms.jsx";

export const TermsAgreePage = () => {
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState({});
  const location = useLocation();
  const { data, error, isLoading } = useGetTerms();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const initialAgreeState = data.reduce((acc, term) => {
        acc[term.term_id] = false;
        return acc;
      }, {});
      setAgreeTerms(initialAgreeState);
      setIsButtonDisabled(
        data.some(
          (term) => term.is_required && !initialAgreeState[term.term_id]
        )
      );
    }
  }, [data, isLoading]);

  const handleAgreeAllChange = () => {
    const newAgreeAll = !agreeAll;
    setAgreeAll(newAgreeAll);
    const newAgreeTerms = Object.keys(agreeTerms).reduce((acc, termId) => {
      acc[termId] = newAgreeAll;
      return acc;
    }, {});
    setAgreeTerms(newAgreeTerms);
    setIsButtonDisabled(
      data.some((term) => term.is_required && !newAgreeTerms[term.term_id])
    );
  };

  const handleAgreeTermChange = (termId) => {
    setAgreeTerms((prev) => {
      const newTerms = {
        ...prev,
        [termId]: !prev[termId],
      };
      const allAgreed = Object.values(newTerms).every(Boolean);
      setAgreeAll(allAgreed);
      setIsButtonDisabled(
        data.some((term) => term.is_required && !newTerms[term.term_id])
      );
      return newTerms;
    });
  };

  const navigate = useNavigate();
  const handleContinueRegister = () => {
    console.log("동의한 약관 : ", agreeTerms);
    console.log("[약관동의페이지] 전달하는 state : ", location.state);
    navigate("/register", {
      state: { ...location.state, agreeTerms },
    });
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
        {isLoading ? (
          <span className="text-2xl">약관을 불러오는 중입니다...</span>
        ) : (
          <>
            <div className="flex flex-row items-center mt-5">
              <CheckBox
                isChecked={agreeAll}
                setIsChecked={handleAgreeAllChange}
              />
              <span className="ml-2 text-2xl font-bold">전체 동의</span>
            </div>
            <div className="w-full h-px my-4 bg-black"></div>

            <div className="flex flex-col items-center w-full space-y-4">
              {data.map((term) => (
                <div key={term.term_id} className="flex flex-col w-full">
                  <div className="flex flex-row items-center w-full">
                    <CheckBox
                      isChecked={agreeTerms[term.term_id]}
                      setIsChecked={() => handleAgreeTermChange(term.term_id)}
                    />
                    <span className="ml-2 text-xl font-semibold">
                      {term.is_required ? "(필수) " : "(선택) "}
                      {term.name}
                      {"  "}[v{term.term_version}]
                    </span>
                    <div className="flex-grow"></div>
                  </div>

                  <div className="p-4 mt-1 ml-10 text-sm border rounded">
                    {term.description}
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
          </>
        )}
      </div>

      <div className="flex-grow"></div>
    </div>
  );
};
