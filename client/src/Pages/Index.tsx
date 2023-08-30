import React from 'react';
import { useNavigate } from 'react-router';
import Button from '../Components/Button';
import Heading from '../Components/Heading';


const Index = () => {
  const navigated = useNavigate();
  return (
    <main className='w-full h-screen flex flex-col gap-5 justify-center items-center'>
      <Heading title='Infinite & Pagination' subtitle='React Komponent' center/>
      <div className='flex flex-row gap-[10px] items-center'>
        <Button label='Pagination' onClick={() => navigated('/pagination')} outline/>
        <Button label='Infinite' onClick={() => navigated('/infinite')} outline/>
      </div>
    </main>
  );
};

export default Index
