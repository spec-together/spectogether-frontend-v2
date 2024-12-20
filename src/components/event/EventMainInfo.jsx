import { useState } from "react";
import { CreateStudyroomModal } from "../modals/CreateStudyroomModal";

export const ContestMainInfo = ({ contest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contestDetails = [
    {
      label: "신청기간",
      value: `${contest.application_start_date.split("T")[0]} ~ ${contest.application_end_date.split("T")[0]}`,
    },
    {
      label: "참여기간",
      value: `${contest.start_date.split("T")[0]} ~ ${contest.end_date.split("T")[0]}`,
    },
    // { label: "장소", value: "" },
    {
      label: "진행방식",
      value: contest.online_offline_type === "online" ? "온라인" : "오프라인",
    },
    { label: "주최", value: contest.host },
    // 필요한 경우 더 추가 가능합니다.
  ];

  return (
    <div className="flex flex-row h-[25rem]">
      {/* 공모전 썸네일 / 제목, 부제목 / 신청기간, 참여기간, 장소 */}
      <img
        className="object-contain h-full"
        src={contest.image_url}
        alt="contest-thumbnail"
      />

      {/* 상세내용 컨테이너 */}
      <div className="ml-[1.88rem] w-[30rem] h-full flex flex-col">
        {/* 제목+부제목 */}
        <div className="flex flex-col h-2/5">
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
          <button
            onClick={() => {
              alert("신청 사이트로 이동합니다.");
              window.open(contest.application_url);
            }}
            className="flex-grow w-full font-pretendard text-2xl text-white font-medium rounded-lg bg-[#0010A3] border border-[#0010A3]"
          >
            신청하기
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-grow w-full font-pretendard text-2xl font-medium rounded-lg bg-white border border-[#0010A3]"
          >
            스터디 만들기
          </button>
        </div>
      </div>
      <CreateStudyroomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        autofill={{
          targetType: "공모전",
          targetId: contest.contest_id,
          targetTitle: contest.title,
        }}
      />
    </div>
  );
};
