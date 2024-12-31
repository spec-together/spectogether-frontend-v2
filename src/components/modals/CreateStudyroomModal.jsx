import { useState, useEffect, useRef } from "react";
import { CloseModalButton } from "./CloseModalButton";
import { handleCreateStudyroom } from "../../api/studyroom/handleCreateStudyroom";
import { useGetUserArea } from "../../hooks/api-requests/users/useGetUserArea";

/*
제목 지역
한줄소개
목표

관련일정 추가하기
*/

export const CreateStudyroomModal = ({ isOpen, onClose, autofill }) => {
  const { data, error, isLoading } = useGetUserArea();

  const [title, setTitle] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    if (autofill) {
      setTargetType(autofill.targetType);
      setTargetId(autofill.targetTitle);
      setAutofillEnabled(true);
    }
  }, [autofill]);

  const handleCreateStudyroomButtonClick = async (e) => {
    e.preventDefault();
    try {
      const result = await handleCreateStudyroom({
        title,
        subtitle,
        areaId,
        profileImage,
        targetType,
        targetId,
      });
      if (result?.status === 201) {
        alert("스터디룸이 생성되었습니다.");
      }
      onClose();
    } catch (err) {
      alert(`스터디룸 생성에 실패했습니다.\n${err}`);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    if (!autofillEnabled) {
      setTargetType(option);
      setIsDropdownOpen(false);
    }
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
      {/* 백그라운드 오버레이 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* 모달 창 */}
      <div className="relative z-10 w-2/5 p-8 bg-white rounded-lg shadow-xl">
        <CloseModalButton onClick={onClose} />
        {/* 제목 지역 (지역은 드롭다운) */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="스터디룸 이름을 입력해주세요."
            className="w-full h-10 px-2 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="relative" ref={dropdownRef}>
            <button
              className="h-10 px-2 ml-2 border border-gray-300 rounded-md"
              onClick={toggleDropdown}
            >
              지역 선택
            </button>
            {!isLoading && isDropdownOpen && (
              <div className="absolute right-0 w-24 bg-white border border-gray-300 rounded-md top-10">
                {data.map((option) => (
                  <button
                    key={option}
                    className="w-full h-10 px-2 text-left hover:bg-gray-100"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* 한줄소개 */}

        {/* 목표입력 */}

        {/* 관련일정 추가하기 */}
      </div>
    </div>
  );
};
