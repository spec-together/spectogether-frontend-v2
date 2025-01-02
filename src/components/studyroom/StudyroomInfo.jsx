export const StudyroomInfo = ({ studyroom }) => {
  /*
    area, area_id, created_at, goal, goal_url,
    profile_image, status, studyroom_id, studyroom_members,
    studyroom_todos, subtitle, title
  */
  return (
    <div className="flex flex-col p-6 m-4 bg-white rounded-lg shadow-lg md:flex-row">
      {/* 스터디룸 프로필 */}
      <div className="mb-4 md:w-1/3 md:mb-0">
        <img
          src={studyroom.profile_image}
          alt="studyroom-image"
          className="object-cover w-full h-64 rounded-lg shadow-md"
        />
      </div>

      {/* 스터디룸 정보 */}
      <div className="flex flex-col md:w-2/3 md:pl-6">
        {/* 제목 및 부제 */}
        <div className="pb-4 mb-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-600 font-gmarket">
            {studyroom.title}
          </h1>
          <p className="mt-2 text-lg italic text-gray-600">
            "{studyroom.subtitle}"
          </p>
        </div>

        {/* 목표 및 지역 */}
        <div className="flex flex-col justify-between mb-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex-1 p-4 rounded-lg bg-indigo-50">
            <p className="text-gray-700">
              <span className="font-semibold text-indigo-600">목표</span>
              <span className="block mt-1 text-lg">{studyroom.goal}</span>
            </p>
          </div>
          <div className="flex-1 p-4 rounded-lg bg-indigo-50">
            <p className="text-gray-700">
              <span className="font-semibold text-indigo-600">지역</span>
              <span className="block mt-1 text-lg">
                {studyroom.area.sido} {studyroom.area.gungu}
              </span>
            </p>
          </div>
        </div>

        {/* 스터디 시작일 */}
        <div className="p-4 rounded-lg bg-gray-50">
          <p className="text-gray-700">
            <span className="font-semibold text-indigo-600">스터디 시작</span>
            <span className="block mt-1 text-lg">
              {new Date(studyroom.created_at).toLocaleString("ko-KR", {
                timeZone: "Asia/Seoul",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </p>
        </div>

        {/* 스터디룸 멤버 */}
        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            스터디 멤버
          </h2>
          <div className="flex flex-col sm:grid-cols-2">
            {studyroom.studyroom_members.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
              >
                <span className="font-medium text-gray-800">
                  {member.user.nickname}
                </span>
                <div>
                  <span className="px-2 py-1 mr-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                    {member.role}
                  </span>
                  <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
