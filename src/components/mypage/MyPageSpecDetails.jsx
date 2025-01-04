import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/config";
import stApi from "../../api/axiosInterceptor";

export const MyPageSpecDetails = () => {
  const { spec_id } = useParams();
  const [specDetails, setSpecDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecDetails = async () => {
      try {
        const response = await stApi.get(`${BASE_URL}/users/specs/${spec_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (!response.data) {
          throw new Error("Failed to fetch spec details.");
        }
        setSpecDetails(response.data.success.spec);
      } catch (error) {
        console.error("Error fetching spec details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecDetails();
  }, [spec_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!specDetails) {
    return (
      <div className="text-center mt-10">스펙 정보를 가져오지 못했습니다.</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {specDetails.name}
      </h1>
      <p className="text-gray-600 mb-4">주관기관: {specDetails.host}</p>
      <p className="text-gray-600 mb-4">
        날짜: {new Date(specDetails.spec_date).toLocaleDateString("ko-KR")}
      </p>
      <p className="text-gray-600">{specDetails.content}</p>
    </div>
  );
};
