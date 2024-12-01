export const TodoCheckBox = ({ isChecked }) => {
  return (
    <div className="flex items-center justify-center w-6 h-6 border border-black rounded">
      {isChecked ? (
        <svg
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[0.875rem]"
        >
          <path
            d="M2 7.98389L6 11.9839L16 1.98389"
            stroke="#489F2D"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        ""
      )}
    </div>
  );
};
