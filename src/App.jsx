import Section1 from "./appComponents/Section1.jsx";
import Section2 from "./appComponents/Section2.jsx";
import Section3 from "./appComponents/Section3.jsx";
import "./App.css";
import { useEffect, useRef } from "react";
import { ReactLenis } from 'lenis/react'
import gsap from "gsap";
import Section4 from "./appComponents/Section4.jsx";
import Section5 from "./appComponents/Section5.jsx";
import Section6 from "./appComponents/Section6.jsx";
import Section7 from "./appComponents/Section7.jsx";

const App = () => {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <Section7 />
      <Section2 />
      <Section5 />
      <Section1 />
      <Section4 />
      <Section6 />
      <Section3 />
    </>
  );
};

export default App;
