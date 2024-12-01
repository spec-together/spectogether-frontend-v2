import { useState, useEffect } from "react";

const MainPageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    {
      title: "캐러셀 아이템 1",
      content: "내용 설명 1입니다.",
      bgColor: "bg-blue-100",
    },
    {
      title: "캐러셀 아이템 2",
      content: "내용 설명 2입니다.",
      bgColor: "bg-green-100",
    },
    {
      title: "캐러셀 아이템 3",
      content: "내용 설명 3입니다.",
      bgColor: "bg-purple-100",
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
    <div className="mx-[1.88rem] relative mb-6 mt-6 overflow-hidden rounded-lg shadow-lg h-60 group">
      <div
        className="flex h-full transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex-none w-full p-4 ${item.bgColor} rounded-md`}
          >
            <h2 className="mb-2 text-2xl font-bold">{item.title}</h2>
            <p>{item.content}</p>
          </div>
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
  );
};

export default MainPageCarousel;
