import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChatSendIcon } from "../icons/ChatSendIcon";
import { ChatsLoadingSkeleton } from "./ChatsLoadingSkeleton";
import io from "socket.io-client";
import { SOCKET_URL_CHAT } from "../../api/config";
import { debounce } from "lodash";

export const ChatInsideStudyroom = ({ studyroomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  const socketRef = useRef(null);
  const messageStartRef = useRef(null);
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (messagesContainerRef.current) {
      const { scrollTop } = messagesContainerRef.current;
      if (hasNextPage && scrollTop === 0) {
        socketRef.current.emit("get-more-messages", {
          studyroom_id: studyroomId,
          cursor: cursor,
        });
      }
    }
  }, [hasNextPage, cursor, studyroomId]);

  const debouncedHandleScroll = useMemo(
    () => debounce(handleScroll, 300),
    [handleScroll]
  );

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", debouncedHandleScroll);
      if (container.scrollHeight === container.clientHeight) {
        handleScroll();
        console.log("스크롤이 생길떄까지 불러옵니다.");
      }
      return () => {
        container.removeEventListener("scroll", debouncedHandleScroll);
        debouncedHandleScroll.cancel(); // 디바운스 타이머 취소
      };
    }
  }, [debouncedHandleScroll]);

  useEffect(() => {
    return () => {
      debouncedHandleScroll.cancel();
    };
  }, [debouncedHandleScroll]);

  useEffect(() => {
    const initSocket = () => {
      const token = localStorage.getItem("SPECTOGETHER_AT");
      const socket = io(SOCKET_URL_CHAT, {
        // extraHeaders: {
        //   Authorization: `Bearer ${token}`,
        // },
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

      // chats, nextCursor, hasNextPage를 반환해줍니다.
      // 각각 상태값에 저장
      socket.on("initial-message", (data) => {
        setMessages(data.chats);
        setCursor(data.nextCursor);
        setHasNextPage(data.hasNextPage);
        setLoading(false);
        console.log("initial-message triggered", data);
        console.log("cursor", data.nextCursor, "hasNextPage", data.hasNextPage);
      });

      // 동일한 로직입니다.
      // chats, nextCursor, hasNextPage를 반환해줍니다.
      // 최상단에 도달하였을 경우 발생
      socket.on("more-messages", (data) => {
        console.log("more-messages triggered");
        // console.log("current message", messages);
        setMessages((prev) => [...data.chats, ...prev]);
        setCursor(data.nextCursor);
        setHasNextPage(data.hasNextPage);
        if (messageStartRef.current) {
          messageStartRef.current.scrollIntoView({ behavior: "smooth" });
        }
      });

      socket.on("user-joined", (data) => {
        console.log("user-joined 이벤트 발생", data);
        setMessages((prev) => [
          ...prev,
          { type: "notice", content: `${data.name}님이 입장하셨습니다.` },
        ]);
      });

      socket.on("user-left", (data) => {
        console.log("user-left 이벤트 발생", data);
        setMessages((prev) => [
          ...prev,
          { type: "notice", content: `${data.name}님이 퇴장하셨습니다.` },
        ]);
      });

      socket.on("message", (data) => {
        console.log("message 이벤트 발생", data);
        setMessages((prev) => [...prev, data]);
        if (messageEndRef.current) {
          messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      });

      socket.on("error", (error) => {
        console.error("socket error", error);
      });

      socket.on("disconnect", () => {
        console.error("socket 연결이 끊어졌습니다.");
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
      <div
        ref={messagesContainerRef}
        className="flex-1 p-3 space-y-4 overflow-y-auto"
      >
        <div ref={messageStartRef}></div>
        {loading ? (
          <ChatsLoadingSkeleton />
        ) : (
          messages.map((msg, idx) => {
            const isMyMessage = msg.is_my_chat;
            if (msg.type === "notice") {
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center text-[#7b7b7b]"
                >
                  {msg.content}
                </div>
              );
            }
            return (
              <div
                key={idx}
                className={`flex flex-col ${isMyMessage ? "items-end" : "items-start"}`}
              >
                <div className="flex flex-row items-end space-x-1">
                  <span
                    className={`text-[#7b7b7b] font-pretendard text-sm ${isMyMessage ? "text-right" : "text-left"}`}
                  >
                    {msg.sender_name}
                  </span>
                  <span
                    className={`text-[#7b7b7b] font-pretendard text-xs ${isMyMessage ? "text-right" : "text-left"}`}
                  >
                    {new Date(msg.created_at).toLocaleTimeString("ko-KR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                </div>
                <div
                  className={`py-2 px-3 text-white font-pretendard max-w-xs break-words ${
                    isMyMessage
                      ? "bg-[#5395E9] rounded-t-lg rounded-bl-lg"
                      : "bg-[#262626] rounded-b-lg rounded-tr-lg"
                  }`}
                >
                  {msg.type === "text" && <span>{msg.content}</span>}
                  {msg.type === "image" && (
                    <img src={msg.content} alt="chat-image" />
                  )}
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
