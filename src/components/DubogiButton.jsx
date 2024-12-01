export const DubogiButton = ({ children, onClick }) => {
  return (
    <div className="flex flex-row items-center h-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 13 14"
        fill="none"
        className="w-3"
      >
        <path
          d="M6.5 1.48389V13.4839M12.5 7.48389H0.5"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="ml-1 text-sm font-pretendard">더보기</span>
    </div>
  );
};
