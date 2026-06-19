import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Platform from "./pages/Platform";
import Solutions from "./pages/Solutions";
import Industries from "./pages/Industries";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true,         element: <Home /> },
      { path: "platform",    element: <Platform /> },
      { path: "solutions",   element: <Solutions /> },
      { path: "industries",  element: <Industries /> },
      { path: "about",       element: <About /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}