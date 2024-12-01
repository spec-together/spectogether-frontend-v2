import { CustomInputFieldWithLabel } from "../CustomInputFieldWithLabel.jsx";
import { useState } from "react";
import axios from "axios";

// 비회원 (회원가입 상황) 이메일 인증
export const EmailCheckNonUser = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");

  const submitEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9999/api-test/send-verification-email",
        { email: email },
      );
      if (res.data.code === 200) {
        setMessage1(res.data.message);
      } else if (res.data.code === 409) {
        setMessage1(res.data.message);
      } else if (res.data.code === 500) {
        setMessage1(res.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const verifyToken = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9999/api-test/verify-email",
        { token: token },
      );
      if (res.data.code === 200) {
        setMessage2(res.data.message);
      } else if (res.data.code === 401) {
        setMessage2(res.data.message);
      }
    } catch (e) {}
  };
  return (
    <div className="w-1/2">
      <CustomInputFieldWithLabel
        label="이메일"
        type="email"
        placeholder={"이메일 입력"}
        getter={email} // value={email}
        setter={setEmail} // onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="inset-y-0 right-0 flex items-center px-4 text-m text-text-secondary"
        onClick={submitEmail}
      >
        인증코드 받기
      </button>
      <span>{message1}</span>
      <br />
      <br />
      <CustomInputFieldWithLabel
        label="인증코드"
        type="token"
        placeholder={"인증코드 입력"}
        getter={token} // value={token}
        setter={setToken} // onChange={(e) => setToken(e.target.value)}
      />
      <button
        className="inset-y-0 right-0 flex items-center px-4 text-m text-text-secondary"
        onClick={verifyToken}
      >
        인증하기
      </button>
      <span>{message2}</span>
      {/*<span>{email}</span>*/}
    </div>
  );
};

// import { useState, useEffect } from "react";
// import axios from "axios";
//
// export const EmailCheck = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("이메일 인증을 위한 이메일을 발송.");
//
//   const submitEmail = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:9999/api-test/send-verification-email",
//         {
//           email: email,
//           // user_id
//         },
//       );
//       console.log(res);
//       if (res.data.code === 200) {
//         setMessage("이메일을 확인해주세요.");
//       } else if (res.data.code === 409) {
//         setMessage(res.data.message); // 사용할 수 없는 이메일입니다.
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };
//
//   useEffect(() => {
//     const verifyEmail = async () => {
//       const token = searchParams.get("token");
//       if (token) {
//         try {
//           const res = await axios.post(
//             "http://localhost:9999/api-test/verify-email",
//             { token },
//           );
//           if (res.data.code === 200) {
//             setMessage("이메일 인증이 완료되었습니다.");
//           } else {
//             setMessage("이메일 인증에 실패했습니다.");
//           }
//         } catch (e) {
//           console.error(e);
//           setMessage("서버 오류가 발생했습니다.");
//         }
//       } else {
//         setMessage("유효하지 않은 요청입니다.");
//       }
//     };
//
//     verifyEmail();
//   }, [searchParams]);
//
//   return (
//     <>
//       <form>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           required
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//         />
//         <br />
//         <button onClick={submitEmail}>Send Verification Email</button>
//         <br />
//         <p>{message}</p>
//       </form>
//     </>
//   );
// };
//
// // EmailVerification.jsx
// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";
//
// export const EmailVerification = () => {
//   const [searchParams] = useSearchParams();
//   const [message, setMessage] = useState("이메일 인증 중...");
//
//   useEffect(() => {
//     const verifyEmail = async () => {
//       const token = searchParams.get("token");
//       if (token) {
//         try {
//           const res = await axios.post(
//             "http://localhost:9999/api-test/verify-email",
//             { token },
//           );
//           if (res.data.code === 200) {
//             setMessage("이메일 인증이 완료되었습니다.");
//           } else {
//             setMessage("이메일 인증에 실패했습니다.");
//           }
//         } catch (e) {
//           console.error(e);
//           setMessage("서버 오류가 발생했습니다.");
//         }
//       } else {
//         setMessage("유효하지 않은 요청입니다.");
//       }
//     };
//
//     verifyEmail();
//   }, [searchParams]);
//
//   return (
//     <div>
//       <p>{message}</p>
//     </div>
//   );
// };
