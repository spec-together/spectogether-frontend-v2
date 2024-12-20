import { useState, useEffect } from "react";
import { getUserProfile } from "../../../api/auth/user/getUserProfile.js";
import { reissueToken } from "../../../api/auth/user/reissueToken.js";

const useGetUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true); // 데이터 fetching 시작 시 로딩 상태 활성화
        const profile = await getUserProfile();
        setUserProfile(profile);
        console.log(
          `[useUserProfile] 유저 정보를 가져왔습니다.\n(비동기 처리 후) UserProfile : ${JSON.stringify(profile, null, 2)}`
        );

        if (!localStorage.getItem("SPECTOGETHER_AT")) {
          console.log(`[useUserProfile] AccessToken이 없습니다.`);
          const result = await reissueToken();
          console.log(
            `[useUserProfile] AccessToken을 재발급 받았습니다. 결과 : ${result}`
          );
        }
        setLoading(false); // 데이터 fetching 완료 시 로딩 상태 비활성화
      } catch (err) {
        setError(err);
        setLoading(false); // 오류 발생 시 로딩 상태 비활성화
      }
    };

    fetchUserProfile();
    console.log(
      `[useUserProfile] 유저 정보를 가져오려고 시도했습니다.\n(비동기 처리 전) UserProfile : ${userProfile}`
    );

    // setInterval을 사용하여 주기적으로 AccessToken 갱신
    const intervalId = setInterval(
      async () => {
        console.log(
          "[useGetUserProfile] Interval 시간이 되어 AccessToken 갱신을 시도합니다."
        );
        try {
          const result = await reissueToken();
          console.log(`[useUserProfile] AccessToken Reissue 결과 : ${result}`);
        } catch (err) {
          console.error("[useGetUserProfile] AccessToken 재발급 실패", err);
        }
      },
      1000 * 60 * 25 // 25분마다
    );
    console.log(
      "[useGetUserProfile] Interval을 설정했습니다. 25분마다 AccessToken 갱신을 시도합니다."
    );

    // 컴포넌트가 언마운트되면 setInterval을 클리어
    return () => {
      console.log(
        "[useGetUserProfile] 컴포넌트가 언마운트되어 AT 갱신 Interval을 클리어합니다."
      );
      clearInterval(intervalId);
    };
  }, []); // 종속성 배열을 비워서 한번만 가져오도록

  return { userProfile, error, loading }; // 로딩 상태 반환
};

export default useGetUserProfile;
