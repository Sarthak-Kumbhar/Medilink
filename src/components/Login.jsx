import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { FaGoogle } from "react-icons/fa";
import { googleLogin } from "../features/authSlice.js";

const Login = () => {
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      dispatch(googleLogin({ accessToken }));
    },
    onError: () => {
      console.error("Google login failed");
    },
  });

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-between">
      <div className="w-full lg:w-1/2 p-8 md:p-16 text-black flex flex-col">
        <h1 className="text-4xl md:text-6xl font-bold">Login</h1>

        <div className="mt-8 flex flex-col gap-6 w-full max-w-md">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="w-full border p-4 outline-none"
              placeholder="Enter your email"
              type="email"
              required
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
            />
          </div>

          <button className="h-14 bg-black text-white text-xl font-medium mt-4 hover:opacity-90 cursor-pointer" >
            Login
          </button>

          <button
            className="h-14 border flex justify-center items-center gap-2 mt-4 hover:bg-[#CAE8BD] cursor-pointer"
            onClick={() => login()}
          >
            <FaGoogle size={20} />
            <span>Login in with Google</span>
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/3 h-64 lg:h-screen bg-[url('https://images.pexels.com/photos/6153343/pexels-photo-6153343.jpeg')] bg-cover bg-center"></div>
    </div>
  );
};

export default Login;
