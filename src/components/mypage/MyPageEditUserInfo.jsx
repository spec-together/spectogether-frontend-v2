import React, { useState } from "react";
import useGetUserProfile from "../../hooks/api-requests/users/useGetUserProfile";
import { Loading } from "../../pages/Loading";

export const MyPageEditUserInfo = () => {
  const { data, isLoading } = useGetUserProfile();
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");

  React.useEffect(() => {
    if (data) {
      setName(data.name || "");
      setSchool(data.school || "");
    }
  }, [data]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleSchoolChange = (e) => setSchool(e.target.value);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-lg p-6 md:p-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-12">
          {/* 프로필 섹션 */}
          <div className="flex flex-col items-center lg:items-start">
            <img
              src={data.profile_image}
              alt="프로필 이미지"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-white"
            />
            <div className="flex flex-col items-center lg:items-start mt-6">
              <span className="text-gray-700 text-sm">
                Lv. {data.spec_level}
              </span>
              <h2 className="text-gray-900 text-2xl md:text-3xl font-bold mt-2">
                {data.nickname}
              </h2>
              <span className="text-gray-600 text-sm mt-1">
                닉네임 변경 가능 횟수: {data.remaining_nickname_changes}
              </span>
              <button className="mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md">
                닉네임 변경하기
              </button>
            </div>
          </div>

          {/* 입력 폼 섹션 */}
          <div className="flex flex-col w-full mt-8 lg:mt-0 space-y-6">
            {/* 이름 */}
            <div className="flex flex-col">
              <label className="text-gray-800 font-semibold">이름</label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="mt-2 p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300 shadow-md"
              />
            </div>

            {/* 이메일 */}
            <div className="flex flex-col">
              <label className="text-gray-800 font-semibold">이메일</label>
              <div className="flex items-center mt-2 space-x-4">
                <span className="text-gray-800 font-medium">{data.email}</span>
                {!data.is_email_verified && (
                  <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md">
                    이메일 인증하기
                  </button>
                )}
              </div>
            </div>

            {/* 학교 */}
            <div className="flex flex-col">
              <label className="text-gray-800 font-semibold">학교</label>
              <input
                type="text"
                value={school}
                onChange={handleSchoolChange}
                placeholder="학교를 입력하세요"
                className="mt-2 p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300 shadow-md"
              />
            </div>

            {/* 동네 인증 */}
            <div className="flex flex-col">
              <label className="text-gray-800 font-semibold">동네 인증</label>
              <div className="mt-2">
                {data.areas?.length > 0 ? (
                  data.areas.map((area, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between mb-2 p-3 bg-gray-100 rounded-lg shadow-md"
                    >
                      <span className="text-gray-800">
                        {area.sido} {area.gungu}
                      </span>
                      <button className="px-3 py-1 text-sm bg-gray-300 rounded-lg hover:bg-gray-400">
                        인증 삭제
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500">등록된 동네가 없습니다.</span>
                )}
                <button className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md">
                  동네 인증 추가하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
