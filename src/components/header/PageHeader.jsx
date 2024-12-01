import { VerticalLine } from "../VerticalLine";
import { useUser } from "../../contexts/UserContext";
import { HeaderBrandLogo } from "./HeaderBrandLogo";
import { LoggedInUserAndIcons } from "./LoggedInUserAndIcons";
import { LoginAndRegister } from "./LoginAndRegister";
import { useLocation, useNavigate } from "react-router-dom";

export const PageHeader = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const location = useLocation();
  const getPageTitle = () => {
    if (location.pathname.startsWith("/mypage")) return "마이페이지";
    else if (location.pathname.startsWith("/studyroom")) return "스터디룸";
    else return "여기 어떻게 들어왔어요;;";
  };

  const handleLogoClick = () => {
    console.log("[PageHeader] 로고를 클릭해서 메인으로 이동합니다.");
    navigate("/");
  };

  return (
    <div className="flex flex-row items-center w-full h-24 bg-transparent">
      {/* 헤더 로고 */}
      <div
        className="ml-[1.88rem] py-[2rem] bg-transparent"
        onClick={handleLogoClick}
      >
        <HeaderBrandLogo />
      </div>

      {/* | 표시 */}

      <VerticalLine />

      {/* 페이지 info */}
      <div className="ml-1 my-[1.41rem] font-gmarket text-[2rem] font-semibold">
        {getPageTitle()}
      </div>
      {/* 빈공간 채워주기 */}
      <div className="flex-grow"></div>
      {/* 회원정보 */}
      {user?.user_id ? (
        <LoggedInUserAndIcons user={user} />
      ) : (
        <LoginAndRegister />
      )}
    </div>
  );
};
