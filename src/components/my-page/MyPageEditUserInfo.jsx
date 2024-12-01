export const MyPageEditUserInfo = () => {
  const user = {
    profile_image: "https://picsum.photos/id/1011/700/400.jpg",
    level: 1124123,
    nickname: "서울리안",
    specs: [
      {
        date: "2021. 10. 01",
        content: "새싹 졸업",
        rank: 1,
      },
      {
        date: "2022. 10. 01",
        content: "내용 2",
        rank: 2,
      },
      {
        date: "2023. 10. 01",
        content: "내용 3",
        rank: 3,
      },
      {
        date: "2023. 11. 01",
        content: "내용 4",
        rank: 4,
      },
    ],
  };
  return (
    <div className="flex flex-row">
      {/* 프로필 이미지 + Lv, 닉네임 */}
      <div className="flex flex-row items-center">
        <img
          src={user.profile_image}
          alt="profile_image"
          className="w-[10.39rem] h-[10.39rem] rounded-full object-cover"
        />
        <div className="flex flex-col ml-6">
          <span className="text-[#6F6F6F] font-pretendard text-sm font-normal mb-3">
            Lv. {user.level}
          </span>
          <span className="text-black font-pretendard text-[2.625rem] font-extrabold">
            {user.nickname}
          </span>
        </div>
      </div>

      {/* 경력사항 -- TODO: 더보기 생겨야 하고 개수제한 적용해야 함*/}
      <div className="ml-28">
        <div className="inline-block mb-4 text-2xl font-normal border-b border-black font-pretendard">
          경력사항
        </div>

        <div className="flex flex-col space-y-2 w-[22rem]">
          {user?.specs
            ? user.specs.map((spec, index) => (
                <div key={index} className="flex flex-row items-center w-full">
                  <span className="text-[#3F3F3F] font-pretendard text-lg font-normal w-24">
                    {spec.date}
                  </span>
                  <span
                    className={`ml-4 text-2xl w-14 font-pretendard font-semibold text-center tracking-wider ${spec.rank === 1 ? "text-red-600" : spec.rank === 2 ? "text-blue-700" : spec.rank === 3 ? "text-emerald-400" : "text-gray-700"}`}
                  >
                    {spec.rank === 4 ? "참여" : spec.rank}
                    {spec.rank === 4 ? "" : "등"}
                  </span>
                  <span className="flex-grow"></span>
                  <span className="text-2xl font-normal text-black font-pretendard">
                    {spec.content}
                  </span>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
