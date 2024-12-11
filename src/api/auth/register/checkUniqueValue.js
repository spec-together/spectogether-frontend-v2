import meetApi from "../../axiosInterceptor.js";
import { CHECK_UNIQUE_EMAIL, CHECK_UNIQUE_PHONE } from "../../config.js";

export const checkUniqueValue = async (type, value) => {
  try {
    let response;
    if (type === "email") {
      response = await meetApi.post(CHECK_UNIQUE_EMAIL, { email: value });
    } else if (type === "phone_number") {
      response = await meetApi.post(CHECK_UNIQUE_PHONE, {
        phone_number: value,
      });
    }

    console.log("Check Unique Response:", response);

    if (response.status === 200) {
      console.log("Unique value!");
      return true;
    }
  } catch (error) {
    if (error?.response) {
      if (error.response.status === 409) {
        return false;
      }
    }
    console.error(
      "Error fetching user profile:",
      error.response ? error.response.data : error.message
    );
    return false;
  }
};
