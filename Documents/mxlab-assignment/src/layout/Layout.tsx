import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  // 단축키 이벤트 등록
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isToggle =
        (isMac && e.metaKey && e.key === "b") ||
        (!isMac && e.ctrlKey && e.key === "b");

      if (isToggle) {
        e.preventDefault();
        setShowSidebar((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* 사이드바 */}
        <div
          className={`transition-all duration-300 ${
            showSidebar ? "w-64" : "w-0"
          } overflow-hidden`}
        >
          <Sidebar />
        </div>

        {/* 콘텐츠 */}
        <main className="flex-1 p-6 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
