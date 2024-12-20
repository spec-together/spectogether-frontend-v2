import { useState } from "react";
import { useGetUserTodoList } from "../../hooks/api-requests/useGetUserTodoList.jsx";
import { Loading } from "../../pages/Loading";
import { CompleteTodoModal } from "../modals/CompleteTodoModal";

export const MyTodoList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const { todos, loading } = useGetUserTodoList();

  const openModal = (todoId) => {
    if (todoId) {
      setSelectedTodoId(todoId);
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTodoId(null);
  };

  return (
    <div className="p-4 bg-blue-50">
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          {/* 완료 모달 */}
          {selectedTodoId && (
            <CompleteTodoModal
              isOpen={isOpen}
              onClose={closeModal}
              todoId={selectedTodoId}
            />
          )}

          {/* 할 일 목록 */}
          {todos.map((todo) => (
            <div
              key={todo.todo_id}
              className="p-4 transition duration-200 bg-white border border-blue-200 rounded-lg shadow-md cursor-pointer hover:bg-blue-50"
              onClick={() => openModal(todo.todo_id)}
            >
              <h3 className="text-xl font-semibold text-blue-700">
                {todo.title}
              </h3>
              <p className="text-blue-500">{todo.subtitle}</p>
              <p className="text-gray-500">
                마감일: {todo.deadline.split("T")[0]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTodoList;
