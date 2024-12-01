import { getChatroomByUserId } from "../conversations/chat/getChatroomByUserId.js";

export const isUserInChatroom = async (chatroomId) => {
  try {
    console.log("[isUserInChatroom] 채팅방 아이디는 :", chatroomId);
    const response = await getChatroomByUserId();
    const chatroomExists = response.some(
      (chatroom) => chatroom.id === parseInt(chatroomId)
    );
    console.log(
      "[ChatPage] 사용자가 접속해있는 채팅방에 포함되는지 확인합니다. : ",
      chatroomExists
    );
    if (!chatroomExists) {
      console.error("권한이 없습니다.");
      alert("해당 채팅방에 접근할 권한이 없습니다.");
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    alert("채팅방 정보를 불러오는 중 오류가 발생했습니다.");
    return false;
  }
};
