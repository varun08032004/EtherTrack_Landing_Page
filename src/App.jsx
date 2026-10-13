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
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

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
      { path: "careers",        element: <Careers /> },
    ],
    errorElement: <NotFound />,
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </HelmetProvider>
  );
}