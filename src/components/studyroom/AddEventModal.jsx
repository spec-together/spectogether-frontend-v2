import { useState } from "react";

export const AddEventModal = ({ onClose, onAdd }) => {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAdd = () => {
    if (eventName && date && startTime && endTime) {
      onAdd({ eventName, date, startTime, endTime });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">일정 추가</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              날짜
            </label>
            <input
              id="date"
              type="date"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                시작 시간
              </label>
              <input
                id="startTime"
                type="time"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                종료 시간
              </label>
              <input
                id="endTime"
                type="time"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="eventName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              일정 이름
            </label>
            <input
              id="eventName"
              type="text"
              placeholder="일정 이름을 입력하세요"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            취소
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};
