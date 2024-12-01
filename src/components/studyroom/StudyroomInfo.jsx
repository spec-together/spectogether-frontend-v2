import { TodoListForStudyroom } from "./TodoListForStudyroom";

export const StudyroomInfo = () => {
  const studyroom = {
    image: "https://picsum.photos/200/300",
    title: "살려줘요 강사님",
    description: "스터디룸 설명",
  };
  return (
    <div className="flex flex-row h-64 ml-11">
      <img
        src={studyroom.image}
        alt="studyroom-image"
        className="object-cover w-48 h-full"
      />
      <div className="flex flex-col h-full ml-10 mr-20">
        {/* 스터디룸 제목 컨테이너 */}
        <div className="flex flex-row items-end flex-none mb-8">
          <span className="text-5xl font-semibold leading-none font-gmarket">
            {studyroom.title}
          </span>
          <span className="ml-4 text-[1.75rem] font-gmarket opacity-70 leading-tight">
            스터디룸 입니다.
          </span>
        </div>

        {/* 스터디룸 투두리스트 */}

        <TodoListForStudyroom />
      </div>
    </div>
  );
};
