import meet from "./checkAuthorized.js";
import { GET_CHAT_BY_CHATROOM_ID } from "../../config.js";

export const getMessageInChatroomById = async (chatroomId) => {
  try {
    const response = await meet.get(GET_CHAT_BY_CHATROOM_ID, {
      params: { chatroom_id: chatroomId },
    });

    console.log("[getMessageInChatroomById] GET chat:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching chatroom:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};
