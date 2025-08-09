import Section1 from "./appComponents/Section1.jsx";
import Section2 from "./appComponents/Section2.jsx";
import Section3 from "./appComponents/Section3.jsx";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { getMe } from "./features/authSlice.js";
import { ReactLenis } from 'lenis/react'
import gsap from "gsap";
import Section4 from "./appComponents/Section4.jsx";

const App = () => {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <Section1 />
      <Section2 />
      <Section4 />
      <Section3 />
    </>
  );
};

export default App;
