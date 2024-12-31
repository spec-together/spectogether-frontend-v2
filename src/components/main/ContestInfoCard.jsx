import { useNavigate } from "react-router-dom";

// export const ContestInfoCard = ({ contest }) => {
//   const navigate = useNavigate();

//   return (
//     <div
//       onClick={() => navigate(`/contest/${contest.event_id}`)}
//       className="flex flex-col w-[18rem] h-[26rem] border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//     >
//       <img
//         src={contest.poster_image_url}
//         alt="contest-thumbnail"
//         className="w-full h-[18rem] object-cover rounded-t-lg"
//       />
//       <div className="flex flex-col items-start justify-start p-4">
//         <h2 className="text-xl font-semibold text-gray-800">{contest.title}</h2>
//         {/* {contest.subtitle && (
//           <h3 className="mt-1 font-medium text-gray-600 text-md">
//             {contest.subtitle.slice(0, 18)}...
//           </h3>
//         )} */}
//         <p className="mt-2 text-sm text-gray-500">주최: {contest.host_id}</p>
//       </div>
//     </div>
//   );
// };

export const ContestInfoCard = ({ contest }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const options = { month: "2-digit", day: "2-digit", weekday: "short" };
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", options);
  };

  return (
    <div
      onClick={() => navigate(`/contest/${contest.event_id}`)}
      className="flex flex-col overflow-hidden transition-shadow border border-gray-200 rounded-lg w-72 h-96 hover:shadow-lg"
    >
      {/* 이미지 섹션 */}
      <div className="w-full overflow-hidden">
        <img
          src={contest.poster_image_url}
          alt={contest.title}
          className="object-cover w-full"
        />
        {/* <button className="absolute p-2 top-3 right-3">
          <div className="flex items-center gap-1 text-gray-600">
            <span>♡</span>
            {likes > 0 && <span>{likes}</span>}
          </div>
        </button> */}
      </div>

      {/* 텍스트 섹션 */}
      <div className="flex flex-col w-full gap-2 p-4">
        <h3 className="text-base font-medium line-clamp-2">{contest.title}</h3>

        <div className="flex flex-row items-center justify-between w-full gap-2">
          <span className="text-sm text-emerald-600">
            {contest.is_online ? "온라인" : "대면"}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(contest.starts_at)}
          </span>
        </div>
      </div>
    </div>
  );
};
