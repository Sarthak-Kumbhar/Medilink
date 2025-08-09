import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Prompting from "./components/Prompting.jsx";
import {} from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "./store/store.js";
import Login from "./components/login.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
const googleID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: <Prompting />,
  },
  {
    path: "/login",
    element: <Login />,
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
