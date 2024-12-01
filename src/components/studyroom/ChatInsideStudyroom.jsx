import { useEffect, useRef, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { ChatSendIcon } from "../icons/ChatSendIcon";
import { ChatsLoadingSkeleton } from "./ChatsLoadingSkeleton";

export const ChatInsideStudyroom = ({ studyroomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const socketRef = useRef(null);

  // const { user } = useUser();
  const user = {
    id: 1,
    name: "경운",
  };
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // 채팅방 메시지를 가져오는 API 호출
        const data = [
          { id: 1, sender_id: 1, sender_name: "경운", message: "안녕하세요" },
          {
            id: 2,
            sender_id: 2,
            sender_name: "Count on You",
            message: "싫어요",
          },
          {
            id: 3,
            sender_id: 1,
            sender_name: "경운",
            message: "반가워요 ,,,,",
          },
          {
            id: 4,
            sender_id: 2,
            sender_name: "Count on You",
            message: "저리가요",
          },
          { id: 5, sender_id: 1, sender_name: "경운", message: "앗 ,," },
          {
            id: 6,
            sender_id: 2,
            sender_name: "Count on You",
            message: "인- 수 님 !!",
          },
          { id: 7, sender_id: 1, sender_name: "경운", message: "새싹 화이팅" },
          { id: 8, sender_id: 2, sender_name: "Count on You", message: "네.." },
        ];
        setMessages(data);
        setLoading(false);
      } catch (error) {
        console.error("[ChatInsideStudyroom] error : ", error);
      }
    };
    fetchMessages();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && socketRef.current) {
      const message = {
        studyroom_id: studyroomId,
        sender_id: user.id,
        sender_name: user.username,
        text: newMessage,
      };
      socketRef.current.emit("message", message);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col flex-grow w-full">
      <div className="flex flex-col mx-3 mt-7">
        {loading ? (
          <ChatsLoadingSkeleton />
        ) : (
          messages.map((msg) => {
            const isMyMessage = msg.sender_id === user.id;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMyMessage ? "items-end" : "items-start"}`}
              >
                <span
                  className={`text-[#7b7b7b] font-pretendard text-sm ${isMyMessage ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender_name}
                </span>
                <div
                  className={`h-10 py-2 px-3 text-white font-pretendard ${isMyMessage ? "bg-[#5395E9] rounded-t-lg rounded-bl-lg" : "bg-[#262626] rounded-b-lg rounded-tr-lg"}`}
                >
                  <span>{msg.message}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex-grow"></div>

      <div className="flex flex-row w-full h-12 border rounded-lg border-[#7b7b7b]">
        <input
          placeholder="메시지를 입력하세요"
          className="w-full px-3 py-2 bg-transparent focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="flex w-8 h-8 m-2 p-2 rounded items-center justify-center bg-[#5395E9] text-white font-pretendard"
        >
          <ChatSendIcon />
        </button>
      </div>
    </div>
  );
};
