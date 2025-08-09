import { useEffect } from "react";
import gsap from "gsap";
import Typed from "typed.js";
import { IoMdSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaCube } from "react-icons/fa6";
import { LuMenu } from "react-icons/lu";
import { Link } from "react-router";

const Section1 = () => {
  useEffect(() => {
    const typed = new Typed("#slogen", {
      strings: ["Your Online tutor."],
      typeSpeed: 100,
      onComplete: () => {
        gsap.fromTo("#sub-slogen", { opacity: 0 }, { opacity: 1, duration: 3 });
        gsap.fromTo("#searchbar", { opacity: 0 }, { opacity: 1, duration: 3 });
      },
    });

    return () => typed.destroy();
  }, []);
  return (
    <section id="hero" className="w-full h-[100dvh] overflow-y-auto">
      <nav className="w-full h-[70px] border-b border-black flex justify-between text-black">
        <div className="w-full md:w-[200px] h-full border-r border-black flex justify-center items-center">
          <a href="/square.html">MediLink</a>
        </div>
        <div className="w-full md:w-[400px] h-full">
          <ul className="flex w-full h-full">
            <li className="w-[100px] h-full border-r border-l border-black pl-6 pr-6 md:flex items-center justify-center hover:bg-[#CAE8BD] transition hover:cursor-pointer hidden">
              <a href="#ft">About</a>
            </li>
            <li className="w-[100px] h-full pl-6 pr-6 hidden md:flex items-center justify-center hover:bg-[#CAE8BD] transition hover:cursor-pointer">
              Plans
            </li>
            <li className="w-[100px] h-full border-r border-l border-black pl-6 pr-6 hidden md:flex items-center justify-center hover:bg-[#CAE8BD] transition hover:cursor-pointer">
              <Link to={'/login'}>Login</Link>
            </li>
            <li className="w-full md:w-[100px] h-full pl-6 pr-6 flex items-center justify-center hover:bg-[#CAE8BD] transition hover:cursor-pointer">
              <LuMenu className="text-[#3b3b1a]"/>
            </li>
          </ul>
        </div>
      </nav>

      <div className="w-full h-[90vh] p-2 md:p-6">
        <div className="w-full h-full p-6 relative">
          <div
            id="slogen"
            className="text-6xl md:text-9xl font-[nippo] font-normal flex"
          ></div>
          <div
            id="sub-slogen"
            className="font-black font-normal text-xl ml-2 opacity-0"
          >
            Met your new AI powered tutor, bringing your imaginations to
            real-life.
          </div>
          <div
            id="searchbar"
            className="w-full h-[200px] md:h-1/2 mt-16 border border-black p-6 opacity-0"
          >
            <div className="w-full h-[50px] md:h-1/2 border border-black flex">
              <input
                type="text"
                className="w-full h-full bg-transparent outline-none border-none p-4 text-[14px] md:text-3xl"
                placeholder="What are you imagin now ..."
              />
              <Link to={"/chat"}>
              <div
                className="w-[100px] md:w-[300px] h-full border-l border-black flex justify-center items-center hover:bg-[#84AE92] transition hover:cursor-pointer"
              >
                <IoMdSend className="text-[#3B3B1A] md:w-[50px] md:h-[50px] w-[20px] h-[20px]"/>
              </div></Link>
            </div>

            <div className="w-full md:w-1/3 h-[50px] md:h-1/2 flex space-x-4 mt-2">
              <div className="border border-black w-1/3 h-full flex justify-center items-center hover:bg-[#84AE92] transition hover:cursor-pointer">
                <GrAttachment className="text-2xl text-[#3b3b1a]"/>
              </div>
              <div className="border border-black w-1/3 h-full flex justify-center items-center hover:bg-[#84AE92] transition hover:cursor-pointer">
                <FaEarthAmericas className="text-2xl text-[#3b3b1a]"/>
              </div>
              <div className="border border-black w-1/3 h-full flex justify-center items-center hover:bg-[#84AE92] transition hover:cursor-pointer">
                <FaCube className="text-2xl text-[#3b3b1a]"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
