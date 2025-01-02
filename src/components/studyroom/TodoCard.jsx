export const TodoCard = ({ todo }) => {
  return (
    <div className="p-4 transition duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {todo.todo.title}
          </h3>
          <span className="text-sm font-medium text-gray-500">
            #{todo.todo.todo_id}
          </span>
        </div>
        <p className="text-gray-600">{todo.todo.content}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="px-2 py-1 text-blue-800 bg-blue-100 rounded-full">
            {todo.todo.status}
          </span>
          <span className="px-2 py-1 text-green-800 bg-green-100 rounded-full">
            {todo.todo.location}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>시작: {new Date(todo.todo.starts_at).toLocaleString()}</span>
          <span>종료: {new Date(todo.todo.ends_at).toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            작성자:{" "}
            <span className="font-medium">{todo.todo.creater.nickname}</span>
          </span>
          <span className="text-gray-400">
            작성일: {new Date(todo.todo.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};
