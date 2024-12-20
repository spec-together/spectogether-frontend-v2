import { useState } from "react";

export const EventSpecificInfo = ({ contest }) => {
  const [activeTab, setActiveTab] = useState("상세정보");

  const renderContent = () => {
    switch (activeTab) {
      case "상세정보":
        return contest.description;
      // TODO : 하단 내용들 완성해야 함
      case "문의/기대평":
        return "board";
      case "참여신청/취소 안내":
        return "apply";
      default:
        return null;
    }
  };

  return (
    <div className="mt-[4.37rem]">
      <div className="flex flex-row mb-4 space-x-[1.81rem]">
        <button
          className={`tracking-tighter font-pretendard font-bold text-[1.375rem] pb-[0.31rem] border-b border-black ${
            activeTab === "상세정보" ? "text-[#0010A3]" : "text-black"
          }`}
          onClick={() => setActiveTab("상세정보")}
        >
          상세정보
        </button>
        <button
          className={`tracking-tighter font-pretendard font-bold text-[1.375rem] pb-[0.31rem] border-b border-black ${
            activeTab === "문의/기대평" ? "text-[#0010A3]" : "text-black"
          }`}
          onClick={() => setActiveTab("문의/기대평")}
        >
          문의/기대평
        </button>
        <button
          className={`tracking-tighter font-pretendard font-bold text-[1.375rem] pb-[0.31rem] border-b border-black ${
            activeTab === "참여신청/취소 안내" ? "text-[#0010A3]" : "text-black"
          }`}
          onClick={() => setActiveTab("참여신청/취소 안내")}
        >
          참여신청/취소 안내
        </button>
      </div>

      <div className="mt-12 text-lg font-medium tracking-tight font-pretendard">
        {renderContent()}
      </div>
    </div>
  );
};
