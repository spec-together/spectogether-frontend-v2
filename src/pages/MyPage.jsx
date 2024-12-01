import { useState } from "react";
import { MyPageEditUserInfo } from "../components/my-page/MyPageEditUserInfo";

export const MyPage = () => {
  const [activeTab, setActiveTab] = useState("회원정보수정");

  const renderContent = () => {
    switch (activeTab) {
      case "회원정보수정":
        return <MyPageEditUserInfo />;
      case "관심목록 수정":
        return "관심목록 수정";
      case "일정 관리":
        return "일정 관리";
      case "스터디 관리":
        return "스터디 관리";
      case "스펙 관리":
        return "스펙 관리";
      default:
        return null;
    }
  };

  const tabs = [
    "회원정보수정",
    "관심목록 수정",
    "일정 관리",
    "스터디 관리",
    "스펙 관리",
  ];

  return (
    <div className="mt-[2.13rem] mx-32">
      <div className="flex flex-row items-stretch w-full mb-4 space-x-[6.38rem]">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tracking-tighter font-pretendard font-bold text-[1.375rem] pb-[0.31rem] border-b border-black flex-1 ${
              activeTab === tab ? "text-[#0010A3]" : "text-black"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-12 text-lg font-medium tracking-tight font-pretendard">
        {renderContent()}
      </div>
    </div>
  );
};
