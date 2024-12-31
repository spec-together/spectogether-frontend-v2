import { useEffect } from "react";

const useFormatPassword = (data, setData) => {
  useEffect(() => {
    // 허용된 문자만 남기고 나머지 문자는 제거하는 정규식
    const regex = /[^a-zA-Z0-9!@#$%^&*()_+\[\]{};':"\\|,.<>/?`~\-]/g;

    // data에 허용되지 않은 문자가 있으면 수정
    if (regex.test(data)) {
      const formattedData = data.replace(regex, "");
      // 수정된 데이터가 원본과 다를 경우에만 setData 호출
      if (formattedData !== data) {
        setData(formattedData);
      }
    }
  }, [data, setData]); // 의존성 배열은 data만 필요
};

export default useFormatPassword;
