import { LuMenu } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { logout } from "../features/authSlice";

const Navbar = ({ child }) => {
  const { user, isAuthenticated } = useSelector((e) => e.auth);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        "#hamburger-menu",
        {
          x: "20%",
          opacity: 0,
        },
        {
          x: "0%",
          opacity: 1,
          duration: 1,
        }
      );
    }
  });

  const handlelogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <nav className="fixed top-0 bg-[#E7EFC7] z-999 w-full h-[70px] border-b border-black flex justify-between text-black">
        <div className="w-full md:w-[200px] h-full border-r border-black flex justify-center items-center">
          <a href="/">MediLink</a>
        </div>
        <div className="w-full md:w-[400px] h-full">
          <ul className="flex w-full h-full">
            {isAuthenticated && (
              <li className="w-[100px] h-full border-l border-black  md:flex items-center justify-center hover:bg-[#CAE8BD] transition hover:cursor-pointer hidden">
                <img
                  src={user?.avatar}
                  alt="avatar"
                  className="w-[30px] h-[30px]"
                />
              </li>
            )}
            <li className="w-[100px] h-full border-r border-l border-black pl-6 pr-6 md:flex items-center justify-center hover:bg-[#CAE8BD] transition hover:cursor-pointer hidden">
              <a href="#ft">About</a>
            </li>
            <li className="w-[100px] h-full pl-6 pr-6 hidden md:flex items-center justify-center hover:bg-[#CAE8BD] transition hover:cursor-pointer">
              Plans
            </li>
            <li className="w-[100px] h-full border-r border-l border-black pl-6 pr-6 hidden md:flex items-center justify-center hover:bg-[#CAE8BD] transition hover:cursor-pointer">
              {isAuthenticated ? (
                <a href="/" onClick={() => handlelogout()}>
                  Logout
                </a>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </li>
            <li
              className="w-full md:w-[100px] h-full pl-6 pr-6 flex items-center justify-center hover:bg-[#CAE8BD] transition hover:cursor-pointer"
              onClick={toggleMenu}
            >
              <LuMenu className="text-[#3b3b1a]" />
            </li>
          </ul>
        </div>
      </nav>
      
      <div
        id="hamburger-menu"
        className={`z-999 w-1/2 md:w-[200px] h-50 fixed top-[13%] right-1 p-4${
          isMenuOpen ? "" : " hidden"
        }`}
      >
        <ul className="w-full h-full">
          {isAuthenticated ? (
            <a href="/" onClick={() => handlelogout()}>
              <li className="w-full text-center mb-4 bg-[#437057] text-black p-1 cursor-pointer md:hidden">
                Logout
              </li>
            </a>
          ) : (
            <Link to="/login">
              <li className="w-full text-center mb-4 bg-[#437057] text-black p-1 cursor-pointer md:hidden">
                Login
              </li>
            </Link>
          )}
          <li className="w-full text-center mb-4 bg-[#437057] text-black p-1 cursor-pointer md:hidden">
            About
          </li>
          <Link to="/courses/u">
            <li className="w-full z-999 text-center mb-4 bg-[#437057] text-black p-1 cursor-pointer">
              Courses
            </li>
          </Link>
          {isAuthenticated && (
            <li className="w-full text-center mb-4 bg-[#437057] text-black p-1 cursor-pointer flex items-center justify-center gap-3 md:hidden">
              <img src={user?.avatar} alt="avatar" className="w-8 h-8" />
              {user?.name?.split(" ")[0]}
            </li>
          )}
        </ul>
      </div>
      <>{child}</>
    </>
  );
};

export default Navbar;
