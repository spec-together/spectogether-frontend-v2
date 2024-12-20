import { PageHeader } from "../header/PageHeader";

export const PageHeaderLayoutPage = ({ children }) => {
  return (
    <div className="flex flex-col px-2">
      <PageHeader />
      {children}
    </div>
  );
};
