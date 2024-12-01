import { useState, useEffect } from "react";
import { getUserProfile } from "../api/auth/user/getUserProfile.js";
import { reissueToken } from "../api/auth/user/reissueToken.js";

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
        console.log(
          `[useUserProfile] 유저 정보를 가져왔습니다.\n(아마도 비동기라 적용안됬겠지만) UserProfile : ${userProfile}`
        );
        if (!localStorage.getItem("MEET_ACCESS_TOKEN")) {
          console.log(`[useUserProfile] AccessToken이 없습니다.`);
          const result = await reissueToken();
          console.log(
            `[useUserProfile] AccessToken을 재발급 받았습니다. 결과 : ${result}`
          );
        }
      } catch (err) {
        setError(err);
      }
    };
    fetchUserProfile();
    console.log(
      `[useUserProfile] 유저 정보를 가져오려고 시도는 했습니다 (아마?).\n가져왔습니다. 메세지가 없으면 못 가져온거 ~\n(시간 좀 지났으니까 가져왔을 수도) UserProfile : ${userProfile}`
    );
    // setInterval을 사용하여 주기적으로 AccessToken 갱신
    const intervalId = setInterval(
      async () => {
        console.log(
          "[useUserProfile] Interval 시간이 되어서 AccessToken 갱신을 시도합니다."
        );
        try {
          const result = await reissueToken();
          console.log(`[useUserProfile] AccessToken Reissue 결과 : ${result}`);
        } catch (err) {
          console.error("[useUserProfile] AccessToken 재발급 실패", err);
        }
      },
      1000 * 60 * 25
    ); // 25분마다
    console.log(
      "[useUserProfile] Interval을 설정했습니다. 25분마다 AccessToken 갱신을 시도합니다."
    );
    // 컴포넌트가 언마운트되면 setInterval을 클리어
    return () => {
      console.log(
        "[useUserProfile] 컴포넌트가 언마운트 되어서 Interval을 클리어합니다."
      );
      clearInterval(intervalId);
    };
  }, []); // 종속성 배열을 비워서 한번만 가져오도록

  return { userProfile, error };
};

export default useUserProfile;
