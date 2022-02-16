import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

function MainLayout() {
  return (
    <div className="wrapper">
      <div className="wrapper-content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
