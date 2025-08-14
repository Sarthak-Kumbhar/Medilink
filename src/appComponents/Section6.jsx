import gsap from "gsap";
import { useRef } from "react";

const Section6 = () => {
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);

  const boxes = [box1Ref, box2Ref, box3Ref];

  const handleEnter = (index) => {
    boxes.forEach((ref, i) => {
      if (!ref.current) return;
      const overlay = ref.current.querySelector(".overlay");

      if (i === index) {
        gsap.to(ref.current,
          { 
            zIndex: 50, 
            duration: 0.3 
          });
        gsap.to(overlay,
          { 
            opacity: 0,
            duration: 0.3 
          });
      } else {
        gsap.to(ref.current,
          { 
            zIndex: 10, 
            duration: 0.3 
          });
        gsap.to(overlay,
          { 
            opacity: 0.3,
            duration: 0.3 
          }
        );
      }
    });
  };

  const handleLeave = () => {
    boxes.forEach((ref) => {
      if (!ref.current) return;
      const overlay = ref.current.querySelector(".overlay");

      gsap.to(ref.current, { zIndex: 10, duration: 0.3 });
      gsap.to(overlay, { opacity: 0, duration: 0.3 });
    });
  };

  return (
    <div className="w-full h-screen p-6 select-none">
      <h1 className="text-4xl">FAQs</h1>
      <div className="w-full h-[520px] mt-12 relative overflow-hidden">
        <div
          ref={box1Ref}
          onMouseEnter={() => handleEnter(0)}
          onMouseLeave={handleLeave}
          className="w-full h-[240px] bg-[#E7EFC7] border border-2 absolute top-0 z-[10] cursor-pointer p-4 md:p-6"
        >
          <div className="overlay absolute inset-0 bg-black opacity-0 pointer-events-none" />
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-3xl">
              Model capable to generate any 3d model.
            </h1>
            <h1 className="text-2xl md:text-5xl font-medium font-[nippo]">3.</h1>
          </div>
          <p className="mt-16 md:ml-6">
            No, primarliy there is no feea but you have limited access to our
            model. for high end use case you can by pay minimum amount.
          </p>
        </div>
        <div
          ref={box2Ref}
          onMouseEnter={() => handleEnter(1)}
          onMouseLeave={handleLeave}
          className="w-full h-[240px] bg-[#E7EFC7]  border border-2 absolute top-[140px] z-[10] cursor-pointer p-4 md:p-6"
        >
          <div className="overlay absolute inset-0 bg-black opacity-0 pointer-events-none" />
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-3xl">Where are course details.</h1>
            <h1 className="text-2xl md:text-5xl font-medium font-[nippo]">2.</h1>
          </div>
          <p className="mt-22 md:mt-16 md:ml-6">
            No, primarliy there is no feea but you have limited access to our
            model. for high end use case you can by pay minimum amount.
          </p>
        </div>
        <div
          ref={box3Ref}
          onMouseEnter={() => handleEnter(2)}
          onMouseLeave={handleLeave}
          className="w-full h-[240px] bg-[#E7EFC7]  border border-2 absolute top-[280px] z-[10] cursor-pointer p-4 md:p-6"
        >
          <div className="overlay absolute inset-0 bg-black opacity-0 pointer-events-none" />
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-3xl">Is there any charges for using ai?</h1>
            <h1 className="text-3xl md:text-5xl font-medium font-[nippo]">1.</h1>
          </div>
          <p className="mt-8 md:mt-16 md:ml-6">
            No, But there limit to use it for better performance you can use our
            paid services, otheriwse by our course.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section6;
