import { useEffect } from "react";

// TODO 연월일 붙이는 거
const useFormatBirthDate = (data, setData) => {
  useEffect(() => {
    const validateInput = (input) => {
      const date = input.replace(/[^0-9]/g, "").slice(0, 8); // 숫자만 허용 및 6자리로 제한

      const regex = /^(\d{0,4})(\d{0,2})(\d{0,2})$/; // 6자리의 YYMMDD 형식

      const match = date.match(regex);
      const [, yy, mm, dd] = match;
      // 월(mm)과 일(dd) 유효성 검사
      if (mm < 1 || mm > 12) return yy + mm.slice(0, 2);
      if (dd < 1 || dd > 31) return yy + mm + dd.slice(0, 2);

      if (date.length <= 4)
        return date; // 2자리 이하
      else if (date.length <= 6)
        return yy + mm; // 3~4자리
      else return yy + mm + dd; // 5~6자리
    };

    if (data) {
      const formattedNumber = validateInput(data);
      if (formattedNumber !== data) {
        setData(formattedNumber);
      }
    }
  }, [data, setData]);
};

export default useFormatBirthDate;
