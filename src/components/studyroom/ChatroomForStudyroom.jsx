import { CallVideoIcon } from "../icons/CallVideoIcon";
import { ChatSeeMoreIcon } from "../icons/ChatSeeMoreIcon";
import { useParams } from "react-router-dom";
import { ChatInsideStudyroom } from "./ChatInsideStudyroom";

export const ChatroomForStudyroom = () => {
  const chatroom = {
    name: "We Are One",
  };
  const { studyroomId } = useParams();

  return (
    <div className="flex flex-col flex-grow mr-11">
      {/* chatroom header */}
      <div className="flex flex-row w-full border-b pb-4 border-[#7b7b7b]">
        <span className="text-2xl font-medium font-pretendard">
          {chatroom.name}
        </span>
        <div className="flex-grow"></div>
        <div className="flex flex-row items-center justify-center mr-4 space-x-3">
          <CallVideoIcon />
          <ChatSeeMoreIcon />
        </div>
      </div>
      {/* chatroom body */}
      <ChatInsideStudyroom studyroomId={studyroomId} />
    </div>
  );
};
