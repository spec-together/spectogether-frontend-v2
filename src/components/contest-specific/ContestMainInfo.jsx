export const ContestMainInfo = ({ contest }) => {
  const contestDetails = [
    { label: "신청기간", value: contest.application_period },
    { label: "참여기간", value: contest.participation_period },
    { label: "장소", value: contest.location },
    // 필요한 경우 더 추가 가능합니다.
  ];

  return (
    <div className="flex flex-row h-[18.12rem]">
      {/* 공모전 썸네일 / 제목, 부제목 / 신청기간, 참여기간, 장소 */}
      <img
        className="w-[12.81rem] h-full"
        src={contest.thumbnail}
        alt="contest-thumbnail"
      />

      {/* 상세내용 컨테이너 */}
      <div className="ml-[1.88rem] w-[25.69rem] h-full flex flex-col">
        {/* 제목+부제목 */}
        <div className="flex flex-col">
          <h1 className="text-5xl font-semibold tracking-tight font-pretendard">
            {contest.title}
          </h1>
          <p className="mt-1 text-[1.375rem] font-normal text-[#696969] tracking-tighter">
            {contest.subtitle}
          </p>
        </div>
        {/* 일자들 */}
        <div className="mt-[1.87rem] space-y-[0.63rem] w-full flex flex-col">
          {contestDetails.map((detail, index) => (
            <div key={index} className="flex flex-row justify-between w-full">
              <h2 className="font-pretendard text-[1.375rem] font-semibold tracking-tighter">
                {detail.label}
              </h2>
              <p className="font-pretendard text-[1.375rem] tracking-[-0.1375rem] font-normal">
                {detail.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex-grow"></div>

        <div className="w-full h-12 items-stretch space-x-[0.94rem] flex flex-row">
          {/* px-[2.31rem] py-[0.63rem] px-[2.31rem] py-[0.63rem] */}
          <button className="flex-grow w-full font-pretendard text-2xl text-white font-medium rounded-lg bg-[#0010A3] border border-[#0010A3]">
            신청하기
          </button>
          <button className="flex-grow w-full font-pretendard text-2xl font-medium rounded-lg bg-white border border-[#0010A3]">
            스터디 만들기
          </button>
        </div>
      </div>
    </div>
  );
};
