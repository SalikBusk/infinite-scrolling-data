import React from 'react'

interface HeadingProps {
  title?: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ 
  title, 
  subtitle,
  center
}) => {
  return ( 
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-5xl font-bold text-black">
        {title}
      </div>
      <div className="font-light text-neutral-500 mt-2 text-xl">
        {subtitle}
      </div>
    </div>
   );
}
 
export default Heading;