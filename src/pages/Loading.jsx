export const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        <p className="text-xl font-semibold text-gray-700">
          <span className="inline-block animate-bounce">L</span>
          <span className="inline-block delay-100 animate-bounce">o</span>
          <span className="inline-block delay-200 animate-bounce">a</span>
          <span className="inline-block delay-300 animate-bounce">d</span>
          <span className="inline-block animate-bounce delay-400">i</span>
          <span className="inline-block delay-500 animate-bounce">n</span>
          <span className="inline-block animate-bounce delay-600">g</span>
          <span className="inline-block delay-700 animate-bounce">.</span>
          <span className="inline-block animate-bounce delay-800">.</span>
          <span className="inline-block animate-bounce delay-900">.</span>
        </p>
      </div>
    </div>
  );
};
