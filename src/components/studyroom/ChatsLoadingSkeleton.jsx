export const ChatsLoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className={`flex flex-row ${index % 3 ? "flex-row-reverse" : ""}`}
        >
          {/* 아바타 스켈레톤 */}
          <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>

          <div
            className={`flex flex-col w-full ml-4 space-y-2 ${index % 3 ? "items-end mr-4" : ""}`}
          >
            {/* 이름 스켈레톤 */}
            <div className="w-1/4 h-4 bg-gray-300 rounded animate-pulse"></div>
            {/* 메시지 스켈레톤 */}
            <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
