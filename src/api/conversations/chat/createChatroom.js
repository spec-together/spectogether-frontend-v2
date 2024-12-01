import meetApi from "../../axiosInterceptor.js";
import { CREATE_CHATROOM } from "../../config.js";

export const createChatroom = async (chatroom) => {
  try {
    const response = await meetApi.post(CREATE_CHATROOM, chatroom);

    console.log("Chatroom Response:", response.data);
    const { user_chatroom_id, chatroom_id } = response.data;
    return { user_chatroom_id, chatroom_id };
  } catch (error) {
    console.error(
      "Error creating chatroom:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};
