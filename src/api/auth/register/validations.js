export const validatePhoneNumberFormat = (phoneNumber) => {
  // 한국 전화번호 정규식: 010, 011, 016, 017, 018, 019, 02, 031, 032, 033 등
  const phoneRegex =
    /^(010|011|016|017|018|019|02|031|032|033|034|041|042|043|044|051|052|053|054|055|061|062|063|064|070)-\d{3,4}-\d{4}$/;

  if (!phoneRegex.test(phoneNumber)) {
    console.log("[validation.js] 전화번호 형식 오류");
    return false;
  }

  return true;
};

export const validateEmailFormat = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    console.log("[validation.js] 이메일 형식 오류");
    return false;
  }

  return true;
};

export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z가-힣]+$/;
  if (!nameRegex.test(name)) {
    return "이름은 한글 또는 영어만 입력 가능합니다.";
  }
  return "";
};

export const validatePassword = (password) => {
  // 비밀번호가 영문, 숫자, 특수문자로만 이루어져 있는지 확인
  const regex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/;

  if (!regex.test(password)) {
    return "비밀번호는 8자 이상이어야 하며, 영문, 숫자, 특수문자를 각각 최소 1자 이상 포함해야 합니다.";
  }

  return "";
};
