import React, { useRef, useEffect, useState } from 'react';
import { IoMdSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { FaEarthAmericas, FaCube } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
const cohereAPI = import.meta.env.VITE_COHERE_API_KEY

const Prompting = () => {
  const textareaRef = useRef(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { user, isAuthenticated } = useSelector((e) => e.auth);

  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }

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

  const Send = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    try {
      const response = await fetch('https://api.cohere.ai/v1/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cohereAPI}`,
          'Content-Type': 'application/json',
          'Cohere-Version': '2022-12-06'
        },
        body: JSON.stringify({
          model: 'command-a-03-2025',
          message: input,
          max_tokens: 100,
          temperature: 0.7
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.text }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: data.message || 'Something went wrong' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Error: Unable to reach AI server' }]);
    }

    setInput('');
    setLoading(false);
  };

  return (
    <div className="bg-[#E7EFC7] text-[#3B3B1A] font-sans flex flex-col items-center justify-between min-h-screen overflow-hidden">
      <div id="chat-window" className="answer w-full max-w-5xl flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className='flex gap-10'>
            <div className='w-20 h-20'>
              {
                msg.sender === "user" ? (<img className='w-[30px] h-[30px]' src={user?.avatar} alt='user'></img>) : (<img className='w-[30px] h-[30px]' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4N_soUiGggkq4TxayU7O_echs7FO8ISMD5w&s' alt='ai'></img>)
              }
            </div>
            <p >{msg.text}</p>
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
              className={`w-[70px] flex justify-center items-center border border-black hover:cursor-pointer transition ${loading ? 'opacity-50 pointer-events-none' : 'hover:bg-[#84AE92]'}`}
              onClick={Send}
            >
              <IoMdSend className="w-[30px] h-[30px]" />
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="w-[50px] h-[50px] border border-black flex justify-center items-center hover:cursor-pointer hover:bg-[#84AE92] transition relative">
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
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
