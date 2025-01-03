import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import stApi from "../../../api/axiosInterceptor";
import { GET_USER_PROFILE, REISSUE_TOKEN } from "../../../api/config";
import { setAccessTokenToLocalStorage } from "../../../services/setAccessTokenToLocalStorage";

const getUserProfile = async () => {
  try {
    const response = await stApi.get(GET_USER_PROFILE);
    console.log(
      "[getUserProfile] 사용자 프로필을 가지고 옵니다:",
      response.data
    );
    return response.data.success.user;
  } catch (error) {
    console.error(
      "[getUserProfile] 사용자 프로필을 가져오는데 실패했습니다:",
      error
    );
    return null;
  }
};

const reissueToken = async () => {
  try {
    console.log("[reissueToken] 토큰 재발급 요청 중...");
    const response = await stApi.get(REISSUE_TOKEN, { withCredentials: true });
    const { access_token } = response.data.success;
    setAccessTokenToLocalStorage(access_token);
    console.log(`[reissueToken] AT 재발급 완료 ${access_token}`);
    return true;
  } catch (error) {
    console.error("AT 재발급 실패 :", error);
    return false;
  }
};

const useGetUserProfile = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 25, // 25분
    onSuccess: (data) => {
      console.log(
        `[useUserProfile] 유저 정보를 가져왔습니다.\nUserProfile: ${JSON.stringify(data, null, 2)}`
      );
    },
    onError: (error) => {
      console.error("[useUserProfile] 유저 정보 가져오기 실패:", error);
    },
  });

  useEffect(() => {
    const interval = setInterval(
      async () => {
        const success = await reissueToken();
        console.log("[useGetUserProfile] AT 재발급 결과:", success);
        if (success) {
          queryClient.invalidateQueries(["userProfile"]);
          console.log("[useGetUserProfile] AT 재발급 후 유저 정보 다시 가져옴");
        }
      },
      1000 * 60 * 25 // 25분마다 실행
      // 1000 * 5 // 15초마다 실행
    );

    return () => {
      console.log("[useGetUserProfile] AT 재발급 interval 해제");
      clearInterval(interval);
    };
  }, [queryClient]);

  return { data, error, isLoading };
};

export default useGetUserProfile;
