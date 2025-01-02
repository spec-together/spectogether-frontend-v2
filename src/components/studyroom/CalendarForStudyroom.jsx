import { format, startOfWeek, addDays } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { TodoCard } from "./TodoCard";

export const CalendarForStudyroom = ({ todos }) => {
  const [selectedDate, setSelectedDate] = useState(-1);
  const [todosByDate, setTodosByDate] = useState([]);

  const [weekStart, setWeekStart] = useState(
    startOfWeek(new Date(), { locale: ko })
  );

  // 현재 주의 모든 날짜를 배열로 생성
  const daysOfWeek = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );
  console.log(todos);
  // 현재 날짜를 기준으로 주의 시작일 (월요일) 계산
  // 현재 주의 모든 날짜를 배열로 생성
  // const weekStart = startOfWeek(weekGijun, { locale: ko });
  // const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  useEffect(() => {
    console.log("선택날짜 변경됨", selectedDate);
    console.log("선택날짜 변경됨", daysOfWeek);
  }, [selectedDate]);

  // 현재 날짜가 있을 경우 selectedDate를 현재 주의 몇번째인지로 설정
  useEffect(() => {
    console.log("이거실행됨0000000000000000");
    const today = new Date();
    const todayIndex = daysOfWeek.findIndex(
      (day) => format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
    );
    setSelectedDate(todayIndex);
  }, [daysOfWeek]);

  useEffect(() => {
    const filteredTodos = todos.filter((todo) => {
      const todoStartDate = new Date(todo.todo.starts_at);
      const todoEndDate = new Date(todo.todo.ends_at);
      const selectedDay = daysOfWeek[selectedDate];
      return selectedDay >= todoStartDate && selectedDay <= todoEndDate;
    });
    setTodosByDate(filteredTodos);
  }, [selectedDate, todos]);

  const changeWeek = (days) => {
    setWeekStart(startOfWeek(addDays(weekStart, days), { locale: ko }));
  };

  return (
    <div className="mt-8 overflow-y-auto ml-7">
      {/* 요일 헤더 */}
      <div className="grid items-center grid-cols-10 gap-2 font-normal tracking-tight text-center justify-items-center">
        {daysOfWeek.map((day, idx) => {
          return (
            <div
              key={day}
              className={`w-12 h-12 ${idx === selectedDate ? "bg-violet-200 rounded-lg" : ""}`}
            >
              <button
                className={`${
                  format(day, "iiii", { locale: ko }) === "토요일"
                    ? "text-blue-500"
                    : format(day, "iiii", { locale: ko }) === "일요일"
                      ? "text-red-500"
                      : "text-black"
                } `}
                onClick={() => setSelectedDate(idx)}
              >
                <p className="text-lg ">{format(day, "EEE")}</p>
                <p className="-mt-1 text-base">
                  {format(day, "MM", { locale: ko })}/
                  {format(day, "dd", { locale: ko })}
                </p>
              </button>
            </div>
          ); // Sun, Mon, Tue 등
        })}
        <button onClick={() => changeWeek(-7)}>이전</button>
        <button
          onClick={() => setWeekStart(startOfWeek(new Date(), { locale: ko }))}
        >
          오늘
        </button>
        <button onClick={() => changeWeek(+7)}>다음</button>
      </div>
      {/* todos.todo : content, created_at, creater: user_id, nickname, ends_at, location, starts_at, */}
      {/* status, title, todo_id, todo_partcipants,  */}
      {todosByDate.length > 0 && (
        <div className="space-y-4">
          {todosByDate.map((todo, idx) => (
            <TodoCard key={idx} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};
