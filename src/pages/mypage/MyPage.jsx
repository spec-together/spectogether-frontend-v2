import { useState } from "react";
import { MyPageEditUserInfo } from "../../components/mypage/MyPageEditUserInfo.jsx";
import { MyStudyroomListPage } from "./MyStudyroomListPage.jsx";
import { MyTodoList } from "../../components/mypage/MyTodoList.jsx";
import { MyPageSpecList } from "./MyPageSpecList.jsx";
import { useNavigate } from "react-router-dom";

export const MyPage = () => {
  const [activeTab, setActiveTab] = useState("회원정보수정");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "회원정보수정":
        return <MyPageEditUserInfo />;
      case "투두리스트 조회":
        return <MyTodoList />;
      case "일정 관리":
        return "일정 관리";
      case "스터디 관리":
        return <MyStudyroomListPage />;
      case "스펙 관리":
        // "스펙 관리" 탭 클릭 시 /specs 경로로 이동
        navigate("/specs");
        return null;
      case "내 문의사항":
        return "내 문의사항";
      default:
        return null;
    }
  };

  const tabs = [
    "회원정보수정",
    "투두리스트 조회",
    "일정 관리",
    "스터디 관리",
    "스펙 관리",
    "내 문의사항",
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
