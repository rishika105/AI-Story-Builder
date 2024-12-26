import React from 'react'
import { StarsBackground } from '../components/StarsBackground'
import { Canvas } from '@react-three/fiber'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Error = () => {
  return (

<>
<Navbar/>
<div className="relative">
      <div className=' inset-0 z-[10px] h-[550px]'>
        <Canvas>
        <StarsBackground count={4000} />
      </Canvas>
      </div>

      <div className="text-white absolute z-[100px] mt-[-400px] flex justify-center flex-col items-center gap-3 ml-[32%]">
     <h1 className='text-6xl mt-4 font-extrabold'>404 Not Found!</h1>
   <p className='text-xl font-medium mt-3'>We can't find the page you are looking for!</p>
   <a href='/' className='underline text-darkgray-50'>Back to Homepage</a>

      </div>

  
    </div>

 <Footer/>

    </>
  )
}

export default Error
