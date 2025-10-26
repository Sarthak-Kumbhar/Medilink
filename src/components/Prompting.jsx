import { useRef, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { FaEarthAmericas, FaCube } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Prompting = () => {
  const textareaRef = useRef(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((e) => e.auth);

  useEffect(() => {
    const textarea = textareaRef.current;
    const resizeTextarea = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    if (textarea) {
      textarea.addEventListener("input", resizeTextarea);
      return () => textarea.removeEventListener("input", resizeTextarea);
    }
  }, []);

  const Send = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    setInput("");
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      const response = await fetch(`${BACKEND_URL}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.message }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: data.message || "Something went wrong" },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error: Unable to reach AI server" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#E7EFC7] text-[#3B3B1A] font-sans flex flex-col items-center justify-between min-h-screen overflow-hidden mt-22">
      <div
        id="chat-window"
        className="answer w-full  max-w-5xl flex-1 overflow-y-auto p-6 space-y-4 mb-[200px]"
      >
        {messages.map((msg, i) => (
          <div key={i} className="flex gap-10">
            <div className="w-20 h-20">
              {msg.sender === "user" ? (
                <img
                  className="w-[30px] h-[30px]"
                  src={user?.avatar}
                  alt="user"
                ></img>
              ) : (
                <img
                  className="w-[30px] h-[30px]"
                  src="../src/assets/logo.webp"
                  alt="ai"
                ></img>
              )}
            </div>
            <div className="prose max-w-full break-words">
              {msg.sender === "user" ? (
                <div>{msg.text}</div>
              ) : i === messages.length - 1 && loading ? (
                <div>Loading...</div>
              ) : (
                <ReactMarkdown url>{msg.text}</ReactMarkdown>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="questions w-full max-w-5xl fixed bottom-0 border-t border-black bg-[#E7EFC7] z-10 p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2 h-[70px]">
            <div className="flex-1 border border-black overflow-hidden">
              <textarea
                ref={textareaRef}
                className="w-full h-full bg-transparent text-xl outline-none p-4 leading-tight resize-none"
                rows={1}
                placeholder="What are you thinking?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            <div
              className={`w-[70px] flex justify-center items-center border border-black hover:cursor-pointer transition ${
                loading
                  ? "opacity-50 pointer-events-none"
                  : "hover:bg-[#84AE92]"
              }`}
              onClick={Send}
            >
              <IoMdSend className="w-[30px] h-[30px]" />
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="w-[50px] h-[50px] border border-black flex justify-center items-center hover:cursor-pointer hover:bg-[#84AE92] transition relative">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <GrAttachment className="text-xl" />
            </div>
            <div
              id="web"
              className="w-[50px] h-[50px] border border-black flex justify-center items-center hover:cursor-pointer hover:bg-[#84AE92] transition"
            >
              <FaEarthAmericas className="text-xl" />
            </div>
            <div className="w-[50px] h-[50px] border border-black flex justify-center items-center hover:cursor-pointer hover:bg-[#84AE92] transition">
              <FaCube className="text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompting;
