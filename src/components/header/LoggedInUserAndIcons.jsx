import { useState, useEffect, useRef } from "react";
import { MessageIcon } from "../icons/MessageIcon";
import { AlarmIcon } from "../icons/AlarmIcon";
import { UserIcon } from "../icons/UserIcon";

import { useNavigate } from "react-router-dom";
import { handleUserLogout } from "../../api/auth/user/handleUserLogout";
import { useUser } from "../../contexts/UserContext";

export const LoggedInUserAndIcons = () => {
  const [isMessageBoxVisible, setIsMessageBoxVisible] = useState(false);
  const navigate = useNavigate();
  const messageBoxRef = useRef(null);
  const { user, logout } = useUser();

  const handleUserIconClick = () => {
    setIsMessageBoxVisible((prev) => !prev);
  };

  const handleNavigateToMyPage = () => {
    navigate("/mypage");
    setIsMessageBoxVisible(false);
  };
  const handleNavigateToMyStudyroomList = () => {
    navigate("/studyroom");
    setIsMessageBoxVisible(false);
  };

  const handleLogout = async () => {
    try {
      const result = await handleUserLogout();
      if (result) {
        localStorage.removeItem("SPECTOGETHER_AT");
        // setUser({});
        logout();
        alert("로그아웃 되었습니다.");
        navigate("/login");
      }
      setIsMessageBoxVisible(false);
    } catch (err) {
      console.error("[LoggedInUserAndIcons] handleLogout ERR : ", err);
    }
  };

  const handleClickOutside = (event) => {
    if (
      messageBoxRef.current &&
      !messageBoxRef.current.contains(event.target)
    ) {
      setIsMessageBoxVisible(false);
    }
  };

  useEffect(() => {
    if (isMessageBoxVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMessageBoxVisible]);

  useEffect(() => {}, [user]);

  return (
    <div className="mr-[1.53rem] flex flex-row items-center relative">
      <div className="flex flex-row items-center justify-center ml-3 space-x-[0.81rem]">
        <AlarmIcon />
        <MessageIcon />
        <div className="relative">
          <div onClick={handleUserIconClick} className="cursor-pointer">
            <UserIcon />
          </div>
          {isMessageBoxVisible && (
            <div
              ref={messageBoxRef}
              className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-300 rounded-md shadow-lg"
            >
              <button
                onClick={handleNavigateToMyPage}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                마이페이지
              </button>
              <button
                onClick={handleNavigateToMyStudyroomList}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                내 스터디룸
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="ml-[0.81rem] flex flex-row items-center space-x-1">
        <span className="font-basic tracking-tighter text-[#5C5C5C] font-medium text-xl">
          환영합니다,
        </span>
        <span className="font-basic tracking-tight text-[#000000] font-semibold text-2xl">
          {user?.name}
        </span>
        <span className="font-basic tracking-tighter text-[#5C5C5C] font-medium text-xl">
          님.
        </span>
      </div>
    </div>
  );
};
