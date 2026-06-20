import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}