import { useState } from "react";
import { CustomInputFieldWithLabel } from "../CustomInputFieldWithLabel.jsx";
import { CustomSubmitButton } from "../CustomSubmitButton.jsx";

export const SetSpecificProfilePage = () => {
  // 닉네임, MBTI, 해시태그, 한줄소개, 동네인증 을 받음
  const [nickname, setNickname] = useState("");
  const [mbti, setMbti] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md mx-2 p-8 space-y-6 bg-white shadow-lg rounded-lg transform transition-all hover:shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-700">
          프로필 설정
        </h1>

        <CustomInputFieldWithLabel
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          getter={nickname}
          setter={setNickname}
          className="mb-4"
        />

        <CustomInputFieldWithLabel
          label="MBTI"
          placeholder="MBTI를 입력해주세요."
          value={mbti}
          getter={mbti}
          setter={setMbti}
          className="mb-4"
        />

        <CustomInputFieldWithLabel
          label="해시태그"
          placeholder="해시태그를 입력해주세요."
          value={hashtags}
          getter={hashtags}
          setter={setHashtags}
          className="mb-4"
        />

        <CustomInputFieldWithLabel
          label="한줄소개"
          placeholder="한줄소개를 입력해주세요."
          value={introduce}
          getter={introduce}
          setter={setIntroduce}
          className="mb-4"
        />

        <CustomInputFieldWithLabel
          label="동네인증"
          placeholder="동네인증을 입력해주세요."
          value={location}
          getter={location}
          setter={setLocation}
          className="mb-4"
        />

        <CustomSubmitButton
          text="회원가입"
          className="w-full py-3 mt-6 font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-md transform transition hover:shadow-xl hover:scale-105"
        />
      </div>
    </div>
  );
};
