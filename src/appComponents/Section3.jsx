import { useEffect } from "react";

const Section3 = () => {

  useEffect(() => {
    const frames = [
      '[ ░░░░░░░░░░ ]',
      '[ ▒▒▒▒▒▒▒▒▒▒ ]',
      '[ ▓▓▓▓▓▓▓▓▓▓ ]',
      '[ ██████████ ]',
      '[ ▓▓▓▓▓▓▓▓▓▓ ]',
      '[ ▒▒▒▒▒▒▒▒▒▒ ]',
    ];

    const ascii = document.getElementById('ascii');
    let i = 0;

    const interval = setInterval(() => {
      if (ascii) ascii.textContent = frames[i];
      i = (i + 1) % frames.length;
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="ft" className="w-full h-[100dvh] relative text-black">
      <div className="absolute bottom-0 w-full h-1/2 bg-[#84AE92] p-6">
        <h1 className="text-7xl md:text-9xl font-[array]">Medilink</h1>
        <div className="max-w-[500px]">
          <ul className="flex space-x-4">
            <li className="hover:underline cursor-pointer">Instagram</li>
            <li className="hover:underline cursor-pointer">Facebook</li>
            <li className="hover:underline cursor-pointer">Linkedin</li>
          </ul>
        </div>
        <pre
          id="ascii"
          className="absolute bottom-7 right-0 md:right-10 text-4xl md:text-6xl"
        ></pre>
      </div>
    </footer>
  );
};

export default Section3;
