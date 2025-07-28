import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* 상단 헤더 */}
      <Header />

      {/* 본문 영역: 사이드바 + 콘텐츠 */}
      <div className="flex flex-1">
        {/* 좌측 사이드바 */}
        <Sidebar />

        {/* 우측 콘텐츠 */}
        <main className="flex-1 p-6 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
