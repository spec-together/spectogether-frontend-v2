import { useEffect, useRef, useState } from "react";
import { useGetTodoInfoById } from "../../hooks/api-requests/users/useGetTodoInfoById.jsx";
import { Loading } from "../../pages/Loading";
import { CloseModalButton } from "./CloseModalButton";

export const CompleteTodoModal = ({ isOpen, onClose, todoId }) => {
  const [content, setContent] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("TODO");

  const dropdownRef = useRef();

  const { info, assignedMember, loading } = useGetTodoInfoById(todoId);

  const handleCompleteTodoButtonClick = async (e) => {
    e.preventDefault();
    try {
      // 할 일 완료 로직 추가
      console.log(content, selectedStatus);
      alert("할 일이 완료되었습니다.");
      onClose();
    } catch (err) {
      alert(`할 일 완료에 실패했습니다.\n${err}`);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    setSelectedStatus(option);
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
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 백그라운드 오버레이 */}
          <div
            className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="relative z-10 w-2/5 p-8 bg-white rounded-lg shadow-xl">
            <CloseModalButton onClick={onClose} />
            <h2 className="mb-4 text-2xl font-semibold text-blue-600">
              할 일 완료
            </h2>
            <div className="mb-4">
              <p className="text-gray-700">
                <span className="font-medium">ID:</span> {info.todo_id}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">제목:</span> {info.title}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">부제목:</span> {info.subtitle}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">내용:</span> {info.content}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">상태:</span> {info.status}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">마감일:</span> {info.deadline}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-blue-500">할당된 멤버</h3>
              <pre className="p-2 text-sm text-gray-800 bg-gray-100 rounded-lg">
                {JSON.stringify(assignedMember, null, 2)}
              </pre>
            </div>
            <form onSubmit={handleCompleteTodoButtonClick}>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block mb-2 text-lg font-medium text-gray-700"
                >
                  완료 내용
                </label>
                <input
                  type="text"
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="완료 내용을 입력하세요"
                  required
                />
              </div>
              <div className="relative mb-4" ref={dropdownRef}>
                <label
                  htmlFor="status"
                  className="block mb-2 text-lg font-medium text-gray-700"
                >
                  상태
                </label>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="w-full px-4 py-2 text-left bg-white border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {selectedStatus}
                  <span className="float-right">&darr;</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-blue-300 rounded-lg shadow-lg">
                    {["TODO", "DOING", "DONE"].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleOptionSelect(status)}
                        className="w-full px-4 py-2 text-left hover:bg-blue-50"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 font-semibold text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                완료
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
