import { IoIosArrowRoundForward } from "react-icons/io";

const CoursesInfromation = () => {
  return (
    <div className="w-full min-h-screen relative mt-22">
      <h1 className="text-3xl text-black font-semibold m-6">Courses</h1>
      <div className="text-4xl font-light ml-18 mt-12">
        Start Your Education,<br />
        with us.
      </div>
      <div className="w-[95%] min-h-[300px] absolute left-1/2 bottom-[-230px] transform -translate-x-1/2 flex flex-col justify-start items center md:flex-row gap-10 pb-4">
        <div className="w-[400px] h-full border border-black border-2 p-4">
          <h1 className="text-2xl font-semibold text-black">MBBS</h1>
          <div className="w-full h-[200px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(231,239,199,1)_100%),url(./assets/bannerMbbbs.jpg)] bg-center bg-cover mt-6"></div>
          <button className="mt-6 w-[150px] h-[50px] bg-[#437057] text-white cursor-pointer flex justify-between items-center pl-4 pr-4 text-xl">
            Start{" "}
            <span>
              <IoIosArrowRoundForward size={35} className="rotate-[30deg]" />
            </span>
          </button>
        </div>
        <div className="w-[400px] h-full border border-black border-2 p-4">
          <h1 className="text-2xl font-semibold text-black">BHMS</h1>
          <div className="w-full h-[200px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(231,239,199,1)_100%),url(./assets/bannerBhms.jpeg)] bg-center bg-cover mt-6"></div>
          <button className="mt-6 w-[150px] h-[50px] bg-orange-400 text-white cursor-pointer flex justify-between items-center pl-4 pr-4 text-xl">
            Start{" "}
            <span>
              <IoIosArrowRoundForward size={35} className="rotate-[30deg]" />
            </span>
          </button>
        </div>
      </div>

      <div className="w-[600px] h-[400px] absolute top-[-30px] right-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(231,239,199,0.50)_0%),linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(231,239,199,.80)_100%),linear-gradient(270deg,rgba(0,0,0,0)_0%,rgba(231,239,199,.40)_100%),url(./assets/bannerCourses.jpg)] bg-cover bg-center "></div>
    </div>
  );
};

export default CoursesInfromation;
