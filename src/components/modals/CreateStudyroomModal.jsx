import { useState, useEffect, useRef } from "react";
import { CloseModalButton } from "./CloseModalButton";
import { useGetUserArea } from "../../hooks/api-requests/users/useGetUserArea";
import useCreateStudyroom from "../../hooks/api-requests/studyroom/useCreateStudyroom";

export const CreateStudyroomModal = ({ isOpen, onClose, autofill }) => {
  const { data, error, isLoading } = useGetUserArea();

  const [title, setTitle] = useState("");
  const [areaId, setAreaId] = useState(0);
  const [areaName, setAreaName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [goal, setGoal] = useState("");
  const [goalUrl, setGoalUrl] = useState("");
  const [status, setStatus] = useState("open");
  const [schedules, setSchedules] = useState([]);
  const dropdownRef = useRef();
  const createStudyroom = useCreateStudyroom();

  const [editScheduleIndex, setEditScheduleIndex] = useState(-1);
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    content: "",
    starts_at: "",
    ends_at: "",
    location: "",
  });
  const [showNewScheduleForm, setShowNewScheduleForm] = useState(false);

  useEffect(() => {
    if (autofill) {
      setGoal(autofill.title);
      setGoalUrl(autofill.url);
      setSchedules(autofill?.todos || []);
    }
  }, [autofill]);

  const handleCreateStudyroomButtonClick = async (e) => {
    e.preventDefault();

    const data = {
      title,
      subtitle,
      goal,
      goal_url: goalUrl,
      status,
      area_id: areaId,
      todos: schedules,
    };

    createStudyroom.mutate(data, {
      onSuccess: (data) => {
        alert("스터디룸이 생성되었습니다.");
        onClose();
      },
      onError: (error) => {
        alert("스터디룸 생성에 실패했습니다.");
      },
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-3/5 p-8 bg-white rounded-lg shadow-xl">
        <CloseModalButton onClick={onClose} />
        <div className="mt-5 space-y-5">
          <div className="flex space-x-4">
            {/* Studyroom Name */}
            <div className="flex-1">
              <label className="block text-gray-700">스터디룸 이름</label>
              <input
                type="text"
                className="w-full h-10 px-2 border-b-2 border-gray-300 focus:outline-none focus:border-black hover:shadow-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Area */}
            <div className="flex-1">
              <label className="block text-gray-700">지역</label>
              <div className="relative w-full ref={dropdownRef}">
                <button
                  className="w-full h-10 px-2 ml-2 border border-gray-300 rounded-md"
                  onClick={toggleDropdown}
                >
                  {areaName ? areaName : "지역을 선택해주세요."}
                </button>
                {!isLoading && isDropdownOpen && (
                  <div className="absolute w-full px-2 bg-white border border-gray-300 rounded-md left-2 top-11">
                    {data.map((area, idx) => (
                      <button
                        key={idx}
                        className="w-full h-10 px-2 text-left hover:bg-gray-100"
                        onClick={() => {
                          setAreaId(area.area_id);
                          setAreaName(area.sido + " " + area.gungu);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {area.sido + " " + area.gungu}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/4 text-gray-700">한줄 소개</label>
            <input
              type="text"
              className="w-3/4 h-10 px-2 border-b-2 border-gray-300 focus:outline-none focus:border-black hover:shadow-md"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/4 text-gray-700">목표</label>
            <input
              type="text"
              className="w-3/4 h-10 px-2 border-b-2 border-gray-300 focus:outline-none focus:border-black hover:shadow-md"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          {/* 관련일정 표시하기 */}
          <div className="mt-10">
            <span className="text-2xl font-semibold">관련 일정</span>
          </div>
          {schedules && schedules.length > 0 ? (
            <div className="mt-5 space-y-6">
              {schedules.map((schedule, index) => (
                <div
                  key={index}
                  className="flex flex-col p-6 bg-white rounded-lg shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">
                      {schedule.title}
                    </h3>
                    <div className="flex space-x-3">
                      <button
                        className="px-4 py-2 text-white transition bg-[#6a994e] rounded hover:bg-[#386641]"
                        onClick={() => {
                          setShowNewScheduleForm(true);
                          setEditScheduleIndex(index);
                          setNewSchedule(schedules[index]);
                        }}
                      >
                        수정
                      </button>
                      <button
                        className="px-4 py-2 text-white transition bg-[#ef271b] hover:bg-[#9d0208]"
                        onClick={() => {
                          setSchedules((prev) =>
                            prev.filter((_, idx) => idx !== index)
                          );
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-gray-600">
                    <span>{schedule.starts_at}</span> -{" "}
                    <span>{schedule.ends_at}</span>
                  </div>
                  <div className="text-gray-600">{schedule.location}</div>
                  <p className="mt-2 text-gray-700">{schedule.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 text-gray-500">등록된 일정이 없습니다.</div>
          )}

          {/* 관련일정 추가하기 */}
          <button
            className="w-full h-10 mt-5 bg-transparent text-black rounded-lg border border-[#3036fd]"
            onClick={() => setShowNewScheduleForm(true)}
          >
            관련일정 추가하기
          </button>
          {showNewScheduleForm && (
            <div className="flex flex-col">
              {/* 제목, 생성, 삭제버튼 */}
              <div className="flex flex-row">
                <input
                  placeholder="일정 제목을 입력해주세요."
                  className="w-full h-10 px-2 mt-5 border border-gray-300 rounded-md"
                  value={newSchedule.title}
                  onChange={(e) =>
                    setNewSchedule((data) => ({
                      ...data,
                      title: e.target.value,
                    }))
                  }
                />
                {editScheduleIndex !== -1 ? (
                  <div className="flex flex-row">
                    <button
                      className="w-10 h-10 mt-5 ml-2 bg-gray-300"
                      onClick={() => {
                        setShowNewScheduleForm(false);
                        setEditScheduleIndex(-1);
                        setSchedules((prev) =>
                          prev.map((schedule, idx) =>
                            idx === editScheduleIndex ? newSchedule : schedule
                          )
                        );
                        setNewSchedule({
                          title: "",
                          content: "",
                          starts_at: "",
                          ends_at: "",
                          location: "",
                        });
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="w-10 h-10 mt-5 ml-2 bg-gray-300"
                      onClick={() => {
                        setShowNewScheduleForm(false);
                        setNewSchedule({
                          title: "",
                          content: "",
                          starts_at: "",
                          ends_at: "",
                          location: "",
                        });
                      }}
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-row">
                    <button
                      className="w-10 h-10 mt-5 ml-2 bg-[#3036fd] rounded-lg text-white"
                      onClick={() => {
                        setShowNewScheduleForm(false);
                        setSchedules((prev) => [...prev, newSchedule]);
                        setNewSchedule({
                          title: "",
                          content: "",
                          starts_at: "",
                          ends_at: "",
                          location: "",
                        });
                      }}
                    >
                      추가
                    </button>
                    <button
                      className="w-10 h-10 mt-5 ml-2 bg-gray-500 rounded-lg text-white"
                      onClick={() => {
                        setShowNewScheduleForm(false);
                        setNewSchedule({
                          title: "",
                          content: "",
                          starts_at: "",
                          ends_at: "",
                          location: "",
                        });
                      }}
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>

              {/* 시작, 종료, 장소 */}
              <div className="flex flex-row mt-5 space-x-4">
                <input
                  type="datetime-local"
                  className="w-1/3 h-10 px-2 border border-gray-300 rounded-md"
                  value={newSchedule.starts_at}
                  onChange={(e) =>
                    setNewSchedule((data) => ({
                      ...data,
                      starts_at: e.target.value,
                    }))
                  }
                />
                <input
                  type="datetime-local"
                  className="w-1/3 h-10 px-2 border border-gray-300 rounded-md"
                  value={newSchedule.ends_at}
                  onChange={(e) =>
                    setNewSchedule((data) => ({
                      ...data,
                      ends_at: e.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  placeholder="장소를 입력해주세요."
                  className="w-1/3 h-10 px-2 ml-2 border border-gray-300 rounded-md"
                  value={newSchedule.location}
                  onChange={(e) =>
                    setNewSchedule((data) => ({
                      ...data,
                      location: e.target.value,
                    }))
                  }
                />
              </div>

              {/* 내용 */}
              <textarea
                placeholder="내용을 입력해주세요."
                className="w-full h-20 p-2 mt-5 border border-gray-300 rounded-md"
                value={newSchedule.content}
                onChange={(e) =>
                  setNewSchedule((data) => ({
                    ...data,
                    content: e.target.value,
                  }))
                }
              />
            </div>
          )}

          {/* 취소, 생성 버튼 */}
          <div className="flex flex-row justify-end mt-5 space-x-3">
            <button
              className="px-4 py-2 text-white bg-[#3036fd] rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none active:scale-95"
              onClick={handleCreateStudyroomButtonClick}
            >
              생성
            </button>
            <button
              className="px-4 py-2 text-white bg-gray-500 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none active:scale-95"
              onClick={() => onClose()}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
