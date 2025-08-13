import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Prompting from "./components/Prompting.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "./store/store.js";
import Login from "./components/login.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CoursesInfromation from "./components/courses/CoursesInfromation.jsx";
import Navbar from "./components/Navbar.jsx";

const googleID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "chat", element: <Prompting /> },
      { path: "login", element: <Login /> },
      { path: "courses/u", element: <CoursesInfromation /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleID}>
      <Provider store={Store}>
        <RouterProvider router={router} />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
