import { useState } from "react";
import { ContestInfoCard } from "../components/main/ContestInfoCard";
import MainPageCarousel from "../components/main/MainPageCarousel";
import { MenuBar } from "../components/menubar/MenuBar";
import { useGetContestByPagenation } from "../hooks/useGetContestByPagenation";
import { Loading } from "./Loading";

export const MainPage = () => {
  // {
  //   id: 1,
  //   thumbnail: "https://picsum.photos/id/1011/400/400.jpg",
  //   title: "공모전 1",
  //   content: "공모전 1에 대한 상세 설명입니다.",
  // },

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { contestList, pagination, loading, error } = useGetContestByPagenation(
    page,
    limit
  );

  // TODO : 페이지네이션 적용해야 함

  return (
    <div>
      <MenuBar />
      <MainPageCarousel />
      {/* 공모전 정보를 보여주는 카드 섹션 */}
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-[1.88rem] mt-12 grid grid-cols-4 gap-7 justify-items-center">
          {contestList.map((contest, idx) => (
            <ContestInfoCard key={idx} contest={contest} />
          ))}
        </div>
      )}
    </div>
  );
};
