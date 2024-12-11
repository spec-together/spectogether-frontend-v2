import { useNavigate } from "react-router-dom";

export const StudyroomCard = ({ studyroom }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStudyroomCardClick = () => {
    console.log(`[StudyroomCard] studyroom_id: ${studyroom.studyroom_id}`);
    navigate(`/studyroom/${studyroom.studyroom_id}`);
  };

  return (
    <div
      className="m-4 w-[800px] border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleStudyroomCardClick}
    >
      <div className="flex gap-4 p-6">
        <div className="flex-shrink-0 w-24 h-24">
          <img
            src={studyroom.profile_image || "/default-study.png"}
            alt="Study room"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-800">
              {studyroom.title}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeColor(studyroom.status)}`}
            >
              {studyroom.status}
            </span>
          </div>
          <p className="mb-3 text-gray-600">{studyroom.subtitle}</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>스터디 지역: {studyroom.area_id}</span>
            <span>목표: {studyroom.target_type}</span>
            <span>시작한 날짜: {formatDate(studyroom.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
