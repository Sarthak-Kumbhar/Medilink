import { useEffect } from 'react';
import Typed from 'typed.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "./appComponent.css";

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {

  useEffect(() => {
    gsap.fromTo(
      '#about',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
        scrollTrigger: {
          trigger: '#about',
          start: 'top center',
        },
        onComplete: () => {
          const questionTyped = new Typed('#question', {
            strings: ['What is an eye ?'],
            typeSpeed: 100,
            onComplete: () => {
              gsap.to('#send', {
                backgroundColor: 'lightgray',
                duration: 2,
                onComplete: () => {
                  const answerTyped = new Typed('#answer', {
                    strings: [
                      `The human eye is a remarkable and intricate sensory organ responsible for sight. It captures light from the environment and converts it into electrical signals. The brain then processes these signals into visual images. The eye uses various components to focus and interpret light, similar to a camera. Light enters through the transparent cornea and passes through the pupil. The iris controls the pupil, adjusting to environmental brightness. The lens focuses light onto the retina, a light-sensitive layer at the back of the eye. The retina contains photoreceptor cells called rods and cones. Rods enable vision in low light, while cones allow us to perceive colors and fine details in brighter conditions.`,
                    ],
                    onComplete: () => {
                      gsap.fromTo(
                        '#aiimg',
                        { opacity: 0 },
                        { opacity: 1, duration: 2 }
                      );
                    },
                  });
                },
              });
            },
          });

          return () => questionTyped.destroy();
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      className="w-full min-h-[100dvh] p-4 md:p-0 pt-4 pb-4 flex flex-col md:flex-row justify-between relative md:mb-0 mb-16 md:gap-0 gap-16 mt-8"
    >
      <div className="w-full md:w-1/2 h-full p-4">
        <h1 className="text-4xl">About</h1>
        <div className="max-w-[600px] mt-4">
          We are team of Engineers, Solving Problem that students face while there learning.
          our idea is to improve the student way of learing providing them better understanding on what they learn 😊
        </div>
      </div>

      <div className="w-full min-h-[500px] md:w-[600px] md:h-[500px] border border-black p-4 relative text-black md:mt-16 Ai">
        <div id="answer" className="text-[14px] md:text-[14px]"></div>

        <div
          id="aiimg"
          className="w-[100px] h-[100px] md:w-[200px] md:h-[100px] bg-[url('https://images.pexels.com/photos/879178/pexels-photo-879178.png')] bg-cover bg-center float-right mt-4 opacity-0 mb-16"
        ></div>

        <div className="absolute left-2 right-2 bottom-2 md:left-5 md:right-5 md:bottom-3 w-[95%] h-[50px] border border-black pl-4 p-2 flex justify-between">
          <div id="question" className="w-full h-full"></div>
          <div
            id="send"
            className="w-[50px] h-full flex justify-center items-center"
          >
            <img
              src="https://img.icons8.com/?size=100&id=85940&format=png&color=3B3B1A"
              className="md:w-[20px] md:h-[20px] w-[10px] h-[10px]"
              alt="send"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
