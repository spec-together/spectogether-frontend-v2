import useGetUserProfile from "../../hooks/api-requests/users/useGetUserProfile.jsx";
import { Loading } from "../../pages/Loading";

export const MyPageEditUserInfo = () => {
  const { data, isLoading } = useGetUserProfile();

  console.log(data, isLoading);

  /*

  UserProfile: {
  "user_id": "Oj9gwCE4XALhb3cAA2cVQNeiBVrgOxQgO7GTDpTwC8c",
  "name": "박경운",
  "nickname": "RRGQ",
  "remaining_nickname_changes": 2,
  "birthdate": "2001-12-09",
  "phone": "01093448560",
  "email": "skycloud@kakao.com",
  "is_email_verified": false,
  "profile_image": "https://picsum.photos/200",
  "spec_level": 1,
  "manner_score": 5000,
  "created_at": "2024-12-31T09:24:09.283Z",
  "areas": [
    {
      "area_id": 1,
      "sequence": 1,
      "sido": "서울특별시",
      "gungu": "마포구"
    },
    {
      "area_id": 2,
      "sequence": 1,
      "sido": "서울특별시",
      "gungu": "양천구"
    },
    {
      "area_id": 3,
      "sequence": 1,
      "sido": "서울특별시",
      "gungu": "서대문구"
    }
  ],
  "specs": []
}) User: {}

*/

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-row">
          {/* 프로필 이미지 + Lv, 닉네임 */}
          <div className="flex flex-row items-center">
            <img
              src={data.profile_image}
              alt="profile_image"
              className="w-[10.39rem] h-[10.39rem] rounded-full object-cover"
            />
            <div className="flex flex-col ml-6">
              <span className="text-[#6F6F6F] font-pretendard text-sm font-normal mb-3">
                Lv. {data.spec_level}
              </span>
              <span className="text-black font-pretendard text-[2.625rem] font-extrabold">
                {data.nickname}
              </span>
              닉네임 변경 가능 횟수 : {data.remaining_nickname_changes}
            </div>
          </div>

          {data.specs &&
            data.specs.map((spec, index) => (
              <div key={index}>
                <div>{spec.title}</div>
              </div>
            ))}

          {/* 경력사항 -- TODO: 더보기 생겨야 하고 개수제한 적용해야 함*/}
          <div className="ml-28">
            <div className="inline-block mb-4 text-2xl font-normal border-b border-black font-pretendard">
              경력사항
            </div>

            <div className="flex flex-col space-y-2 w-[27rem]">
              {data?.specs
                ? data.specs.map((spec, index) => (
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
