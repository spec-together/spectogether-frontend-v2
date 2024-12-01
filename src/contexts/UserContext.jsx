import { createContext, useState, useContext, useEffect } from "react";
import useUserProfile from "../hooks/useUserProfile";
import { useLocation, useNavigate } from "react-router-dom";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

// TODO : propType 검증 필요
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const { userProfile } = useUserProfile();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userProfile) {
      setUser(() => userProfile);
      console.log(
        `[UserContext] useUserProfile에서 정보를 가지고 왔습니다.\nUserProfile: ${JSON.stringify(userProfile, null, 2)}) User: ${JSON.stringify(user, null, 2)}`
      );
    }
    const timer = setTimeout(() => {
      if (userProfile && location.pathname === "/login") {
        console.log("[UserContext] 로그인 상태라서 메인페이지로 이동");
        navigate("/");
      }
      // if (
      //   !userProfile &&
      //   location.pathname !== "/login" &&
      //   location.pathname !== "/login/local" &&
      //   location.pathname !== "/register"
      // ) {
      //   // 프로필이 없는데, 로그인페이지가 아니거나, 회원가입 페이지가 아니면
      //   // 로그인 페이지로 ㄱㄱ
      //   console.log("[UserContext] 사용자 정보가 없어서 로그인 페이지로 이동");
      //   navigate("/login");
      //   return;
      // }
    }, 400);

    return () => clearTimeout(timer);
  }, [userProfile]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
