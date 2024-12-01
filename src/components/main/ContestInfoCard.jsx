export const ContestInfoCard = ({ contest }) => {
  return (
    <div className="flex flex-col w-[18rem] h-[26rem] border border-[#99999999] rounded-lg">
      <img
        src={contest.thumbnail}
        alt="contest-thumbnail"
        className="w-full h-[18rem] rounded-t-lg"
      />
      <div className="flex flex-col items-start justify-start pt-2 pl-3">
        <h2 className="text-2xl font-bold font-pretendard">{contest.title}</h2>
        <p className="mt-1 text-lg font-normal font-pretendard">
          {contest.content}
        </p>
      </div>
    </div>
  );
};
