import { SearchHeader } from "../header/SearchHeader";

export const SearchHeaderLayoutPage = ({ children }) => {
  return (
    <div className="flex flex-col h-screen px-2">
      <SearchHeader />
      {children}
    </div>
  );
};
