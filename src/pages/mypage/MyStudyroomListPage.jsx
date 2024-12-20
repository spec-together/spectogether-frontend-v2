import { StudyroomCard } from "../components/studyroom/StudyroomCard";
import { useGetStudyrooms } from "../hooks/useGetStudyrooms";
import { Loading } from "./Loading";

export const MyStudyroomListPage = () => {
  const { studyrooms, loading } = useGetStudyrooms();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">내 스터디룸</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-center">
          {studyrooms.map((studyroom) => (
            <StudyroomCard key={studyroom.studyroom_id} studyroom={studyroom} />
          ))}
        </div>
      )}
    </div>
  );
};
