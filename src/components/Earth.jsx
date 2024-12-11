import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from "three";
//ASSETS
import EarthDayMap from "../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../assets/textures/8k_earth_clouds.jpg";

export function Earth(props) {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const earthRef = useRef();
  const cloudsRef = useRef();
  const orbitControlsRef = useRef();

  const [isZoomEnabled, setIsZoomEnabled] = useState(false);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 10;
    cloudsRef.current.rotation.y = elapsedTime / 7;
  });

  // Handle enabling/disabling zoom
  const handlePointerOver = () => setIsZoomEnabled(true);
  const handlePointerOut = () => setIsZoomEnabled(false);

  return (
    <>
      {/* Adjusted ambient and point light for larger size */}
      <ambientLight intensity={2.4} />
      <pointLight color="#f6f3ea" position={[5, 3, 5]} intensity={2.5} />

      {/* Clouds layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.41, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Earth layer */}
      <mesh
        ref={earthRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[2.4, 64, 64]} />
        <meshPhongMaterial specular specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>

      {/* OrbitControls */}
      <OrbitControls
        ref={orbitControlsRef}
        enableZoom={isZoomEnabled} // Zoom is enabled only when pointer is over Earth
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.4}
        panSpeed={0.6}
        rotateSpeed={0.5}
      />
    </>
  );
}
