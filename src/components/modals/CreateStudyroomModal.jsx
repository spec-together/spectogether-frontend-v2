import { useState, useEffect, useRef } from "react";
import { CloseModalButton } from "./CloseModalButton";
import { handleCreateStudyroom } from "../../api/studyroom/handleCreateStudyroom";

export const CreateStudyroomModal = ({ isOpen, onClose, autofill }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [areaId, setAreaId] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [targetType, setTargetType] = useState("");
  const [targetId, setTargetId] = useState("");
  const [fileName, setFileName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [autofillEnabled, setAutofillEnabled] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    if (autofill) {
      setTargetType(autofill.targetType);
      setTargetId(autofill.targetTitle);
      setAutofillEnabled(true);
    }
  }, []);

  const handleCreateStudyroomButtonClick = async (e) => {
    e.preventDefault();
    try {
      // 여기에서 스터디룸 생성 로직을 추가하세요.
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
    setTargetType(option);
    setIsDropdownOpen(false);
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
        <h2 className="mb-6 text-2xl font-semibold text-blue-600">
          스터디룸 생성
        </h2>
        <form onSubmit={handleCreateStudyroomButtonClick} className="space-y-6">
          {/* 스터디 이름 */}
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700">스터디 이름</label>
            <input
              type="text"
              placeholder="스터디 이름"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-2/3 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* 스터디 한줄소개 */}
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700">한줄 소개</label>
            <input
              type="text"
              placeholder="스터디 한줄소개"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-2/3 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* 스터디 지역 */}
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700">스터디 지역</label>
            <input
              type="text"
              placeholder="스터디 지역"
              value={areaId}
              onChange={(e) => setAreaId(e.target.value)}
              className="w-2/3 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* 스터디룸 프로필 이미지 */}
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700">스터디룸 프로필</label>
            <div className="w-2/3">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFileName(file.name); // 파일명 저장
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setProfileImage(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div
                  className="flex items-center justify-between w-full p-3 border border-blue-300 rounded-lg bg-blue-50"
                  onClick={toggleDropdown}
                  ref={dropdownRef}
                >
                  <span className="text-gray-500">
                    {fileName || "이미지 파일 선택"}
                  </span>
                  <button
                    type="button"
                    className="px-4 py-1 text-sm text-blue-600 bg-white rounded-md shadow-sm hover:bg-blue-100"
                  >
                    파일 선택
                  </button>
                </div>
              </div>
              {fileName && (
                <div className="mt-2 text-sm text-blue-600">
                  선택된 파일: {fileName}
                </div>
              )}
            </div>
          </div>
          {/* 스터디 목적 - 드롭다운 변경 */}
          <div className="relative flex items-center" ref={dropdownRef}>
            <label className="w-1/3 text-gray-700">스터디 유형</label>
            <div className="w-2/3">
              <div
                className="flex items-center justify-between p-3 border border-blue-300 rounded-lg cursor-pointer bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={toggleDropdown}
              >
                <span className="text-gray-500">
                  {targetType || "스터디 목적 선택"}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    isDropdownOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {isDropdownOpen && (
                <div className="absolute z-20 w-2/3 mt-1 bg-white border border-blue-300 rounded-lg shadow-lg">
                  <button
                    type="button"
                    onClick={() => handleOptionSelect("공모전")}
                    className="w-full px-4 py-2 text-left text-gray-700 rounded-t-lg hover:bg-blue-100"
                  >
                    공모전
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOptionSelect("자격증")}
                    className="w-full px-4 py-2 text-left text-gray-700 rounded-b-lg hover:bg-blue-100"
                  >
                    자격증
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* 목표로 하는 것을 적어주세요 */}
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700">스터디 목표</label>
            <input
              type="text"
              placeholder="목표로 하는 것을 적어주세요"
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              className="w-2/3 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={autofillEnabled}
            />
          </div>
          {/* 액션 버튼 */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              스터디룸 만들기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
