import { Link } from "react-router";

const Plans = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-full flex flex-col-reverse md:flex-row justify-evenly items-center md:pt-30 pt-22 p-4 gap-10">
        <Link
          to={`/plans/pro/pay`}
          className="w-full md:w-1/4 min-h-[500px] border border-black p-4 cursor-pointer hover:shadow-xl transition flex flex-col justify-between"
        >
          <div className="w-full h-auto flex flex-col">
            <h1 className="font-medium text-2xl">PRO</h1>
            <hr className="mt-4 opacity-30" />
            <h2 className="mt-3">A peak usage you get with this plan.</h2>
            <ul className="mt-4 list-disc p-6">
              <li>Unlimited Ai Access</li>
              <li>Free Access to one Courses</li>
              <li>Download Any docs</li>
              <li>Audio transcript free</li>
              <li>New updates are available</li>
            </ul>
          </div>
          <div className="w-full h-auto flex flex-col">
            <hr className="opacity-30" />
            <h3 className="mt-2">*terms and condition are applied</h3>
            <h1 className="mb-4 mt-6 mr-2 text-2xl font-semibold">$100</h1>
          </div>
        </Link>
        <Link
          to={`/plans/max/pay`}
          className="w-full md:w-1/4 min-h-[500px] border border-black p-4 cursor-pointer hover:shadow-xl transition flex flex-col justify-between"
        >
          <div className="w-full h-auto flex flex-col">
            <h1 className="font-medium text-2xl">MAX</h1>
            <hr className="mt-4 opacity-30" />
            <h2 className="mt-3">A middle man gives you good access.</h2>
            <ul className="mt-4 list-disc p-6">
              <li>Download Any Docs</li>
              <li>Audio Transcript Free</li>
              <li>New updates are available</li>
            </ul>
          </div>
          <div className="w-full h-auto flex flex-col">
            <hr className="opacity-30" />
            <h3 className="mt-2">*terms and condition are applied</h3>
            <h1 className="mb-4 mt-6 mr-2 text-2xl font-semibold">$50</h1>
          </div>
        </Link>
        <Link
          to={`/plans/min/pay`}
          className="w-full md:w-1/4 min-h-[500px] border border-black p-4 cursor-pointer hover:shadow-xl transition flex flex-col justify-between"
        >
          <div className="w-full h-auto flex flex-col">
            <h1 className="font-medium text-2xl">MIN</h1>
            <hr className="mt-4 opacity-30" />
            <h2 className="mt-3">
              For normal usage, this plan gives you wings.
            </h2>
            <ul className="mt-4 list-disc p-6">
              <li>Free Access to one Course</li>
              <li>Download Any Docs</li>
              <li>New updates are available</li>
            </ul>
          </div>
          <div className="w-full h-auto flex flex-col">
            <hr className="opacity-30" />
            <h3 className="mt-2">*terms and condition are applied</h3>
            <h1 className="mb-4 mt-6 mr-2 text-2xl font-semibold">$20</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Plans;
