import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import Button from "../Components/Button";
import Container from "../Components/Container";
import Heading from "../Components/Heading";

const ViewPort: React.FC = () => {
  const navigated = useNavigate();


  const [isVisible, setIsVisible] = useState(false);

  const boxRef = useRef<HTMLDivElement | null>(null); // Add type annotation

  useEffect(() => {
    const callbackFunction: IntersectionObserverCallback = (entries) => {
      // Add type annotation
      const [entry] = entries;
      setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.4); // Change visibility condition
    };

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4, // Change threshold to 0.3 (30%)
    };

    const observer = new IntersectionObserver(callbackFunction, options);
    const currentBoxRef = boxRef.current; // Store the current ref value
    if (currentBoxRef) observer.observe(currentBoxRef);

    return () => {
      if (currentBoxRef) observer.unobserve(currentBoxRef);
    };
  }, []); 
  return (
    <div>
      <Container>
        <header
          className={`fixed w-full py-4 px-2 ${
            isVisible ? "bg-rose-500" : "bg-gray-500"
          }`}
        >
          header
        </header>

        <section className="w-full h-[100vh] flex flex-col items-center justify-center">
          <Heading title="Scroll ned" subtitle="" center/>
          <Button label="Se også med billeder" onClick={() => navigated(`/ViewportImages`)}/>
        </section>

        <section className="flex flex-row items-center justify-center h-screen w-full">
            <div
              ref={boxRef}
              className={`w-[400px] h-[400px] rounded-md flex flex-col items-center justify-center ${
                isVisible ? "bg-rose-500" : "bg-gray-500"
              }`}
            >
                BOX
            </div>
        </section>

        <section className="w-full h-[100vh] flex flex-col items-center justify-center">
          <Heading title="Scroll ned" subtitle="" center/>
        </section>
      </Container>
    </div>
  );
};

export default ViewPort;
