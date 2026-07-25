import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Platform from "./pages/Platform";
import Solutions from "./pages/Solutions";
import Industries from "./pages/Industries";
import About from "./pages/About";
import Blogs from "./pages/Insights";
import BlogPost from "./pages/BlogPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true,            element: <Home /> },
      { path: "platform",       element: <Platform /> },
      { path: "solutions",      element: <Solutions /> },
      { path: "industries",     element: <Industries /> },
      { path: "about",          element: <About /> },
      { path: "insights",       element: <Blogs /> },
      { path: "insights/:slug", element: <BlogPost /> },
    ],
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}