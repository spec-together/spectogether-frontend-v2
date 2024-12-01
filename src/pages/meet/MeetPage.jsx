import { useEffect, useState } from "react";
import { getMeetroomByUserId } from "../../api/conversations/meetroom/getMeetroomByUserId";
import { useNavigate } from "react-router-dom";

export const MeetPage = () => {
  const [myMeetroom, setMyMeetroom] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 내비게이션 기능을 얻습니다.

  useEffect(() => {
    const fetchMeetrooms = async () => {
      const meetrooms = await getMeetroomByUserId();
      console.log("meetrooms : ", meetrooms);
      if (!meetrooms) {
        navigate("/login"); // 로그인 페이지로 이동
      }
      setMyMeetroom(meetrooms);
    };

    fetchMeetrooms();
  }, []);

  // 채팅방 클릭 시 호출되는 함수
  const handleMeetroomClick = (meetroom) => {
    navigate(`/meet/${meetroom.id}`, { state: { name: meetroom.name } }); // 해당 채팅방으로 이동
  };

  return (
    <div className="flex flex-col items-center bg-bg-primary min-h-screen">
      <h1 className="font-gmarket text-2xl font-bold text-center mt-6 p-4 text-gray-800">
        Meet Page
      </h1>
      <div className="w-full max-w-md">
        {myMeetroom.map((meetroom) => (
          <div
            key={meetroom.id}
            onClick={() => handleMeetroomClick(meetroom)} // 클릭 시 채팅방 열기
            className="my-3 p-4 cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <h2 className="font-gmarket text-lg text-gray-800">
              {meetroom.name}
            </h2>
            <p className="text-gray-600">채팅방 ID: {meetroom.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
