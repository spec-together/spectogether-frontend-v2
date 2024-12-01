import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { SearchIcon } from "../icons/SearchIcon";
import { LoggedInUserAndIcons } from "./LoggedInUserAndIcons";
import { LoginAndRegister } from "./LoginAndRegister";
import { HeaderBrandLogo } from "./HeaderBrandLogo";
import { useNavigate } from "react-router-dom";

export const SearchHeader = () => {
  const { user } = useUser();
  const [searchField, setSearchField] = useState("");
  const navigate = useNavigate();
  console.log(`[SearchHeader] user $: ${JSON.stringify(user, null, 2)}`);

  const handleHeaderSearch = () => {
    alert(`[구현되지 않은 기능] 검색어 : ${searchField}`);
  };

  const handleLogoClick = () => {
    console.log("[PageHeader] 로고를 클릭해서 메인으로 이동합니다.");
    navigate("/");
  };

  return (
    <div className="flex flex-row items-center w-full h-24 bg-white">
      {/* 헤더 로고 */}
      <div
        className="px-[1.88rem] py-[2rem] bg-transparent"
        onClick={handleLogoClick}
      >
        <HeaderBrandLogo />
      </div>

      {/* 검색창 */}
      <div className="mx-[1.37rem] my-[1.41rem] w-[26rem] flex flex-row border border-[#223B8B] rounded-full bg-transparent">
        <input
          placeholder="검색어를 입력하세요"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="ml-[0.62rem] px-4 py-3 bg-transparent flex-grow font-light text-[1.125rem] focus:outline-none"
        />
        <div
          className="mr-[2rem] flex items-center"
          onClick={handleHeaderSearch}
        >
          <SearchIcon />
        </div>
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
