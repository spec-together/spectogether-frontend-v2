import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";

export const StudyroomInfo = ({ studyroom }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 m-4 bg-gradient-to-br from-indigo-200 to-indigo-700 rounded-xl shadow-2xl overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row backdrop-blur-md bg-black bg-opacity-10 p-6 rounded-xl">
        {/* 스터디룸 프로필 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mb-6 lg:w-1/3 lg:mb-0 lg:mr-6"
        >
          <img
            src={studyroom.profile_image}
            alt="studyroom-image"
            className="object-cover w-full h-64 rounded-lg shadow-lg"
          />
        </motion.div>

        {/* 스터디룸 정보 */}
        <div className="flex flex-col lg:w-2/3">
          {/* 제목 및 부제 */}
          <div className="pb-4 mb-6 border-b border-white border-opacity-20">
            <h1 className="text-3xl font-bold text-white font-gmarket">
              {studyroom.title}
            </h1>
            <p className="mt-2 text-lg italic text-gray-300">
              "{studyroom.subtitle}"
            </p>
          </div>

          {/* 목표 및 지역 */}
          <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-4 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm"
            >
              <p className="text-white">
                <span className="font-semibold">목표</span>
                <span className="block mt-1 text-lg text-gray-100">
                  {studyroom.goal}
                </span>
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-4 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm"
            >
              <p className="text-white">
                <FaMapMarkerAlt className="inline mr-1 text-gray-200" />
                <span className="font-semibold">지역</span>
                <span className="block mt-1 text-lg text-gray-100">
                  {studyroom.area.sido} {studyroom.area.gungu}
                </span>
              </p>
            </motion.div>
          </div>

          {/* 스터디 시작일 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-4 mb-6 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm"
          >
            <p className="text-white">
              <FaCalendarAlt className="inline mr-1 text-gray-200" />
              <span className="font-semibold">스터디 시작</span>
              <span className="block mt-1 text-lg text-gray-100">
                {new Date(studyroom.created_at).toLocaleString("ko-KR", {
                  timeZone: "Asia/Seoul",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
          </motion.div>

          {/* 스터디룸 멤버 */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-white">
              <FaUsers className="inline mr-2 text-gray-200" />
              스터디 멤버
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {studyroom.studyroom_members.map((member, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-between p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-md"
                >
                  <span className="text-white">{member.user.nickname}</span>
                  <div>
                    <span className="px-2 py-1 mr-1 text-xs font-semibold text-indigo-900 bg-indigo-200 rounded-full">
                      {member.role}
                    </span>
                    <span className="px-2 py-1 text-xs font-semibold text-green-900 bg-green-200 rounded-full">
                      {member.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
