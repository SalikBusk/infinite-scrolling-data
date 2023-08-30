import React from 'react'

interface CardProps {
  thumbail: string;
  title: string;
  load?: boolean;
}

const Card: React.FC<CardProps> = ({ thumbail, title, load }) => {
  // Komponent til at vise individuelt indlægskort
  return (
    <figure>
      <img
        className={`w-full h-[65vh] rounded-[10px] ${
          load ? "blur-sm bg-black" : ""
        }`}
        src={thumbail}
        alt=""
      />
      <figcaption className='mt-4'>
        <h2 className="text-4xl">{title}</h2>
      </figcaption>
    </figure>
  );
};


export default Card