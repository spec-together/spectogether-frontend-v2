export const CloseModalButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};
