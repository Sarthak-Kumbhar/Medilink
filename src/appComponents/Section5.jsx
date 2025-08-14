import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { gsap } from "gsap";
import "./appComponent.css"

export default function Section5() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const buttonRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    gsap.to(overlayRef.current, {
      opacity: isPlaying ? 0 : 0.50,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [isPlaying]);

  useEffect(() => {
    gsap.to(buttonRef.current, {
      opacity: hovered ? 1 : 0,
      scale: hovered ? 1 : 0.8,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [hovered]);

  return (
    <div className="w-full h-screen bg-[#004030] flex justify-center items-center">
      <div
        className="relative w-[80%] h-[80%] bg-red-100 overflow-hidden Ai-video"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/33400053/14218204_2560_1440_30fps.mp4" />
        </video>
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: 0 }}
        />

        <button
          ref={buttonRef}
          onClick={togglePlay}
          className="absolute bottom-5 right-5 flex items-center justify-center z-20 opacity-0"
        >
          <div className="w-15 h-15 border border-white rounded-md flex items-center justify-center shadow-lg">
            {isPlaying ? (
              <FaPause className="text-white text-xl" />
            ) : (
              <FaPlay className="text-white text-xl" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
