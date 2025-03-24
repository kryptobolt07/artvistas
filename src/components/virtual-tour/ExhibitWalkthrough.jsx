import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei';
import styled from 'styled-components';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { Vector3, Raycaster } from 'three';
import './ExhibitWalkthrough.css';

// Navigation Points Configuration
const NAVIGATION_POINTS = [
  {
    id: 'entrance',
    name: 'Museum Entrance',
    position: [0, 1.6, 5],
    lookAt: [0, 1.6, 0],
    description: 'Welcome to the virtual museum entrance. Explore the gallery with interactive navigation.'
  },
  {
    id: 'modernArt',
    name: 'Modern Art Section',
    position: [4, 1.6, -2],
    lookAt: [0, 1.6, -2],
    description: 'Contemporary art installations showcasing innovative techniques and thought-provoking concepts.'
  },
  {
    id: 'classicalArt',
    name: 'Classical Art Wing',
    position: [-4, 1.6, -2],
    lookAt: [-4, 1.6, -5],
    description: 'Historical masterpieces from renowned artists throughout the centuries.'
  }
];

// Virtual Joystick for Mobile
const VirtualJoystick = ({ onMove }) => {
  const joystickRef = useRef(null);
  const knobRef = useRef(null);
  const [active, setActive] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [movement, setMovement] = useState({ x: 0, y: 0 });
  
  const handleStart = (e) => {
    e.preventDefault();
    const touch = e.touches ? e.touches[0] : e;
    if (!joystickRef.current) return;
    
    const rect = joystickRef.current.getBoundingClientRect();
    setOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setActive(true);
  };
  
  const handleMove = (e) => {
    e.preventDefault();
    if (!active || !knobRef.current) return;
    
    const touch = e.touches ? e.touches[0] : e;
    const maxDistance = 40; // Maximum distance the joystick can move
    
    let dx = touch.clientX - origin.x;
    let dy = touch.clientY - origin.y;
    
    // Normalize if distance is greater than maxDistance
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > maxDistance) {
      dx = (dx / distance) * maxDistance;
      dy = (dy / distance) * maxDistance;
    }
    
    // Update joystick position
    knobRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    
    // Calculate movement values (-1 to 1)
    const normalized = {
      x: dx / maxDistance,
      y: dy / maxDistance
    };
    setMovement(normalized);
    
    // Call the movement callback
    onMove(normalized);
  };
  
  const handleEnd = (e) => {
    e.preventDefault();
    if (!knobRef.current) return;
    
    // Reset joystick position
    knobRef.current.style.transform = 'translate(0, 0)';
    setActive(false);
    setMovement({ x: 0, y: 0 });
    onMove({ x: 0, y: 0 });
  };
  
  useEffect(() => {
    const knob = knobRef.current;
    
    if (!knob) return;
    
    knob.addEventListener('touchstart', handleStart);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
    
    return () => {
      knob.removeEventListener('touchstart', handleStart);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [active, origin]);
  
  return (
    <div className="virtual-joystick" ref={joystickRef}>
      <div 
        className="joystick-knob" 
        ref={knobRef}
        onTouchStart={handleStart}
      />
    </div>
  );
};

// Collision detection and movement logic
function MovementControls({ controlsRef, scene, speed = 0.1 }) {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  
  const [joystickMovement, setJoystickMovement] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const raycaster = useRef(new Raycaster());
  
  // Check if on mobile device
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);
  
  // Keyboard controls for desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Handle keydown events
      switch(e.key.toLowerCase()) {
        case 'w':
          setMovement(prev => ({ ...prev, forward: true }));
          break;
        case 's':
          setMovement(prev => ({ ...prev, backward: true }));
          break;
        case 'a':
          setMovement(prev => ({ ...prev, left: true }));
          break;
        case 'd':
          setMovement(prev => ({ ...prev, right: true }));
          break;
        default:
          break;
      }
    };
    
    const handleKeyUp = (e) => {
      // Handle keyup events
      switch(e.key.toLowerCase()) {
        case 'w':
          setMovement(prev => ({ ...prev, forward: false }));
          break;
        case 's':
          setMovement(prev => ({ ...prev, backward: false }));
          break;
        case 'a':
          setMovement(prev => ({ ...prev, left: false }));
          break;
        case 'd':
          setMovement(prev => ({ ...prev, right: false }));
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
  // Handle joystick movement for mobile
  const handleJoystickMove = (data) => {
    setJoystickMovement(data);
  };
  
  // Check for collisions in a given direction
  const checkCollision = (position, direction) => {
    if (!scene) return true;
    
    const collisionDistance = 0.8; // Distance to check for collisions
    
    // Set up raycaster
    raycaster.current.set(position, direction);
    
    // Check for intersections with objects in the scene
    const intersects = raycaster.current.intersectObjects(scene.children, true);
    
    // If there are intersections within collision distance, return true (collision)
    return intersects.length > 0 && intersects[0].distance < collisionDistance;
  };
  
  useFrame(() => {
    if (!controlsRef.current) return;
    
    const controls = controlsRef.current;
    const camera = controls.object;
    const minHeight = 1.0; // Minimum height from ground level
    
    let moveForward = movement.forward;
    let moveBackward = movement.backward;
    let moveLeft = movement.left;
    let moveRight = movement.right;
    
    // If on mobile, use joystick values
    if (isMobile) {
      moveForward = joystickMovement.y < -0.1;
      moveBackward = joystickMovement.y > 0.1;
      moveLeft = joystickMovement.x < -0.1;
      moveRight = joystickMovement.x > 0.1;
    }
    
    // Move forward/backward
    if (moveForward || moveBackward) {
      const direction = new Vector3();
      camera.getWorldDirection(direction);
      
      // Keep only horizontal movement for forward/backward (don't change Y)
      direction.y = 0;
      direction.normalize();
      
      // Calculate movement speed - use proportional joystick values on mobile
      const forwardSpeed = isMobile ? Math.abs(joystickMovement.y) * speed : speed;
      
      if (moveForward) {
        // Check for collision in forward direction
        if (!checkCollision(camera.position, direction)) {
          const newPosition = camera.position.clone().addScaledVector(direction, forwardSpeed);
          // Only update if we're not going below minimum height
          if (newPosition.y >= minHeight) {
            camera.position.copy(newPosition);
          } else {
            // Still allow horizontal movement, but keep y at minimum height
            camera.position.x = newPosition.x;
            camera.position.z = newPosition.z;
            camera.position.y = minHeight;
          }
        }
      } else if (moveBackward) {
        // Check for collision in backward direction
        if (!checkCollision(camera.position, direction.clone().negate())) {
          const newPosition = camera.position.clone().addScaledVector(direction, -forwardSpeed);
          // Only update if we're not going below minimum height
          if (newPosition.y >= minHeight) {
            camera.position.copy(newPosition);
          } else {
            // Still allow horizontal movement, but keep y at minimum height
            camera.position.x = newPosition.x;
            camera.position.z = newPosition.z;
            camera.position.y = minHeight;
          }
        }
      }
    }
    
    // Move left/right (strafing)
    if (moveLeft || moveRight) {
      const direction = new Vector3();
      camera.getWorldDirection(direction);
      
      // Calculate right vector (perpendicular to direction)
      const rightDirection = new Vector3(
        -direction.z,
        0,
        direction.x
      ).normalize();
      
      // Calculate movement speed - use proportional joystick values on mobile
      const strafeSpeed = isMobile ? Math.abs(joystickMovement.x) * speed : speed;
      
      if (moveRight) {
        // Check for collision in right direction
        if (!checkCollision(camera.position, rightDirection)) {
          const newPosition = camera.position.clone().addScaledVector(rightDirection, strafeSpeed);
          // Only update if we're not going below minimum height
          if (newPosition.y >= minHeight) {
            camera.position.copy(newPosition);
          } else {
            // Still allow horizontal movement, but keep y at minimum height
            camera.position.x = newPosition.x;
            camera.position.z = newPosition.z;
            camera.position.y = minHeight;
          }
        }
      } else if (moveLeft) {
        // Check for collision in left direction
        if (!checkCollision(camera.position, rightDirection.clone().negate())) {
          const newPosition = camera.position.clone().addScaledVector(rightDirection, -strafeSpeed);
          // Only update if we're not going below minimum height
          if (newPosition.y >= minHeight) {
            camera.position.copy(newPosition);
          } else {
            // Still allow horizontal movement, but keep y at minimum height
            camera.position.x = newPosition.x;
            camera.position.z = newPosition.z;
            camera.position.y = minHeight;
          }
        }
      }
    }
    
    // Update orbit controls target
    if (moveForward || moveBackward || moveLeft || moveRight) {
      const lookDirection = new Vector3();
      camera.getWorldDirection(lookDirection);
      const targetPosition = new Vector3().copy(camera.position).add(lookDirection);
      controls.target.set(targetPosition.x, targetPosition.y, targetPosition.z);
      controls.update();
    }
  });
  
  return (
    <>
      {isMobile && <VirtualJoystick onMove={handleJoystickMove} />}
    </>
  );
}

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

// Info Panel for exhibit details
const InfoPanel = styled.div`
  position: absolute;
  top: 80px;
  right: 20px;
  width: 300px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 20;
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    width: 80%;
    top: auto;
    bottom: 80px;
    right: 50%;
    transform: translateX(50%);
  }
`;

// Controls hint panel
const ControlsHint = styled.div`
  position: absolute;
  bottom: 100px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 14px;
  z-index: 20;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    bottom: 180px;
  }
`;

// Museum Model component that uses the actual GLTF file
function MuseumModel({ setSceneRef }) {
  const { scene } = useGLTF('/models/scene.gltf');
  
  useEffect(() => {
    if (scene) {
      // Apply any transformations or material adjustments here if needed
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      
      // Set the scene reference for collision detection
      setSceneRef(scene);
    }
  }, [scene, setSceneRef]);
  
  return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
}

const ExhibitWalkthrough = () => {
  const navigate = useNavigate();
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [sceneRef, setSceneRef] = useState(null);
  const controlsRef = useRef(null);
  
  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Hide controls hint after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);

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
  
  // Handle back button click
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="exhibit-container">
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      {/* Back Button */}
      <button className="back-button" onClick={handleBackClick}>
        <svg viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>
      
      {/* Controls Hint */}
      {showControls && (
        <ControlsHint>
          <strong>Movement Controls:</strong><br />
          {window.innerWidth <= 768 ? (
            <>Use the joystick in the bottom left corner<br />to move around the museum</>
          ) : (
            <>
              W - Move forward<br />
              S - Move backward<br />
              A - Strafe left<br />
              D - Strafe right<br />
              Mouse - Look around
            </>
          )}
        </ControlsHint>
      )}
      
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

      {/* Info Panel */}
      <InfoPanel>
        <h3>{NAVIGATION_POINTS[currentPointIndex].name}</h3>
        <p>{NAVIGATION_POINTS[currentPointIndex].description}</p>
      </InfoPanel>

      <Canvas 
        shadows
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 1.6, 5], fov: 60 }}
      >
        <Suspense fallback={null}>
          <MuseumModel setSceneRef={setSceneRef} />
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.8} 
            castShadow 
            shadow-mapSize-width={2048} 
            shadow-mapSize-height={2048}
          />
          <Environment preset="sunset" />
          <MovementControls controlsRef={controlsRef} scene={sceneRef} />
        </Suspense>
        
        <OrbitControls 
          ref={controlsRef}
          maxDistance={10}
          minDistance={1}
          enableZoom={true}
          enablePan={true}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

// Preload the model
useGLTF.preload('/models/scene.gltf');

export default ExhibitWalkthrough; 