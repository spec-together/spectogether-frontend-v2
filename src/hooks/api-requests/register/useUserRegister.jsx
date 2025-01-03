import { useMutation } from "@tanstack/react-query";
import { USER_REGISTER } from "../../../api/config";
import stApi from "../../../api/axiosInterceptor";

const useUserRegister = () => {
  return useMutation({
    mutationFn: async (data) => {
      await stApi.post(USER_REGISTER, data);
    },
  });
};

export default useUserRegister;
