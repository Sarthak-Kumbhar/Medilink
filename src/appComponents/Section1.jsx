import { useEffect, useState } from "react";
import gsap from "gsap";
import Typed from "typed.js";
import { IoMdSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaCube } from "react-icons/fa6";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const Section1 = () => {
  const { user, isAuthenticated } = useSelector((e) => e.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <section id="hero" className="w-full min-h-screen relative">
      <div className="w-full h-[90vh] p-2 md:p-6 mt-12">
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
                <div className="w-[100px] md:w-[300px] h-full border-l border-black flex justify-center items-center hover:bg-[#84AE92] transition hover:cursor-pointer">
                  <IoMdSend className="text-[#3B3B1A] md:w-[50px] md:h-[50px] w-[20px] h-[20px]" />
                </div>
              </Link>
            </div>

            <div className="w-full md:w-1/3 h-[50px] md:h-1/2 flex space-x-4 mt-2">
              <div className="border border-black w-1/3 h-full flex justify-center items-center hover:bg-[#84AE92] transition hover:cursor-pointer">
                <GrAttachment className="text-2xl text-[#3b3b1a]" />
              </div>
              <div className="border border-black w-1/3 h-full flex justify-center items-center hover:bg-[#84AE92] transition hover:cursor-pointer">
                <FaEarthAmericas className="text-2xl text-[#3b3b1a]" />
              </div>
              <div className="border border-black w-1/3 h-full flex justify-center items-center hover:bg-[#84AE92] transition hover:cursor-pointer">
                <FaCube className="text-2xl text-[#3b3b1a]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
