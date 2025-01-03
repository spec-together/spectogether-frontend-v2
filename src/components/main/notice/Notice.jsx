import { useEffect, useState } from "react";
import { DubogiButton } from "../../DubogiButton";
import { useNavigate } from "react-router-dom";
import { useNotice } from "../../../hooks/api-requests/notice/useNotice";

const NoticeCard = ({ title, content }) => {
  return (
    <div className="w-full py-4 border-b border-gray-300">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export const Notice = () => {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();
  const { data, isLoading } = useNotice();

  useEffect(() => {
    if (isLoading) return;
    setNotices(data?.notices);
  }, [isLoading, data]);

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <div className="flex flex-row items-center justify-between border-b border-black">
        <div className="px-2 mb-2 font-basic">공지사항</div>
        <DubogiButton onClick={() => navigate("/notice")} />
      </div>

      <div className="flex flex-col items-center">
        {notices?.length ? (
          notices.map((notice, index) => (
            <NoticeCard
              key={index}
              title={notice.title}
              content={notice.content}
            />
          ))
        ) : (
          <div className="mt-5 tracking-tight text-gray-700 font-pretendard">
            공지사항이 존재하지 않습니다.
          </div>
        )}
      </div>
    </div>
  );
};
