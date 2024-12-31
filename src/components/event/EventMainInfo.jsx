import { useEffect, useState } from "react";
import { CreateStudyroomModal } from "../modals/CreateStudyroomModal";

export const EventMainInfo = ({ contest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contestDetails, setContestDetails] = useState([]);
  useEffect(() => {
    if (!contest) return;
    const formatDate = (dateString) => {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      return new Date(dateString).toLocaleDateString("ko-KR", options);
    };

    setContestDetails([
      {
        label: "신청기간",
        value: `${formatDate(contest.application_start_date)} ~ ${formatDate(contest.application_end_date)}`,
      },
      {
        label: "참여기간",
        value: `${formatDate(contest.starts_at)} ~ ${formatDate(contest.ends_at)}`,
      },
      {
        label: "장소",
        value: contest.location,
      },
      {
        label: "진행방식",
        value: contest.is_online ? "온라인" : "오프라인",
      },
      { label: "주최", value: contest.host_id },
    ]);
  }, [contest]);

  return (
    <div className="flex flex-row h-[25rem]">
      <img
        className="object-contain h-full"
        src={contest.poster_image_url}
        alt="contest-thumbnail"
      />

      <div className="ml-[1.88rem] w-[40rem] h-full flex flex-col">
        <div className="flex flex-col h-2/5">
          <h1 className="text-4xl font-semibold tracking-tight font-pretendard">
            {contest.title}
          </h1>
          <p className="mt-1 text-2xl font-normal text-[#696969] tracking-tighter">
            {contest.subtitle}
          </p>
        </div>

        <div className="mt-[1.87rem] space-y-2 w-full flex flex-col">
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

        <div className="w-full h-12 mt-3 items-stretch space-x-[0.94rem] flex flex-row">
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
          targetId: contest.event_id,
          targetTitle: contest.title,
        }}
      />
    </div>
  );
};
