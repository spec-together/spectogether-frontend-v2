import meetApi from "../axiosInterceptor";

export const handleCreateStudyroom = async (studyroomData) => {
  const req = {
    title: studyroomData.title,
    subtitle: studyroomData.subtitle,
    area_id: studyroomData.areaId,
    profile_image: studyroomData.profileImage,
    target_type: studyroomData.targetType,
    target_id: studyroomData.targetId,
  };

  try {
    const result = await meetApi.post("/studyroom", req);
    return result;
  } catch (error) {
    console.error(`[handleCreateStudyroom] error`, error);
    throw error;
  }
};
