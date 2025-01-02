import { TodoListForStudyroom } from "./TodoListForStudyroom";

export const StudyroomInfo = ({ studyroom }) => {
  /*
    area, area_id, created_at, goal, goal_url,
    profile_image, status, studyroom_id, studyroom_members,
    studyroom_todos, subtitle, title
  */
  return (
    <div className="flex flex-row h-64 ml-11">
      {/* 스터디룸 프로필 */}
      <img
        src={studyroom.profile_image}
        alt="studyroom-image"
        className="object-cover w-48 h-full"
      />

      {/* 스터디룸 제목, 부제*/}
      <div className="flex flex-col h-full ml-10 mr-20">
        <div className="flex flex-row items-end flex-none mb-8">
          <span className="text-5xl font-semibold leading-none font-gmarket">
            {studyroom.title}
          </span>
          <span className="ml-4 text-[1.75rem] font-gmarket opacity-70 leading-tight">
            스터디룸 입니다.
          </span>
        </div>
        <span>한줄소개 : {studyroom.subtitle}</span>
        {/* 스터디룸 목표 */}

        {/* 스터디 시작 ~ (종료) */}

        {/* 스터디룸 멤버 */}

        {/* 우측에 채팅, 하단에 주간달력 UI와 선택한 날의 투두리스트 */}

        <TodoListForStudyroom />
      </div>
    </div>
  );
};
