import React, { useRef, useEffect, useState } from 'react';
import { IoMdSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaCube } from "react-icons/fa6";

const Prompting = () => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    const resizeTextarea = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    if (textarea) {
      textarea.addEventListener('input', resizeTextarea);
      return () => textarea.removeEventListener('input', resizeTextarea);
    }
  }, []);

  return (
    <div className="bg-[#E7EFC7] text-[#3B3B1A] font-sans flex flex-col items-center justify-between min-h-screen overflow-hidden">
      <div id="chat-window" className="answer w-full max-w-5xl flex-1 overflow-y-auto p-6 space-y-4"></div>

      <div className="questions w-full max-w-5xl fixed bottom-0 border-t border-black bg-[#E7EFC7] z-10 p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2 h-[70px]">
            <div className="flex-1 border border-black overflow-hidden">
              <textarea
                ref={textareaRef}
                className="w-full h-full bg-transparent text-xl outline-none p-4 leading-tight resize-none"
                rows={1}
                placeholder="What are you thinking?"
              ></textarea>
            </div>
            <div className="w-[70px] flex justify-center items-center border border-black hover:cursor-pointer transition hover:bg-[#84AE92]">
              <IoMdSend className="w-[30px] h-[30px]" />
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="w-[50px] h-[50px] border border-black flex justify-center items-center hover:cursor-pointer hover:bg-[#84AE92] transition relative">
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
              <GrAttachment className="text-xl"/>
            </div>
            <div
              id="web"
              className="w-[50px] h-[50px] border border-black flex justify-center items-center hover:cursor-pointer hover:bg-[#84AE92] transition"
            >
              <FaEarthAmericas className="text-xl" />
            </div>

            <div className="w-[50px] h-[50px] border border-black flex justify-center items-center hover:cursor-pointer hover:bg-[#84AE92] transition">
              <FaCube className="text-xl"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompting;
