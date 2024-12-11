import useUserProfile from "../../hooks/useUserProfile";

export const MyPageEditUserInfo = () => {
  const { userProfile, loading } = useUserProfile();

  return (
    <div>
      {loading ? (
        <span>프로필을 불러오는 중입니다...</span>
      ) : (
        <div className="flex flex-row">
          {/* 프로필 이미지 + Lv, 닉네임 */}
          <div className="flex flex-row items-center">
            <img
              src={userProfile.profile_image}
              alt="profile_image"
              className="w-[10.39rem] h-[10.39rem] rounded-full object-cover"
            />
            <div className="flex flex-col ml-6">
              <span className="text-[#6F6F6F] font-pretendard text-sm font-normal mb-3">
                Lv. {userProfile.spec_level}
              </span>
              <span className="text-black font-pretendard text-[2.625rem] font-extrabold">
                {userProfile.nickname}
              </span>
            </div>
          </div>

          {/* 경력사항 -- TODO: 더보기 생겨야 하고 개수제한 적용해야 함*/}
          <div className="ml-28">
            <div className="inline-block mb-4 text-2xl font-normal border-b border-black font-pretendard">
              경력사항
            </div>

            <div className="flex flex-col space-y-2 w-[27rem]">
              {userProfile?.specs
                ? userProfile.specs.map((spec, index) => (
                    <div
                      key={index}
                      className="flex flex-row items-center w-full"
                    >
                      <span className="text-[#3F3F3F] font-pretendard text-lg font-normal w-26">
                        {spec.created_at.split("T")[0]}
                      </span>
                      <span
                        className={`ml-4 text-2xl font-pretendard font-semibold text-center tracking-wider ${spec.rank === 1 ? "text-red-600" : spec.rank === 2 ? "text-blue-700" : spec.rank === 3 ? "text-emerald-400" : "text-gray-700"}`}
                      >
                        {spec.rank === 4 ? "참여" : spec.rank}
                        {spec.rank === 4 ? "" : "등"}
                      </span>
                      <span className="flex-grow"></span>
                      <span className="text-2xl font-normal text-black font-pretendard">
                        {spec.title}
                      </span>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
