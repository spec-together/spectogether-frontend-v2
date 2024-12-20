import { useEffect, useState } from "react";
import { ContestInfoCard } from "../../components/main/ContestInfoCard.jsx";
import MainPageCarousel from "../../components/main/MainPageCarousel.jsx";
import { MenuBar } from "../../components/menubar/MenuBar.jsx";
import { useGetEventWithPagination } from "../../hooks/api-requests/event/useGetEventWithPagination.jsx";
import { Loading } from "../Loading.jsx";
import { se } from "date-fns/locale";

export const MainPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(30); // Assuming limit is fixed at 10

  const [page10, setPage10] = useState(0);

  const { contestList, pagination, loading, error } = useGetEventWithPagination(
    page,
    limit
  );

  const totalPages = pagination.total_pages || 1;

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  useEffect(() => {
    setPage(page10 * 10 + page);
  }, [page10]);

  return (
    <div>
      <MenuBar />
      <MainPageCarousel />
      {/* 공모전 정보를 보여주는 카드 섹션 */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mx-[1.88rem] mt-12 grid grid-cols-4 gap-7 justify-items-center">
            {contestList.map((contest) => (
              <ContestInfoCard key={contest.contest_id} contest={contest} />
            ))}
          </div>
          {/* 페이지네이션 섹션 */}
          <div className="flex justify-center mt-8">
            <nav aria-label="Page navigation">
              <ul className="inline-flex items-center -space-x-px">
                {/* Previous Button */}
                <li>
                  <button
                    onClick={() => setPage10((prev) => prev - 1)}
                    disabled={page === 1}
                    className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
                      page === 1 ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    Previous
                  </button>
                </li>
                {/* Page Numbers */}
                {Array.from(
                  { length: 10 },
                  (_, idx) => page10 * 10 + idx + 1
                ).map((pageNumber) =>
                  pageNumber < totalPages ? (
                    <li key={pageNumber}>
                      <button
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-2 leading-tight border border-gray-300 ${
                          page === pageNumber
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
                    onClick={() => setPage10((prev) => prev + 1)}
                    disabled={page === totalPages}
                    className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
                      page === totalPages ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    Next
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
    </div>
  );
};

export default MainPage;
