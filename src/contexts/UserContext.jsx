import { createContext, useState, useContext, useEffect } from "react";
import useGetUserProfile from "../hooks/api-requests/users/useGetUserProfile.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

// TODO : propType 검증 필요
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const { data } = useGetUserProfile();

  const login = (data) => {
    setUser({
      user_id: data.user_id,
      name: data.name,
      nickname: data.nickname,
    });
    console.log(
      `[UserContext] login 함수에서 유저 정보를 업데이트했습니다.\nUser: ${JSON.stringify(data, null, 2)})`
    );
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (data) {
      setUser(data);
      console.log(
        `[UserContext] useUserProfile에서 정보를 가지고 왔습니다.\nUserProfile: ${JSON.stringify(data, null, 2)}) User: ${JSON.stringify(user, null, 2)}`
      );
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
