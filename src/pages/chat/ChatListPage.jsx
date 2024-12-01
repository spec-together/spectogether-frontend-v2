import { useEffect, useState } from "react";
import { getChatroomByUserId } from "../../api/conversations/chat/getChatroomByUserId.js";
import { useNavigate } from "react-router-dom";
import { createChatroom } from "../../api/conversations/chat/createChatroom.js";

export const ChatListPage = () => {
  const [myChatroom, setMyChatroom] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 내비게이션 기능을 얻습니다.

  const [noChatroom, setNoChatroom] = useState(false);

  useEffect(() => {
    const fetchChatrooms = async () => {
      const chatrooms = await getChatroomByUserId();
      // console.log("[ChatListPage] 현재 가입한 채팅방은 ~ : ", chatrooms);
      if (!chatrooms) {
        console.error("[ChatListPage] 채팅방을 불러오는데 실패했습니다.");
      }
      if (chatrooms) {
        setMyChatroom(chatrooms);
        if (chatrooms.length === 0) {
          console.log("[ChatListPage] 현재 가입한 채팅방이 없습니다.");
          setNoChatroom(true);
        }
      }
    };

    fetchChatrooms();
  }, []);

  // 채팅방 클릭 시 호출되는 함수
  const handleChatroomClick = (chatroom) => {
    navigate(`/chat/${chatroom.id}`, { state: { name: chatroom.name } }); // 해당 채팅방으로 이동
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

  return (
    <div className="flex flex-col items-center bg-bg-primary min-h-screen">
      <h1 className="font-gmarket text-2xl font-bold text-center mt-6 p-4 text-gray-800">
        Chat Page
      </h1>
      <div className="w-full max-w-md">
        {noChatroom && (
          <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-800">
            <h2 className="font-gmarket text-lg">
              현재 가입한 채팅방이 없습니다.
            </h2>
            <button
              onClick={handleCreateChatroom}
              className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition"
            >
              채팅방 생성하기
            </button>
          </div>
        )}
        {myChatroom.map((chatroom) => (
          <div
            key={chatroom.id}
            onClick={() => handleChatroomClick(chatroom)} // 클릭 시 채팅방 열기
            className="my-3 p-4 cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <h2 className="font-gmarket text-lg text-gray-800">
              {chatroom.name}
            </h2>
            <p className="text-gray-600">채팅방 ID: {chatroom.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
