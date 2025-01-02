import { StudyroomInfo } from "../../components/studyroom/StudyroomInfo.jsx";
import { CalendarForStudyroom } from "../../components/studyroom/CalendarForStudyroom.jsx";
import { ChatroomForStudyroom } from "../../components/studyroom/ChatroomForStudyroom.jsx";
import { useParams } from "react-router-dom";
import useGetStudyroomInfo from "../../hooks/api-requests/studyroom/useGetStudyroomInfo.jsx";
import { Loading } from "../Loading.jsx";

export const StudyroomPage = () => {
  const { studyroomId } = useParams();

  const { data, isLoading, isError, error } = useGetStudyroomInfo(studyroomId);

  if (!studyroomId) {
    return <div>Studyroom ID가 없습니다. 올바른 URL을 입력해주세요.</div>;
  }
  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-row w-full h-full mt-12">
      <div className="flex flex-col w-3/5 h-full overflow-y-auto">
        <StudyroomInfo studyroom={data} />
        {/* 하단 캘린더 */}
        <CalendarForStudyroom />
      </div>
      <div className="w-px mx-8 bg-[#7b7b7b]"></div>
      <ChatroomForStudyroom />
    </div>
  );
};
