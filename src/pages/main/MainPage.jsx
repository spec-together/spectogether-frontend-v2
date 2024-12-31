import { useEffect, useState } from "react";
import { ContestInfoCard } from "../../components/main/ContestInfoCard.jsx";
import MainPageCarousel from "../../components/main/MainPageCarousel.jsx";
import { MenuBar } from "../../components/menubar/MenuBar.jsx";
import { useGetEventWithPagination } from "../../hooks/api-requests/event/useGetEventWithPagination.jsx";
import { Loading } from "../Loading.jsx";
import { Footer } from "../../components/header/Footer.jsx";
import { Notice } from "../../components/main/notice/Notice.jsx";

export const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  const { data, error, isLoading, isError, isFetching, refetch } =
    useGetEventWithPagination(currentPage, limit);

  // "pagination": {
  //     "totalItems": 150,
  //     "totalPages": 15,
  //     "next": "/events?page=2",
  //     "previous": null,
  //     "page": 1,
  //     "limit": 10
  // }

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  useEffect(() => {
    // 데이터가 바뀌면 총 페이지 수를 업데이트
    setTotalPages(data?.pagination.totalPages || 1);
  }, [data]);

  return (
    <div>
      <MenuBar />
      <div className="flex flex-row justify-center w-full px-24 space-x-24">
        <MainPageCarousel />
        <Notice />
      </div>
      {/* 공모전 정보를 보여주는 카드 섹션 */}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mx-[1.88rem] mt-12 grid grid-cols-4 gap-7 justify-items-center">
            {data.events &&
              data.events.map((contest) => (
                <ContestInfoCard key={contest.event_id} contest={contest} />
              ))}
          </div>
          {/* 페이지네이션 섹션 */}
          <div className="flex justify-center mt-8">
            <nav aria-label="Page navigation">
              <ul className="inline-flex items-center -space-x-px">
                {/* Previous Button */}
                <li>
                  <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 ml-0 mb-5 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
                      currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    이전
                  </button>
                </li>
                {/* Page Numbers */}
                {Array.from({ length: 10 }, (_, idx) => idx + 1).map(
                  (pageNumber) =>
                    pageNumber <= totalPages ? (
                      <li key={pageNumber} className="mb-5">
                        <button
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-2 leading-tight border border-gray-300 ${
                            currentPage === pageNumber
                              ? "text-blue-600 bg-blue-50"
                              : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    ) : null
                )}
                {/* Next Button */}
                <li>
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 mb-5 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
                      currentPage === totalPages
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    다음
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
      {/* 에러 메시지 표시 */}
      {error && (
        <div className="flex justify-center mt-4 text-red-500">
          에러가 발생했습니다: {error.message}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MainPage;
