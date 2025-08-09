import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { FaGoogle } from "react-icons/fa";
import { googleLogin, normallogin } from "../features/authSlice.js";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((e) => e.auth);

  const handleSubmit = () => {
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const name = nameRef.current.value;
    dispatch(normallogin({ email, password, name }));
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between">
      <div className="w-full lg:w-1/2 p-8 md:p-16 text-black flex flex-col">
        <h1 className="text-4xl md:text-6xl font-bold">Login</h1>

        <div className="mt-8 flex flex-col gap-6 w-full max-w-md">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="w-full border p-4 outline-none"
              placeholder="Enter your email"
              type="name"
              required
              ref={nameRef}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="w-full border p-4 outline-none"
              placeholder="Enter your email"
              type="email"
              required
              ref={emailRef}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="w-full border p-4 outline-none"
              placeholder="Enter your password"
              type="password"
              required
              ref={passRef}
            />
          </div>

          <button
            className="h-14 bg-black text-white text-xl font-medium mt-4 hover:opacity-90 cursor-pointer"
            onClick={() => handleSubmit()}
          >
            Login
          </button>

          <GoogleLogin
            onSuccess={(e) => {
              const idtoken = e.credential;
              dispatch(googleLogin({ idtoken }));
            }}
            onError={(e) => {
              console.log(e);
            }}
            useOneTap
          />
        </div>
      </div>

      <div className="w-full lg:w-1/3 h-20 lg:h-screen bg-[url('https://images.pexels.com/photos/6153343/pexels-photo-6153343.jpeg')] bg-cover bg-center"></div>
    </div>
  );
};

export default Login;
