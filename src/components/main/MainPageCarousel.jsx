import { useState, useEffect } from "react";

const MainPageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    {
      source_url:
        "https://static.onoffmix.com/afv2/attach/2024/11/29/v320c741b5fe07cabcc529129109d6a666.jpg",
    },
    {
      source_url:
        "https://static.onoffmix.com/afv2/attach/2024/12/06/v3cd165194731b8dc7f1c03eaa0c38afbc.jpg",
    },
    {
      source_url:
        "https://static.onoffmix.com/afv2/attach/2024/12/06/v3d404d135d973a912304f41784ae65b16.jpg",
    },
  ];

  // 자동 슬라이드 기능
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000); // 3초마다 슬라이드 변경
    return () => clearInterval(interval);
  }, [items.length]);

  // 이전/다음 버튼 클릭 핸들러
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  return (
    <div className="flex justify-center">
      <div className="relative mb-6 mt-6 overflow-hidden rounded-lg shadow-lg w-[940px] h-[380px] group">
        <div
          className="flex h-full transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <img
              src={item.source_url}
              alt="carousel-item"
              className="flex-none object-scale-down w-full p-4 rounded-md"
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
      </div>
    </div>
  );
};

export default MainPageCarousel;
