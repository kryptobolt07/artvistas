import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';
import gsap from 'gsap';

// Navigation Points Configuration
const NAVIGATION_POINTS = [
  {
    id: 'entrance',
    name: 'Museum Entrance',
    position: [0, 2, 10],
    lookAt: [0, 0, 0],
    description: 'Welcome to the virtual museum entrance'
  },
  {
    id: 'modernArt',
    name: 'Modern Art Section',
    position: [10, 4, 2],
    lookAt: [10, 4, 0],
    description: 'Contemporary art installations and exhibitions'
  },
  {
    id: 'classicalArt',
    name: 'Classical Art Wing',
    position: [-2, 4, 2],
    lookAt: [-2, 4, 0],
    description: 'Historical artworks from past centuries'
  }
];

// Styled Navigation Containers
const NavigationContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 20;
`;

const ArrowButton = styled.button`
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(200, 200, 200, 0.8);
    transform: scale(1.1);
  }

  svg {
    width: 30px;
    height: 30px;
    fill: #333;
  }
`;

const ExhibitWalkthrough = () => {
  const { scene } = useGLTF('/models/scene.gltf');
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const controlsRef = useRef(null);

  // Navigation Method with GSAP Animation
  const navigateTo = (point) => {
    if (!controlsRef.current) return;

    const controls = controlsRef.current;
    const camera = controls.object;

    // Animate camera position and look at point
    gsap.to(camera.position, {
      x: point.position[0],
      y: point.position[1],
      z: point.position[2],
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        controls.target.set(
          point.lookAt[0],
          point.lookAt[1],
          point.lookAt[2]
        );
        controls.update();
      }
    });
  };

  // Navigate to Previous Point
  const navigatePrevious = () => {
    const prevIndex = (currentPointIndex - 1 + NAVIGATION_POINTS.length) % NAVIGATION_POINTS.length;
    setCurrentPointIndex(prevIndex);
    navigateTo(NAVIGATION_POINTS[prevIndex]);
  };

  // Navigate to Next Point
  const navigateNext = () => {
    const nextIndex = (currentPointIndex + 1) % NAVIGATION_POINTS.length;
    setCurrentPointIndex(nextIndex);
    navigateTo(NAVIGATION_POINTS[nextIndex]);
  };

  return (
    <div className="exhibit-container" style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Arrow Navigation */}
      <NavigationContainer>
        <ArrowButton onClick={navigatePrevious}>
          <svg viewBox="0 0 24 24">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/>
          </svg>
        </ArrowButton>
        <ArrowButton onClick={navigateNext}>
          <svg viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
          </svg>
        </ArrowButton>
      </NavigationContainer>

      <Canvas 
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 2, 10], fov: 60 }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <primitive object={scene} scale={1.8} />
          <ambientLight intensity={1.25} />
          <pointLight position={[10, 10, 10]} intensity={1} />
        </Suspense>
        
        <OrbitControls 
          ref={controlsRef}
          maxDistance={20}
          minDistance={5}
          enableZoom={true}
          enablePan={true}
        />
      </Canvas>

      {/* Current Location Indicator */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(255,255,255,0.7)',
        padding: '10px',
        borderRadius: '5px'
      }}>
        {NAVIGATION_POINTS[currentPointIndex].name}
      </div>
    </div>
  );
};

export default ExhibitWalkthrough;

