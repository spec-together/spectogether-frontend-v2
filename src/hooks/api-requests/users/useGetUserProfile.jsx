import { useQuery, useQueryClient } from "@tanstack/react-query";
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

    // const {
    //   name,
    //   nickname,
    //   remaining_nickname_changes,
    //   birthdate,
    //   phone,
    //   email,
    //   is_email_verified,
    //   school,
    //   is_school_verified,
    //   profile_image,
    //   spec_level,
    //   manner_score,
    //   created_at,
    // } = response.data.success.user;

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
    const response = await stApi.get(REISSUE_TOKEN);

    const { access_token } = response.data;
    setAccessTokenToLocalStorage(access_token);
    console.log(`
      [reissueToken] AT 재발급 완료 ${access_token}
    `);

    return true;
  } catch (error) {
    console.error("AT 재발급 실패 :", error);
    return false;
  }
};

const useGetUserProfile = () => {
  const {
    data: userProfile,
    error,
    isLoading,
  } = useQuery({
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

  const queryClient = useQueryClient();

  // AccessToken 재발급 및 주기적 갱신
  useQuery({
    queryKey: ["reissueToken"],
    queryFn: reissueToken,
    refetchInterval: 1000 * 60 * 25, // 25분마다 실행
    // enabled: !localStorage.getItem("SPECTOGETHER_AT"),
    onSuccess: (result) => {
      console.log(`[useUserProfile] AccessToken 재발급 성공: ${result}`);
      queryClient.invalidateQueries(["userProfile"]); // 유저 프로필 쿼리 무효화
    },
    onError: (error) => {
      console.error("[useUserProfile] AccessToken 재발급 실패:", error);
    },
  });

  return { userProfile, error, isLoading };
};

export default useGetUserProfile;
