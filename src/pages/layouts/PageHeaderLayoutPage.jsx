import { PageHeader } from "../../components/header/PageHeader.jsx";

export const PageHeaderLayoutPage = ({ children }) => {
  return (
    <div className="flex flex-col px-2">
      <PageHeader />
      {children}
    </div>
  );
};
