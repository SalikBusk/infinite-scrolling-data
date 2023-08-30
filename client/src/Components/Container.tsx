import React from 'react'

interface ContainerProps {
    children: React.ReactNode,
}

const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <main className='max-x-[2520px] xl:px-10 md:px-10'>
        {children}
    </main>
  )
}

export default Container