import { StudyroomInfo } from "../components/studyroom/StudyroomInfo";
import { CalendarForStudyroom } from "../components/studyroom/CalendarForStudyroom";
import { ChatroomForStudyroom } from "../components/studyroom/ChatroomForStudyroom";

export const StudyroomPage = () => {
  return (
    <div className="flex flex-row w-full h-full mt-12">
      <div className="flex flex-col w-3/5 h-full overflow-y-auto">
        <StudyroomInfo />
        {/* 하단 캘린더 */}
        <CalendarForStudyroom />
      </div>
      <div className="w-px mx-8 bg-[#7b7b7b]"></div>
      <ChatroomForStudyroom />
    </div>
  );
};
