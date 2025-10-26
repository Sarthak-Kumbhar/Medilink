import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Prompting from "./components/Prompting.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "./store/store.js";
import Login from "./components/Login.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CoursesInfromation from "./components/courses/CoursesInfromation.jsx";
import Navbar from "./components/Navbar.jsx";
import Protected from "./components/Protected.jsx";
import { AuthInitializer } from "./components/AuthInitializer.jsx";
import Plans from "./components/Plans.jsx";
import Payment from "./components/Payment.jsx";

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
      { path: "login", element: <Login /> },
      { path: "plans", element: <Plans/> },
      { path: "plans/:planName/pay",element: <Payment/>},
      { path: "courses/u", element: <CoursesInfromation /> },
      {
        element: <Protected />,
        children: [
          { path: "chat", element: <Prompting /> },
          
        ]
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleID}>
      <Provider store={Store}>
        <AuthInitializer>
           <RouterProvider router={router} />
        </AuthInitializer>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
