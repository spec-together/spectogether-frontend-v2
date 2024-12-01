import { useState } from "react";
import { checkUniqueValue } from "../api/auth/register/checkUniqueValue.js";

/**
 * CustomInputFieldWithLabel 입력란
 *
 * @param {Object} props - The properties object.
 * @param {string} props.className - The CSS class for the container div.
 * @param {string} props.label - The label text for the input field.
 * @param {string} props.type - The type of the input field (e.g., "text", "email").
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {boolean} props.disabled - Whether the input field is disabled.
 * @param {string} props.getter - The current value of the input field.
 * @param {Function} props.setter - The function to update the value of the input field.
 * @param {boolean} props.checkUnique - Whether to show the unique value check button.
 * @param {string} props.checkDataType - The data type to check for uniqueness.
 * @param {Function} props.isUniqueSetter - The function to set the uniqueness status.
 *
 * @returns {JSX.Element} The rendered CustomInputFieldWithLabel component.
 */
export const CustomInputFieldWithLabel = ({
  className,
  label,
  type,
  placeholder,
  disabled,
  getter,
  setter,
  checkUnique,
  checkDataType,
  isUniqueSetter,
  checkFormat,
  checkFormatGetter,
  required,
  uniqueTrueMessage,
  uniqueFalseMessage,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [verificationClicked, setVerificationClicked] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState(null);
  const handleValidationClick = async () => {
    const result = await checkUniqueValue(checkDataType, getter);
    console.log("[inputField] 중복확인 결과 : ", result);
    setVerificationClicked(true);
    if (typeof result === "string") {
      console.log("[inputField] 중복확인 결과, 형식 오류입니다. : ", result);
      setVerificationMessage(result);
      isUniqueSetter(false);
      setIsValid(false);
    } else {
      isUniqueSetter(result);
      setIsValid(result);
    }
  };

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={label} // id와 일치하게 수정
          className="block text-sm font-medium text-text-primary"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          id={label}
          value={getter}
          onChange={(e) => setter(e.target.value)}
          required={required ? true : false}
          className={`mt-1 block w-full px-4 py-2 border border-input-border rounded-md ${
            disabled ? "bg-gray-200" : "bg-input-bg"
          } hover:outline hover:outline-1 hover:outline-input-border-hover focus:outline-none focus:ring focus:ring-1 focus:ring-input-border-focused`}
          placeholder={disabled ? getter : placeholder} // disabled일 때 placeholder 메시지 수정
          disabled={disabled}
        />
        {checkUnique && (
          <button
            type="button"
            onClick={handleValidationClick}
            onTouchStart={handleValidationClick}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-m text-text-secondary"
          >
            중복확인
          </button>
        )}
      </div>
      {checkUnique && verificationClicked && (
        <p
          className={`mt-1 text-sm ${
            isValid ? "text-green-500" : "text-red-500"
          }`}
        >
          {isValid
            ? uniqueTrueMessage
              ? uniqueTrueMessage
              : "사용이 가능한 값입니다."
            : verificationMessage
              ? verificationMessage
              : uniqueFalseMessage
                ? uniqueFalseMessage
                : "이미 사용중이거나 불가능한 값입니다."}
        </p>
      )}
      {checkFormat && (
        <p className="mt-1 text-sm text-red-500">{checkFormatGetter}</p>
      )}
    </div>
  );
};
