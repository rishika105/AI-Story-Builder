import React from 'react'
import { StarsBackground } from '../components/StarsBackground'
import { Canvas } from '@react-three/fiber'
import Footer from '../components/Footer'

const Error = () => {
  return (

<>
<div className="relative">
      <Canvas className='absolute inset-0'>
        <StarsBackground />
      </Canvas>
      <div className="text-white relative">
        This is the error page
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Error
