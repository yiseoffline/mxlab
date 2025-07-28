// App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Contents from "./pages/Contents";
import Content from "./pages/Content";
import UploadContent from "./pages/UploadContent";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Contents /> },
        { path: "contents/:id", element: <Content /> },
        { path: "contents/upload", element: <UploadContent /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
