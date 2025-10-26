import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router";

const Section4 = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      "#sec-4",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: "#sec-4",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        onComplete: () => {
          gsap.fromTo(
            ".titles",
            { y: 50, opacity: 0 },
            { opacity: 1, y: 0, duration: 0.5 }
          );

          gsap.utils.toArray(".box").forEach((box, index) => {
            gsap.fromTo(
              box,
              { opacity: 0, width: "0%" },
              {
                opacity: 1,
                width: index === 0 ? "45%" : "100%",
                duration: 1.5,
                onComplete: () => {
                  gsap.fromTo(
                    box.querySelectorAll(".title-1"),
                    { opacity: 0 },
                    { opacity: 1, duration: 1.5 }
                  );
                },
              }
            );
          });
        },
      }
    );
  }, []);

  return (
    <div
      id="sec-4"
      className="w-full min-h-screen bg-[#004030] flex flex-col lg:flex-row justify-between pt-6 pb-6 p-4 sm:p-6 md:p-8 lg:p-10 mt-6"
    >
      <div className="w-full lg:w-1/2 h-full p-4 sm:p-6 md:p-8 flex flex-col justify-center">
        <h1 className="titles max-w-[400px] text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium opacity-0">
          Enrich Your Learning.
        </h1>
        <p className="mt-4 sm:mt-6 md:mt-8 text-gray-200">
          Better understanding will improve your knowledge
        </p>
        <Link to="/courses/u" className="mt-6 sm:mt-8 md:mt-12 border border-white w-[130px] sm:w-[150px] h-[45px] sm:h-[50px] flex justify-between items-center pl-4 pr-4 text-base sm:text-lg md:text-xl text-white cursor-pointer hover:bg-white hover:text-[#004030] transition-all">
          Start
          <span>
            <IoIosArrowRoundForward size={28} className="rotate-[-30deg]" />
          </span>
        </Link>
      </div>

      <div className="w-full lg:w-1/2 h-full flex justify-end p-4 sm:p-6 md:p-8">
        <div className="box w-[0%] flex flex-col justify-end">
          <div className="w-full border-s-2 border-t-2 border-b-2 border-gray-300 p-4 sm:p-6">
            <h1 className="title-1 opacity-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-orange-500 mt-4 sm:mt-8">
              15
            </h1>
            <hr className="mt-4 sm:mt-6 text-white" />
            <h1 className="title-1 opacity-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white mt-2 sm:mt-4">
              Modules
            </h1>
          </div>
        </div>

        <div className="w-[45%] flex flex-col justify-end">
          <div className="box w-[0%] border-2 border-b-0 border-gray-300 p-4 sm:p-6">
            <h1 className="title-1 opacity-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-orange-500 mt-4 sm:mt-8">
              5
            </h1>
            <hr className="mt-4 sm:mt-6 text-white" />
            <h1 className="title-1 opacity-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white mt-2 sm:mt-4">
              Courses
            </h1>
          </div>
          <div className="box w-[0%] border-2 border-gray-300 p-4 sm:p-6">
            <h1 className="title-1 opacity-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-orange-500 mt-4 sm:mt-8">
              3
            </h1>
            <hr className="mt-4 sm:mt-6 text-white" />
            <h1 className="title-1 opacity-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white mt-2 sm:mt-4">
              Exams
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;
