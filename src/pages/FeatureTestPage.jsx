import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";
import { createChatroom } from "../api/conversations/chat/createChatroom.js";
import { createMeetroom } from "../api/conversations/meetroom/createMeetroom.js";
import { LogoutButton } from "../components/login/LogoutButton.jsx";

export const FeatureTestPage = () => {
  const { user } = useUser();
  // const navigate = useNavigate();
  // const { userProfile } = useUserProfile();
  const handleGetProfile = async () => {
    alert(`ID: ${user.user_id}\nNAME : ${user.username}`);
  };

  const handleCreateChatroom = async () => {
    // TODO : name 변경 필요
    const name = prompt("채팅방 이름을 입력하세요: ");
    if (!name) {
      alert("채팅방 이름을 입력하셔야 합니다.");
      return;
    }
    try {
      const chatroom = await createChatroom({ name });
      console.log(chatroom);
      alert(
        `Chatroom ID: ${chatroom.chatroom_id}\nUser Chatroom ID: ${chatroom.user_chatroom_id}`
      );
    } catch (error) {
      console.error(error);
      alert("채팅방 생성에 실패했습니다.");
    }
  };

  const handleCreateMeetroom = async () => {
    // TODO : name 변경 필요
    const meetroom = await createMeetroom({});
    console.log(meetroom);
    alert(
      `Meetroom ID: ${meetroom.meetroom_id}\nUser Meetroom ID: ${meetroom.user_meetroom_id}`
    );
  };

  // useEffect(() => {
  //   if (!user?.user_id) {
  //     console.log(
  //       "메인페이지: 사용자 정보가 없어서 로그인 페이지로 이동합니다."
  //     );
  //     navigate("/login");
  //   }
  // }, [user, navigate]);
  // TEST

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-md mx-auto overflow-hidden bg-white shadow-2xl rounded-xl">
        <div className="p-8">
          <div className="mb-1 text-sm font-semibold tracking-wide text-indigo-500 uppercase">
            Welcome Back
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            {user.username}
          </h2>
          <p className="mb-6 text-gray-600">User ID: {user.user_id}</p>

          <div className="space-y-4">
            <button
              onClick={handleGetProfile}
              className="w-full px-4 py-2 text-white transition duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              View Profile
            </button>

            <button
              onClick={handleCreateChatroom}
              className="w-full px-4 py-2 text-white transition duration-200 bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              Create Chatroom
            </button>

            <Link
              to="/chat"
              className="block px-4 py-2 text-center text-white transition duration-200 bg-green-600 rounded-lg hover:bg-green-700"
            >
              Go to Chat
            </Link>

            <button
              onClick={handleCreateMeetroom}
              className="w-full px-4 py-2 text-white transition duration-200 bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              Create Meetroom
            </button>

            <Link
              to="/meet"
              className="block px-4 py-2 text-center text-white transition duration-200 bg-green-600 rounded-lg hover:bg-green-700"
            >
              Go to Meet
            </Link>

            <Link
              to="/login"
              className="block px-4 py-2 text-center text-white transition duration-200 bg-gray-600 rounded-lg hover:bg-gray-700"
            >
              Back to Login
            </Link>

            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};
