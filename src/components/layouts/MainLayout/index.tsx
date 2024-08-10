import { ReactNode } from "react";
import Siderbar from "./Siderbar";

interface MainLayoutProps {
  children: ReactNode;
}
const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  return (
    <div className="w-full h-screen overflow-auto flex bg-neutral-50 relative z-10">
      {/* <Siderbar /> */}
      <div className="w-full pt-6 pb-8 px-8">{children}</div>
    </div>
  );
};
export default MainLayout;
