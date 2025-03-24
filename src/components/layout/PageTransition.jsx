import { motion } from "framer-motion";
import { useEffect } from "react";

export default function PageTransition({ children, clickPosition = { x: 0.5, y: 0.5 } }) {
  // Prevent scrolling during animation - adjusted duration for faster animations
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
    }, 1260); // 30% faster than original 1800ms
    
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
      {/* White wave animation overlay - 30% faster animation */}
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
              duration: 1.26, // 30% faster than original 1.8
              ease: waveEasing,
            },
            opacity: {
              duration: 1.12, // 30% faster than original 1.6
              delay: 0.67, // 30% faster than original 0.95
              ease: "easeInOut"
            }
          }
        }}
        exit={{ 
          clipPath: `circle(0% at ${waveX} ${waveY})`,
          opacity: 0.9,
          transition: {
            clipPath: {
              duration: 0.91, // 30% faster than original 1.3
              ease: waveEasing,
            },
            opacity: {
              duration: 0.7, // 30% faster than original 1.0
              delay: 0.07, // 30% faster than original 0.1
              ease: "easeInOut"
            }
          }
        }}
      />
      
      {/* Subtle secondary wave animation - 30% faster */}
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
              duration: 1.19, // 30% faster than original 1.7
              ease: waveEasing,
              delay: 0.07, // 30% faster than original 0.1
            },
            opacity: {
              duration: 1.05, // 30% faster than original 1.5
              delay: 0.6, // 30% faster than original 0.85
              ease: "easeInOut"
            }
          }
        }}
        exit={{ 
          clipPath: `circle(0% at ${waveX} ${waveY})`,
          opacity: 0.5,
          transition: {
            clipPath: {
              duration: 0.84, // 30% faster than original 1.2
              ease: waveEasing,
            },
            opacity: {
              duration: 0.56, // 30% faster than original 0.8
              delay: 0,
              ease: "easeInOut"
            }
          }
        }}
      />
      
      {/* Black background overlay - 30% faster */}
      <motion.div
        className="fixed inset-0 bg-black z-40 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: 0,
          transition: {
            duration: 0.56, // 30% faster than original 0.8
            delay: 0.84, // 30% faster than original 1.2
            ease: "easeInOut"
          }
        }}
        exit={{ 
          opacity: 1,
          transition: {
            duration: 0.35, // 30% faster than original 0.5
            ease: "easeInOut"
          }
        }}
      />

      {/* Page content with smoother fade in - 30% faster */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: {
            duration: 0.63, // 30% faster than original 0.9
            delay: 0.84, // 30% faster than original 1.2
            ease: "easeInOut"
          }
        }}
        exit={{ 
          opacity: 0,
          transition: {
            duration: 0.35, // 30% faster than original 0.5
            ease: "easeInOut"
          }
        }}
      >
        {children}
      </motion.div>
    </>
  );
} 