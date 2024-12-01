export const CustomSubmitButton = ({ text, isDisabled, disabledText }) => {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-button-border-focused ${
        isDisabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed" // 비활성화 상태
          : "text-text-primary bg-button-bg-primary hover:bg-button-bg-hover" // 활성화 상태
      }`}
    >
      {isDisabled ? disabledText : text}
    </button>
  );
};
