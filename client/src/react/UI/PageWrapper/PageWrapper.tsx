import { FC } from "react";
import "./page_wrapper.scss"

type PageWrapperPropsType = {
    children: React.ReactNode;
}

const PageWrapper : FC<PageWrapperPropsType> = ({ children }) => {
  return (
    <div className="page-wrapper">
      {children}
    </div>
  );
}

export default PageWrapper;