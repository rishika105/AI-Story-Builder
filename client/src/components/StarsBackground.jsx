import React from 'react';
import { Stars } from '@react-three/drei';

export function StarsBackground({count}) {
  return (
    <Stars 
    radius={400}
    depth={90}
    count={count}
    factor={7}
    saturation={0}
    fade={true} 
  />
  );
}
