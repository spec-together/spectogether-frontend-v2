import meetApi from "../../axiosInterceptor.js";
import { GET_TERMS } from "../../config.js";

export const getTerms = async () => {
  return [
    {
      term_id: 1,
      term_name: "이용약관",
      term_content: "이용약관 내용",
      is_required: true,
    },
    {
      term_id: 2,
      term_name: "개인정보 처리방침",
      term_content: "개인정보 처리방침 내용",
      is_required: true,
    },
    {
      term_id: 3,
      term_name: "위치기반 서비스 이용약관",
      term_content: "위치기반 서비스 이용약관 내용",
      is_required: false,
    },
  ];

  try {
    const response = await meetApi.get(GET_TERMS);

    console.log("Terms Response:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user profile:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};
