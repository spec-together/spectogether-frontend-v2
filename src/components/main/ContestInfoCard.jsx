import { useNavigate } from "react-router-dom";

export const ContestInfoCard = ({ contest }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/contest/${contest.contest_id}`)}
      className="flex flex-col w-[18rem] h-[26rem] border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={contest.image_url}
        alt="contest-thumbnail"
        className="w-full h-[18rem] object-cover rounded-t-lg"
      />
      <div className="flex flex-col items-start justify-start p-4">
        <h2 className="text-xl font-semibold text-gray-800">{contest.title}</h2>
        {/* {contest.subtitle && (
          <h3 className="mt-1 font-medium text-gray-600 text-md">
            {contest.subtitle.slice(0, 18)}...
          </h3>
        )} */}
        <p className="mt-2 text-sm text-gray-500">주최: {contest.host}</p>
      </div>
    </div>
  );
};
