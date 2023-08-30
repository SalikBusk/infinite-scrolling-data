import React, { useEffect, useRef, useState } from "react";
import Container from "../Components/Container";
import Heading from "../Components/Heading";

import ImagesData from "../Data/Data";

// ... (import statements and initial code)

const ImagesViewport = () => {
  const [imageVisibility, setImageVisibility] = useState<boolean[]>([]);
  const boxRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const callbackFunction: IntersectionObserverCallback = (entries) => {
      const newVisibility = [...imageVisibility];
      entries.forEach((entry, index) => {
        newVisibility[index] = entry.isIntersecting && entry.intersectionRatio >= 0.5;
      });
      setImageVisibility(newVisibility);
    };

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(callbackFunction, options);
    const currentBoxRefs = boxRefs.current;

    currentBoxRefs.forEach((boxRef, index) => {
      if (boxRef) observer.observe(boxRef);
    });

    return () => {
      currentBoxRefs.forEach((boxRef) => {
        if (boxRef) observer.unobserve(boxRef);
      });
    };
  }, [imageVisibility]);

  return (
    <div>
      <Container>
        <section className="w-full h-screen flex flex-col items-center justify-center">
          <Heading title="Image viewport" />
        </section>

        <section className="flex flex-col gap-4">
          <Heading title="Gallery" />
          <div className="grid grid-cols-3 gap-[20px]">
            {ImagesData.map((items, i) => (
              <figure key={i}>
                <img
                  ref={(ref) => (boxRefs.current[i + 6] = ref)}
                  className={`w-full h-[50vh] rounded-md object-cover image ${
                    imageVisibility[i] ? "blur-none" : "blur-sm bg-white/30"
                  }`}
                  src={items.thumbnail}
                  alt=""
                />
                <figcaption className="mt-2">
                  <h2 className="text-3xl">{items.title}</h2>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default ImagesViewport;

