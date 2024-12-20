import { useEffect, useState } from "react";
import stApi from "../../api/axiosInterceptor.js";
import { GET_USER_TODOS } from "../../api/config.js";

export const useGetUserTodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        console.log(`[useGetUserTodoList] 데이터를 불러오는 중...`);
        const result = await stApi.get(GET_USER_TODOS);
        setTodos(result.data.success.todos);
        console.log(`[useGetUserTodoList] result`, result.data.success);
      } catch (error) {
        console.error(`[useGetUserTodoList] error`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return { todos, loading };
};
