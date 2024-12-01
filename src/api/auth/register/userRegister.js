import meetApi from "../../axiosInterceptor.js";
import { USER_REGISTER } from "../../config.js";

export const userRegister = async (data) => {
  const { name, email, phone_number, password } = data;

  try {
    await meetApi.post(USER_REGISTER, {
      name,
      email,
      phone_number,
      password,
    });

    // 성공적인 응답 처리
    return { status: true, message: "User created" };
  } catch (error) {
    if (error.response) {
      // 서버가 상태 코드를 반환했지만 요청이 실패한 경우
      if (error.response.status === 409) {
        return { status: false, message: "User already exists" };
      } else {
        return { status: false, message: "User creation failed" };
      }
    } else if (error.request) {
      // 요청이 이루어졌으나 응답을 받지 못한 경우
      return { status: false, message: "No response received from server" };
    } else {
      // 요청을 설정하는 중에 문제가 발생한 경우
      return { status: false, message: "Error occurred: " + error.message };
    }
  }
};
