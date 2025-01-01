import { useState, useEffect } from "react";
import { useCarousel } from "../../hooks/api-requests/ads/useCarousel";

const MainPageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, error, isLoading } = useCarousel();

  // 자동 슬라이드 기능
  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000); // 3초마다 슬라이드 변경
    return () => clearInterval(interval);
  }, [data, isLoading]);

  // 이전/다음 버튼 클릭 핸들러
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  return (
    <div className="flex justify-center">
      <div className="relative mb-6 mt-6 overflow-hidden rounded-lg shadow-lg w-[940px] h-[380px] group">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <span>Loading...</span>
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full">
            <span>No data available</span>
          </div>
        ) : (
          <>
            <div
              className="flex h-full transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {data.map((item, index) => (
                <img
                  src={item.link}
                  alt="carousel-item"
                  className="flex-none object-cover w-full h-full"
                  key={index}
                />
              ))}
            </div>

            {/* 캐러셀 컨트롤 */}
            <button
              onClick={handlePrev}
              className="absolute p-1 text-white transition-opacity transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full opacity-0 left-1 top-1/2 group-hover:opacity-100"
            >
              <span className="text-sm opacity-70">◀</span>
              <span className="sr-only">Previous</span>
            </button>
            <button
              onClick={handleNext}
              className="absolute p-1 text-white transition-opacity transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full opacity-0 right-1 top-1/2 group-hover:opacity-100"
            >
              <span className="text-sm opacity-70">▶</span>
              <span className="sr-only">Next</span>
            </button>

            {/* 캐러셀 인디케이터 */}
            <div className="absolute flex space-x-2 transform -translate-x-1/2 bottom-2 left-1/2">
              {data.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-white" : "bg-gray-400"
                  }`}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainPageCarousel;
