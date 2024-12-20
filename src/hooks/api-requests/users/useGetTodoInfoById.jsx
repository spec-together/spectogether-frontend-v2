import { useEffect, useState } from "react";
import stApi from "../../../api/axiosInterceptor.js";
import { GET_USER_TODOS } from "../../../api/config.js";

export const useGetTodoInfoById = (todoId) => {
  const [info, setInfo] = useState({});
  const [assignedMember, setAssignedMember] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        console.log(
          `[useGetTodoInfo] 데이터를 불러오는 중... todoId: ${todoId}`
        );
        const result = await stApi.get(`${GET_USER_TODOS}/${todoId}`);
        setInfo(result.data.success.info);
        setAssignedMember(result.data.success.assigned_member);
        console.log(`[useGetTodoInfo] result`, result.data.success);
      } catch (error) {
        console.error(`[useGetTodoInfo] error`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return { info, assignedMember, loading };
};
