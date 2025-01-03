import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  parseISO,
  startOfToday,
} from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { AddEventModal } from "./AddEventModal";

const Calendar = ({ daysOfWeek, todosByDate, onDeleteEvent }) => {
  return (
    <div className="grid grid-cols-7 gap-4 max-w-7xl mx-auto px-4">
      {daysOfWeek.map((day, idx) => (
        <div key={idx} className="border rounded-lg shadow-sm bg-white">
          <div className="p-3 bg-gray-50 rounded-t-lg">
            <p
              className={`text-lg font-semibold ${
                format(day, "iiii", { locale: ko }) === "토요일"
                  ? "text-blue-500"
                  : format(day, "iiii", { locale: ko }) === "일요일"
                    ? "text-red-500"
                    : "text-gray-900"
              }`}
            >
              {format(day, "d", { locale: ko })}
            </p>
            <p className="text-sm text-gray-500">
              {format(day, "EEE", { locale: ko })}
            </p>
          </div>
          <div className="p-2 space-y-2">
            {todosByDate
              .filter((todo) => isSameDay(parseISO(todo.todo.starts_at), day))
              .sort((a, b) =>
                parseISO(a.todo.starts_at) < parseISO(b.todo.starts_at) ? -1 : 1
              )
              .map((todo, todoIdx) => (
                <div
                  key={todoIdx}
                  className="bg-blue-50 p-2 rounded-md relative group"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 text-sm font-medium text-blue-600">
                      {format(parseISO(todo.todo.starts_at), "HH:mm")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {todo.todo.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(parseISO(todo.todo.starts_at), "HH:mm")} -{" "}
                        {format(parseISO(todo.todo.ends_at), "HH:mm")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteEvent(todo.id)}
                    className="absolute top-1 right-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;

export const CalendarForStudyroom = ({ todos }) => {
  const [selectedDate, setSelectedDate] = useState(-1);
  const [todosByDate, setTodosByDate] = useState([]);
  const [weekStart, setWeekStart] = useState(
    startOfWeek(new Date(), { locale: ko })
  );
  const [showModal, setShowModal] = useState(false);
  const [customEvents, setCustomEvents] = useState([]);

  const daysOfWeek = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  useEffect(() => {
    const today = new Date();
    const todayIndex = daysOfWeek.findIndex((day) => isSameDay(day, today));
    setSelectedDate(todayIndex);
  }, [daysOfWeek]);

  useEffect(() => {
    const allTodos = [...todos, ...customEvents];
    const filteredTodos = allTodos.filter((todo) => {
      const todoStartDate = parseISO(todo.todo.starts_at);
      const todoEndDate = parseISO(todo.todo.ends_at);
      return daysOfWeek.some(
        (day) =>
          isSameDay(todoStartDate, day) ||
          isSameDay(todoEndDate, day) ||
          (todoStartDate <= day && todoEndDate >= day)
      );
    });
    setTodosByDate(filteredTodos);
  }, [todos, customEvents, daysOfWeek]);

  const changeWeek = (days) => {
    setWeekStart(startOfWeek(addDays(weekStart, days), { locale: ko }));
  };

  const goToToday = () => {
    const today = startOfToday();
    setWeekStart(startOfWeek(today, { locale: ko }));
  };

  const handleAddEvent = (newEvent) => {
    const formattedEvent = {
      id: Date.now(),
      todo: {
        starts_at: `${newEvent.date}T${newEvent.startTime}:00`,
        ends_at: `${newEvent.date}T${newEvent.endTime}:00`,
        title: newEvent.eventName,
      },
    };
    setCustomEvents((prevEvents) => [...prevEvents, formattedEvent]);
    setShowModal(false);
  };

  const handleDeleteEvent = (eventId) => {
    setCustomEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  return (
    <div className="mt-8 ml-7">
      <div className="flex items-center justify-between px-4 mb-4">
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={() => changeWeek(-7)}
            className="px-3 py-1 bg-gray-200 rounded shadow-sm hover:bg-gray-300"
          >
            &lt;
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600"
          >
            오늘
          </button>
          <button
            onClick={() => changeWeek(7)}
            className="px-3 py-1 bg-gray-200 rounded shadow-sm hover:bg-gray-300"
          >
            &gt;
          </button>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600"
        >
          일정 추가
        </button>
      </div>
      <Calendar
        daysOfWeek={daysOfWeek}
        todosByDate={todosByDate}
        onDeleteEvent={handleDeleteEvent}
      />
      {showModal && (
        <AddEventModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddEvent}
        />
      )}
    </div>
  );
};
