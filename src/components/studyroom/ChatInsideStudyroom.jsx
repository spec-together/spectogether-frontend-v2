import { useEffect, useRef, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { ChatSendIcon } from "../icons/ChatSendIcon";
import { ChatsLoadingSkeleton } from "./ChatsLoadingSkeleton";
import io from "socket.io-client";
import { SOCKET_URL_CHAT } from "../../api/config";

export const ChatInsideStudyroom = ({ studyroomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const socketRef = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const initSocket = () => {
      const token = localStorage.getItem("SPECTOGETHER_AT");
      const socket = io(SOCKET_URL_CHAT, {
        auth: {
          token: `Bearer ${token}`,
        },
      });
      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("socket connected");
        socket.emit("user-entered", { studyroom_id: studyroomId });
        socket.emit("user-join", { studyroom_id: studyroomId });
        console.log("user_entered 이벤트 발송 완료");
      });

      socket.on("initial-message", (data) => {
        setMessages(data.chats);
        setLoading(false);
        console.log("initial-message 이벤트 발생", data);
      });

      socket.on("user-joined", (data) => {
        console.log("user-joined 이벤트 발생", data);
      });

      socket.on("user-left", (data) => {
        console.log("user-left 이벤트 발생", data);
      });

      socket.on("message-text", (data) => {
        console.log("message-text 이벤트 발생", data);
        setMessages((prev) => [...prev, data]);
      });

      // TODO : 이미지 메시지 처리
      socket.on("message-image", (data) => {
        console.log("message-image 이벤트 발생", data);
      });

      socket.on("error", (error) => {
        console.error("socket error", error);
      });

      socket.on("disconnect", () => {
        console.log("socket disconnected");
      });
    };

    initSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("user-leave", { studyroom_id: studyroomId });
        socketRef.current.disconnect();
        console.log("socket disconnected");
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && socketRef.current) {
      const message = {
        type: "text",
        studyroom_id: studyroomId,
        content: newMessage,
      };
      socketRef.current.emit("message", message);
      setNewMessage("");
    }
  };
  // console.error(user.user_id);

  return (
    <div className="flex flex-col flex-grow w-full h-full">
      {/* 메시지 목록 영역 */}
      <div className="flex-1 p-3 space-y-4 overflow-y-auto">
        {loading ? (
          <ChatsLoadingSkeleton />
        ) : (
          messages.map((msg, idx) => {
            const isMyMessage = msg.is_my_chat;
            return (
              <div
                key={idx}
                className={`flex flex-col ${isMyMessage ? "items-end" : "items-start"}`}
              >
                <span
                  className={`text-[#7b7b7b] font-pretendard text-sm ${isMyMessage ? "text-right" : "text-left"}`}
                >
                  {msg.sender_name}
                </span>
                <div
                  className={`py-2 px-3 text-white font-pretendard max-w-xs break-words ${
                    isMyMessage
                      ? "bg-[#5395E9] rounded-t-lg rounded-bl-lg"
                      : "bg-[#262626] rounded-b-lg rounded-tr-lg"
                  }`}
                >
                  <span>{msg.content}</span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messageEndRef}></div>
      </div>

      {/* 메시지 입력 영역 */}
      <div className="flex flex-row w-full h-12 border-t border-[#7b7b7b] p-2">
        <input
          placeholder="메시지를 입력하세요"
          className="flex-grow px-3 py-2 bg-transparent focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 flex items-center justify-center w-8 h-8 rounded bg-[#5395E9] text-white"
        >
          <ChatSendIcon />
        </button>
      </div>
    </div>
  );
};
