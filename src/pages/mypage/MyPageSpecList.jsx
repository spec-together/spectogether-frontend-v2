import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { BASE_URL } from "../../api/config";
import stApi from "../../api/axiosInterceptor";
import { useNavigate } from "react-router-dom";

export const MyPageSpecList = () => {
  const [specs, setSpecs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSpecs = async () => {
      try {
        const response = await stApi.get(`${BASE_URL}/users/specs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (!response.data) {
          throw new Error("fetch specs failed.");
        }
        setSpecs(response.data.success.specs);
      } catch (error) {
        console.error("Error fetching specs:", error);
      }
    };

    fetchSpecs();
  }, []);

  const handleCreateSpec = async (newSpec) => {
    try {
      const response = await stApi.post(`${BASE_URL}/users/specs`, newSpec);
      if (!response.data) {
        throw new Error("create spec failed");
      }
      setSpecs([...specs, response.data.success.spec]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating spec:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-800">내 스펙 관리</h1>

      <div className="flex justify-end w-full max-w-4xl mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-600"
        >
          스펙 생성하기
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-4xl">
        {specs.map((spec) => (
          <SpecCard key={spec.spec_id} spec={spec} />
        ))}
      </div>

      {isModalOpen && (
        <SpecCreationModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateSpec}
        />
      )}
    </div>
  );
};

const SpecCard = ({ spec }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("ko-KR");

  const handleCardClick = () => {
    console.log(`[SpecCard] spec_id: ${spec.spec_id}`);
    navigate(`/spec/${spec.spec_id}`);
  };

  return (
    <div
      className="m-4 w-full border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex gap-4 p-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-800">{spec.name}</h2>
            <span className="text-sm text-gray-500">
              {formatDate(spec.spec_date)}
            </span>
          </div>
          <p className="mb-3 text-gray-600">주관기관: {spec.host}</p>
          <p className="text-sm text-gray-500">{spec.content}</p>
        </div>
      </div>
    </div>
  );
};

const SpecCreationModal = ({ onClose, onCreate }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">스펙 생성하기</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newSpec = {
              name: formData.get("name"),
              host: formData.get("host"),
              spec_date: formData.get("spec_date"),
              content: formData.get("content"),
            };
            onCreate(newSpec);
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium">스펙명</label>
            <input
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">주관기관</label>
            <input
              name="host"
              type="text"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">날짜</label>
            <input
              name="spec_date"
              type="date"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">내용</label>
            <textarea
              name="content"
              rows="3"
              required
              className="w-full px-3 py-2 border rounded"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              생성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
