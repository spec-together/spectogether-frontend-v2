import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { EventMainInfo } from "../../components/event/EventMainInfo.jsx";
import { EventSpecificInfo } from "../../components/event/EventSpecificInfo.jsx";
import { useGetEventInfo } from "../../hooks/api-requests/event/useGetEventInfo.jsx";
import { Loading } from "../Loading.jsx";

export const ContestSpecificsPage = () => {
  const { contestId } = useParams();
  const { contestInfo, loading } = useGetEventInfo(contestId);

  useEffect(() => {
    console.log(
      `[ContestSpecificsPage] 페이지를 불러왔습니다. contestId: ${contestId}`
    );
  }, []);

  // const contestInfo = {
  //   id: 1,
  //   thumbnail: "https://picsum.photos/id/1011/400/400.jpg",
  //   title: "공모전 1",
  //   subtitle: "공모전 1에 대한 상세 설명입니다.",
  //   application_period: "2021. 10. 01 ~ 2021. 10. 31",
  //   participation_period: "2021. 11. 01 ~ 2021. 11. 30",
  //   location: "온라인",
  //   details:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit tincidunt lorem, vel efficitur erat rhoncus et. Donec commodo, massa in dignissim sagittis, est odio porttitor metus, in pharetra ligula nisl sed dolor. Nunc et orci egestas, ultrices orci vel, ornare velit. Fusce posuere ac elit vulputate vulputate. Donec ut tempus risus. Morbi eget sollicitudin ex. Donec sit amet neque non diam eleifend ultrices. Morbi consequat rutrum erat, et interdum lectus maximus sed. Cras magna tellus, gravida vel metus et, ornare fermentum leo. Curabitur vitae aliquet tellus, eu hendrerit lectus. Pellentesque egestas congue libero, in pharetra mi ultrices in.",
  //   inquiries: "공모전 1에 대한 문의/기대평입니다.",
  //   applicationInfo:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit tincidunt lorem, vel efficitur erat rhoncus et. Donec commodo, massa in dignissim sagittis, est odio porttitor metus, in pharetra ligula nisl sed dolor. Nunc et orci egestas, ultrices orci vel, ornare velit. Fusce posuere ac elit vulputate vulputate. Donec ut tempus risus. Morbi eget sollicitudin ex. Donec sit amet neque non diam eleifend ultrices. Morbi consequat rutrum erat, et interdum lectus maximus sed. Cras magna tellus, gravida vel metus et, ornare fermentum leo. Curabitur vitae aliquet tellus, eu hendrerit lectus. Pellentesque egestas congue libero, in pharetra mi ultrices in.",
  // };

  return (
    <div className="mt-[2.69rem] mx-[7.13rem]">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <EventMainInfo contest={contestInfo} />
          <EventSpecificInfo contest={contestInfo} />
        </div>
      )}
    </div>
  );
};
