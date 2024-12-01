import meetApi from "../../axiosInterceptor.js";
import { GET_USER_PROFILE } from "../../config.js";

export const getUserProfile = async () => {
  try {
    const response = await meetApi.get(GET_USER_PROFILE);

    // TODO: response가 무엇을 가지고 오는지 확인
    console.log(
      "[getUserProfile] 사용자 프로필을 가지고 옵니다:",
      response.data
    );
    const { username, user_id } = response.data;

    return { username, user_id }; // username을 반환
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("User not authenticated");
      return null;
    }
    console.error(
      "Error fetching user profile:",
      error.response ? error.response.data : error.message
    );
    return null; // 오류 발생 시 null 반환
  }
};
