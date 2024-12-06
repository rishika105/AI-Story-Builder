import React from 'react';
import { Stars } from '@react-three/drei';

export function StarsBackground() {
  return (
    <Stars 
    radius={400}
    depth={90}
    count={10000}
    factor={7}
    saturation={0}
    fade={true} 
  />
  );
}
