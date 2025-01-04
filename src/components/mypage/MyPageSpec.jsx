import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { BASE_URL } from "../../api/config";
import stApi from "../../api/axiosInterceptor";

export const MyPageSpec = () => {
  const [specs, setSpecs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSpecs = async () => {
      try {
        const response = await fetch("users/specs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (!response.ok) {
          throw new Error("fetch specs failed.");
        }
        const data = await response.json();
        setSpecs(data.success.specs);
      } catch (error) {
        console.error("Error fetching specs:", error);
      }
    };

    fetchSpecs();
  }, []);

  const handleSortByDate = () => {
    const sortedSpecs = [...specs].sort(
      (a, b) => new Date(a.spec_date) - new Date(b.spec_date)
    );
    setSpecs(sortedSpecs);
  };

  const handleCreateSpec = async (newSpec) => {
    try {
      const response = await stApi.post(`${BASE_URL}/users/specs`, newSpec);
      if (!response.ok) {
        throw new Error("create spec failed");
      }
      const createdSpec = response;
      setSpecs([...specs, createdSpec]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating spec:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">스펙 관리</h1>
      </header>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleSortByDate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          날짜순으로 보기
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          스펙 생성하기
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        {specs.map((spec) => (
          <div key={spec.spec_id} className="border-b last:border-none py-2">
            <p className="text-lg font-semibold">스펙명: {spec.name}</p>
            <p>주관기관: {spec.host}</p>
            <p>날짜: {spec.spec_date}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
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
                handleCreateSpec(newSpec);
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
                  onClick={() => setIsModalOpen(false)}
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
      )}
    </div>
  );
};
