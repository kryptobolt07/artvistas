import { motion } from "framer-motion";
import { useEffect } from "react";

export default function PageTransition({ children, clickPosition = { x: 0.5, y: 0.5 } }) {
  // Prevent scrolling during animation - extended duration for slower animations
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
    }, 1800); // Extended time a bit more for smoother transitions
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Convert percentages to actual position values
  const waveX = `${clickPosition.x * 100}%`;
  const waveY = `${clickPosition.y * 100}%`;

  // Custom easing curve for the wave animation
  const waveEasing = [0.25, 0.8, 0.25, 1];

  return (
    <>
      {/* White wave animation overlay - refined for smoother animation */}
      <motion.div
        className="fixed inset-0 bg-white z-50 pointer-events-none"
        initial={{ 
          clipPath: `circle(0% at ${waveX} ${waveY})`,
          opacity: 0.9
        }}
        animate={{ 
          clipPath: `circle(170% at ${waveX} ${waveY})`, // Slightly larger for fuller coverage
          opacity: 0,
          transition: {
            clipPath: {
              duration: 1.8, // Slowed down more for smoothness
              ease: waveEasing,
            },
            opacity: {
              duration: 1.6, 
              delay: 0.95,
              ease: "easeInOut"
            }
          }
        }}
        exit={{ 
          clipPath: `circle(0% at ${waveX} ${waveY})`,
          opacity: 0.9,
          transition: {
            clipPath: {
              duration: 1.3,
              ease: waveEasing,
            },
            opacity: {
              duration: 1.0, 
              delay: 0.1, // Slight delay for smoother transition
              ease: "easeInOut"
            }
          }
        }}
      />
      
      {/* Subtle secondary wave animation for more dimensional feel */}
      <motion.div
        className="fixed inset-0 bg-white z-45 pointer-events-none"
        style={{ opacity: 0.5 }}
        initial={{ 
          clipPath: `circle(0% at ${waveX} ${waveY})`,
        }}
        animate={{ 
          clipPath: `circle(160% at ${waveX} ${waveY})`,
          opacity: 0,
          transition: {
            clipPath: {
              duration: 1.7,
              ease: waveEasing,
              delay: 0.1, // Slight delay for layered effect
            },
            opacity: {
              duration: 1.5,
              delay: 0.85,
              ease: "easeInOut"
            }
          }
        }}
        exit={{ 
          clipPath: `circle(0% at ${waveX} ${waveY})`,
          opacity: 0.5,
          transition: {
            clipPath: {
              duration: 1.2,
              ease: waveEasing,
            },
            opacity: {
              duration: 0.8,
              delay: 0,
              ease: "easeInOut"
            }
          }
        }}
      />
      
      {/* Black background overlay */}
      <motion.div
        className="fixed inset-0 bg-black z-40 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: 0,
          transition: {
            duration: 0.8,
            delay: 1.2,
            ease: "easeInOut"
          }
        }}
        exit={{ 
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: "easeInOut"
          }
        }}
      />

      {/* Page content with smoother fade in */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: {
            duration: 0.9, // Longer duration for smoother fade
            delay: 1.2, // Coordinated with wave animation
            ease: "easeInOut"
          }
        }}
        exit={{ 
          opacity: 0,
          transition: {
            duration: 0.5,
            ease: "easeInOut"
          }
        }}
      >
        {children}
      </motion.div>
    </>
  );
} 