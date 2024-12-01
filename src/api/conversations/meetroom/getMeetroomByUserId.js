import axios from "axios";
import { GET_MEETROOM_BY_USER_ID } from "../../config.js";

export const getMeetroomByUserId = async () => {
  try {
    const response = await axios.get(GET_MEETROOM_BY_USER_ID);

    console.log("Meetroom Response:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching meetroom:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};
