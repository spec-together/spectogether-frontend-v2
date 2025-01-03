import { useNotice } from "../../hooks/api-requests/notice/useNotice";
import { Loading } from "../Loading";

const NoticeCard = ({ content }) => {
  return (
    <div className="p-6 mb-4 bg-white border-b border-black ">
      <p className="text-lg font-semibold">작성자: {content.author_nickname}</p>
      <p className="text-xl font-bold">[공지] {content.title}</p>
      <p className="mt-1 text-sm text-gray-500">
        게시일: {new Date(content.created_at).toLocaleDateString()}
      </p>
      <p className="mt-4 text-gray-700">{content.content}</p>
    </div>
  );
};

export const NoticePage = () => {
  const { data, isLoading } = useNotice();

  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col items-center p-4 mt-5 ">
      <h1 className="mb-8 text-3xl font-bold">공지사항</h1>
      <div className="w-full max-w-4xl">
        {data.notices.map((notice, index) => (
          <NoticeCard key={index} content={notice} />
        ))}
      </div>
    </div>
  );
};
