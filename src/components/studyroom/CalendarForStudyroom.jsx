import { format, startOfWeek, addDays } from "date-fns";
import { ko } from "date-fns/locale";

export const CalendarForStudyroom = () => {
  const date = new Date();

  // 현재 날짜를 기준으로 주의 시작일 (월요일) 계산
  const weekStart = startOfWeek(date, { locale: ko });

  // 현재 주의 모든 날짜를 배열로 생성
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from(
    { length: 25 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  return (
    <div className="mt-8 overflow-y-auto ml-7">
      {/* 요일 헤더 */}
      <div className="grid items-center grid-cols-8 gap-2 font-normal tracking-tight text-center justify-items-center">
        <span className="text-center">Week</span>
        {daysOfWeek.map((day) => {
          const isToday =
            format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
          return (
            <div
              key={day}
              className={`w-12 h-12 ${isToday ? "bg-violet-200 rounded-lg" : ""}`}
            >
              <div
                className={`${
                  format(day, "iiii", { locale: ko }) === "토요일"
                    ? "text-blue-500"
                    : format(day, "iiii", { locale: ko }) === "일요일"
                      ? "text-red-500"
                      : "text-black"
                } `}
              >
                <p className="mb-0 text-base">
                  {format(day, "d", { locale: ko })}
                </p>
                <p className="-mt-1 text-lg">{format(day, "EEE")}</p>
              </div>
            </div>
          ); // Sun, Mon, Tue 등
        })}
      </div>

      <div className="flex flex-col h-[30rem] items-center justify-between mt-4 space-y-2 overflow-y-auto">
        {hours.map((hour, index) => (
          <div className="grid w-full grid-cols-8" key={index}>
            <span className="mr-2 text-center font-pretendard ">{hour}</span>
            {/* 요일별 시간 셀 */}
            {Array.from({ length: 7 }, (_, dayIndex) => (
              <div
                key={dayIndex}
                className="border-b border-gray-500 h-1/2"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
