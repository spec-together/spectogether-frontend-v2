import { handleUserLogout } from "../../api/auth/user/handleUserLogout";
import { useNavigate } from "react-router-dom";
import { setAccessTokenToLocalStorage } from "../../services/setAccessTokenToLocalStorage";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    // Call logout function
    const result = await handleUserLogout();
    setAccessTokenToLocalStorage("");
    if (result) {
      alert("로그아웃 되었습니다.");
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleLogoutClick}
      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
    >
      Logout
    </button>
  );
};
