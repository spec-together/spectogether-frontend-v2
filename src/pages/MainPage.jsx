import { ContestInfoCard } from "../components/main/ContestInfoCard";
import MainPageCarousel from "../components/main/MainPageCarousel";
import { MenuBar } from "../components/menubar/MenuBar";

export const MainPage = () => {
  const competitions = [
    {
      id: 1,
      thumbnail: "https://picsum.photos/id/1011/400/400.jpg",
      title: "공모전 1",
      content: "공모전 1에 대한 상세 설명입니다.",
    },
    {
      id: 2,
      thumbnail: "https://picsum.photos/id/1025/400/400.jpg",
      title: "공모전 2",
      content: "공모전 2에 대한 상세 설명입니다.",
    },
    {
      id: 3,
      thumbnail: "https://picsum.photos/id/1035/400/400.jpg",
      title: "공모전 3",
      content: "공모전 3에 대한 상세 설명입니다.",
    },
    {
      id: 4,
      thumbnail: "https://picsum.photos/id/1043/400/400.jpg",
      title: "공모전 4",
      content: "공모전 4에 대한 상세 설명입니다.",
    },
    {
      id: 5,
      thumbnail: "https://picsum.photos/id/1052/400/400.jpg",
      title: "공모전 5",
      content: "공모전 5에 대한 상세 설명입니다.",
    },
    {
      id: 6,
      thumbnail: "https://picsum.photos/id/1067/400/400.jpg",
      title: "공모전 6",
      content: "공모전 6에 대한 상세 설명입니다.",
    },
    {
      id: 7,
      thumbnail: "https://picsum.photos/id/1074/400/400.jpg",
      title: "공모전 7",
      content: "공모전 7에 대한 상세 설명입니다.",
    },
  ];

  return (
    <div>
      <MenuBar />
      <MainPageCarousel />

      {/* 공모전 정보를 보여주는 카드 섹션 */}
      <div className="mx-[1.88rem] mt-12 grid grid-cols-4 gap-7 justify-items-center">
        {competitions.map((contest) => (
          <ContestInfoCard key={contest.id} contest={contest} />
        ))}
      </div>
    </div>
  );
};
