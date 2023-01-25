import { Outlet } from "react-router-dom";
import PostBlock from "@/components/Post/PostBlock";
import Header from "@/components/Header";

function MainLayout() {
  return (
    <div className="wrapper">
      <div className="wrapper-content">
        <div className="content-left">
          <Outlet />
        </div>

        <div className="content-right">
          <Header />
          <h2 className="content-title">Posts</h2>
          <PostBlock />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
