const CheckBox = ({ isChecked, setIsChecked }) => {
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div onClick={handleToggle} className="cursor-pointer">
      <img
        src={isChecked ? "/icons/check-true.svg" : "/icons/check-false.svg"}
        alt={isChecked ? "check-true" : "check-false"}
        className="transition-transform duration-300 ease-in-out transform h-9 hover:scale-105"
      />
    </div>
  );
};

export default CheckBox;
